import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { streamChat } from "@/lib/streamChat";

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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const companion = JSON.parse(localStorage.getItem("safevoice_companion") || "{}");

  useEffect(() => {
    if (!companion.companionName) {
      navigate("/setup");
      return;
    }

    // Welcome message
    if (messages.length === 0) {
      setMessages([
        {
          id: "1",
          role: "assistant",
          content: `Hi ${companion.userName}, I'm ${companion.companionName}. I'm here to listen. What's on your mind today?`,
          timestamp: new Date(),
        },
      ]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isThinking) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);

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
        onDone: () => setIsThinking(false),
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
        <div className="w-10" /> {/* Spacer for alignment */}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
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
              <p className={`text-xs mt-2 ${
                message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
              }`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isThinking && (
          <div className="flex justify-start animate-fade-in">
            <div className="bg-card border border-border rounded-3xl px-6 py-4 shadow-soft mr-12">
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-breathing" />
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-breathing" style={{ animationDelay: "0.2s" }} />
                <div className="w-2 h-2 rounded-full bg-muted-foreground animate-breathing" style={{ animationDelay: "0.4s" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
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
