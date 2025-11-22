import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, Mic, Volume2, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { streamChat } from "@/lib/streamChat";
import { supabase } from "@/integrations/supabase/client";
import { BreathingLoader } from "@/components/BreathingLoader";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const Chat = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [playingMessageId, setPlayingMessageId] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [isLoadingConversation, setIsLoadingConversation] = useState(true);
  const [isEndingConversation, setIsEndingConversation] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const companion = JSON.parse(localStorage.getItem("safevoice_companion") || "{}");

  // Create or load conversation on mount
  useEffect(() => {
    if (!companion.companionName) {
      navigate("/setup");
      return;
    }

    const initConversation = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate("/login");
          return;
        }

        // Get or create today's conversation
        const { data: existingConversations, error: fetchError } = await supabase
          .from("conversations")
          .select("*")
          .eq("user_id", user.id)
          .is("ended_at", null)
          .order("started_at", { ascending: false })
          .limit(1);

        if (fetchError) throw fetchError;

        let convId: string;

        if (existingConversations && existingConversations.length > 0) {
          // Use existing conversation
          convId = existingConversations[0].id;
          
          // Load messages
          const { data: existingMessages, error: messagesError } = await supabase
            .from("messages")
            .select("*")
            .eq("conversation_id", convId)
            .order("created_at", { ascending: true });

          if (messagesError) throw messagesError;

          if (existingMessages && existingMessages.length > 0) {
            setMessages(
              existingMessages.map((msg) => ({
                id: msg.id,
                role: msg.role as "user" | "assistant",
                content: msg.content,
                timestamp: new Date(msg.created_at),
              }))
            );
          } else {
            // Add welcome message
            const welcomeContent = `Hi ${companion.userName}, I'm ${companion.companionName}. I'm here to listen. What's on your mind today?`;
            setMessages([
              {
                id: "welcome",
                role: "assistant",
                content: welcomeContent,
                timestamp: new Date(),
              },
            ]);
            // Save welcome message
            await supabase.from("messages").insert({
              conversation_id: convId,
              role: "assistant",
              content: welcomeContent,
            });
          }
        } else {
          // Create new conversation
          const { data: newConversation, error: createError } = await supabase
            .from("conversations")
            .insert({ user_id: user.id })
            .select()
            .single();

          if (createError) throw createError;
          convId = newConversation.id;

          // Add welcome message
          const welcomeContent = `Hi ${companion.userName}, I'm ${companion.companionName}. I'm here to listen. What's on your mind today?`;
          setMessages([
            {
              id: "welcome",
              role: "assistant",
              content: welcomeContent,
              timestamp: new Date(),
            },
          ]);
          
          // Save welcome message
          await supabase.from("messages").insert({
            conversation_id: convId,
            role: "assistant",
            content: welcomeContent,
          });
        }

        setConversationId(convId);
      } catch (error) {
        console.error("Error initializing conversation:", error);
        toast({
          title: "Connection error",
          description: "Unable to load conversation. Please refresh.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingConversation(false);
      }
    };

    initConversation();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isThinking || !conversationId) return;

    const userContent = input.trim();
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: userContent,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);

    // Save user message to database
    try {
      await supabase.from("messages").insert({
        conversation_id: conversationId,
        role: "user",
        content: userContent,
      });
    } catch (error) {
      console.error("Error saving user message:", error);
    }

    let assistantContent = "";
    const assistantId = (Date.now() + 1).toString();

    const upsertAssistant = (nextChunk: string) => {
      assistantContent += nextChunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.id === assistantId) {
          return prev.map((m) => 
            m.id === assistantId ? { ...m, content: assistantContent } : m
          );
        }
        return [
          ...prev,
          {
            id: assistantId,
            role: "assistant" as const,
            content: assistantContent,
            timestamp: new Date(),
          },
        ];
      });
    };

    try {
      await streamChat({
        messages: [...messages, userMessage].map((m) => ({
          role: m.role,
          content: m.content,
        })),
        onDelta: (chunk) => upsertAssistant(chunk),
        onDone: async () => {
          setIsThinking(false);
          // Save assistant message to database
          try {
            await supabase.from("messages").insert({
              conversation_id: conversationId,
              role: "assistant",
              content: assistantContent,
            });
          } catch (error) {
            console.error("Error saving assistant message:", error);
          }
        },
        onError: (error) => {
          console.error("Chat error:", error);
          toast({
            title: "Something went wrong",
            description: error,
            variant: "destructive",
          });
          setIsThinking(false);
        },
      });
    } catch (error) {
      console.error("Chat error:", error);
      toast({
        title: "Connection error",
        description: "Please check your connection and try again.",
        variant: "destructive",
      });
      setIsThinking(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handlePlayAudio = async (messageId: string, text: string) => {
    if (playingMessageId === messageId) {
      // Stop current playback
      audioRef.current?.pause();
      setPlayingMessageId(null);
      return;
    }

    try {
      setPlayingMessageId(messageId);

      const { data, error } = await supabase.functions.invoke("transcribe", {
        body: { 
          text,
          voiceId: "9BWtsMINqrJLrRacOk9x", // Aria voice
          modelId: "eleven_turbo_v2_5",
          outputFormat: "mp3_44100_128"
        },
      });

      if (error) throw error;

      // Convert base64 to blob and create audio URL
      const audioBlob = await fetch(`data:audio/mp3;base64,${data.audioContent}`).then(r => r.blob());
      const audioUrl = URL.createObjectURL(audioBlob);

      // Create and play audio
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.onended = () => {
        setPlayingMessageId(null);
        URL.revokeObjectURL(audioUrl);
      };
      
      await audio.play();
    } catch (error) {
      console.error("TTS error:", error);
      toast({
        title: "Voice playback failed",
        description: "Unable to generate audio. Please try again.",
        variant: "destructive",
      });
      setPlayingMessageId(null);
    }
  };

  const handleEndConversation = async () => {
    if (!conversationId || isEndingConversation) return;

    try {
      setIsEndingConversation(true);

      // Mark conversation as ended
      await supabase
        .from('conversations')
        .update({ ended_at: new Date().toISOString() })
        .eq('id', conversationId);

      // Generate summary
      const { data: summary, error: summaryError } = await supabase.functions.invoke('generate-summary', {
        body: { conversationId }
      });

      if (summaryError) throw summaryError;

      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      // Create journal entry
      await supabase.from('journal_entries').insert({
        conversation_id: conversationId,
        user_id: user.id,
        ...summary
      });

      toast({
        title: "Journal entry created",
        description: "Your conversation has been saved to your journal.",
      });

      navigate('/journal');
    } catch (error) {
      console.error("Error ending conversation:", error);
      toast({
        title: "Couldn't save journal entry",
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsEndingConversation(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4 flex items-center justify-between shadow-soft">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/dashboard")}
          className="rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="text-center">
          <h2 className="font-semibold text-lg">{companion.companionName}</h2>
          <p className="text-sm text-muted-foreground">Always here to listen</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleEndConversation}
          disabled={isEndingConversation || messages.length <= 1}
          className="rounded-full"
          title="Save to journal"
        >
          <BookOpen className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
        {isLoadingConversation ? (
          <div className="flex justify-center items-center h-full">
            <BreathingLoader text="Loading your conversation..." />
          </div>
        ) : (
          <>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] rounded-3xl px-6 py-4 ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground ml-12"
                  : "bg-card border border-border mr-12 shadow-soft"
              }`}
            >
              <p className="text-base leading-relaxed whitespace-pre-wrap">
                {message.content}
              </p>
              <div className="flex items-center justify-between mt-2 gap-3">
                <p className={`text-xs ${
                  message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                }`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                {message.role === "assistant" && message.content && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full"
                    onClick={() => handlePlayAudio(message.id, message.content)}
                  >
                    {playingMessageId === message.id ? (
                      <div className="flex gap-[2px] items-center">
                        <div className="w-[3px] h-3 bg-current animate-breathing rounded-full" />
                        <div className="w-[3px] h-4 bg-current animate-breathing rounded-full" style={{ animationDelay: "0.1s" }} />
                        <div className="w-[3px] h-3 bg-current animate-breathing rounded-full" style={{ animationDelay: "0.2s" }} />
                      </div>
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        
        {isThinking && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex justify-start"
          >
            <div className="bg-card border border-border rounded-3xl px-6 py-4 shadow-soft mr-12">
              <div className="flex gap-2">
                <motion.div 
                  className="w-2 h-2 rounded-full bg-muted-foreground"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  className="w-2 h-2 rounded-full bg-muted-foreground"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                />
                <motion.div 
                  className="w-2 h-2 rounded-full bg-muted-foreground"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
        </>
        )}
      </div>

      {/* Input Area */}
      <div className="bg-card border-t border-border px-6 py-4 shadow-soft-lg">
        <div className="max-w-4xl mx-auto flex items-end gap-3">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full h-12 w-12 flex-shrink-0"
            onClick={() => {
              toast({
                title: "Voice feature coming soon",
                description: "We're working on voice conversations. Stay tuned!",
              });
            }}
          >
            <Mic className="w-5 h-5" />
          </Button>
          
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share what's on your mind..."
            className="resize-none rounded-3xl border-2 focus:border-primary min-h-[60px] max-h-[200px] py-4"
            rows={1}
          />
          
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isThinking}
            size="icon"
            className="rounded-full h-12 w-12 bg-primary hover:bg-primary/90 flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
