import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.81.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { conversationId } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    // Create Supabase client
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
    
    // Fetch conversation messages
    const { data: messages, error: messagesError } = await supabase
      .from('messages')
      .select('role, content, created_at')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (messagesError) {
      console.error("Error fetching messages:", messagesError);
      throw messagesError;
    }

    if (!messages || messages.length === 0) {
      throw new Error("No messages found for this conversation");
    }

    // Format conversation for AI
    const conversationText = messages
      .map(m => `${m.role === 'user' ? 'User' : 'Companion'}: ${m.content}`)
      .join('\n\n');

    // Call Lovable AI with structured output
    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You are a compassionate emotional wellness companion. Analyze conversations and create supportive journal entries that help users reflect on their emotions and experiences. Be warm, non-judgmental, and encouraging."
          },
          {
            role: "user",
            content: `Please analyze this conversation and create a journal entry:\n\n${conversationText}`
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "create_journal_entry",
              description: "Generate a journal entry with emotional insights and reflection",
              parameters: {
                type: "object",
                properties: {
                  title: { 
                    type: "string", 
                    description: "Short, gentle title summarizing the conversation theme (max 50 characters)" 
                  },
                  summary: { 
                    type: "string", 
                    description: "Compassionate 2-3 sentence summary highlighting key themes and emotional journey" 
                  },
                  emotional_tags: {
                    type: "array",
                    items: { 
                      type: "string", 
                      enum: ["calm", "anxious", "grateful", "hopeful", "uncertain", "relieved", "overwhelmed", "peaceful", "excited", "sad", "frustrated", "content"]
                    },
                    description: "2-4 emotional tags that best represent the conversation's emotional landscape"
                  },
                  reflection_question: { 
                    type: "string", 
                    description: "A gentle, open-ended question to encourage continued self-reflection" 
                  }
                },
                required: ["title", "summary", "emotional_tags", "reflection_question"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "create_journal_entry" } }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const result = await response.json();
    const toolCall = result.choices?.[0]?.message?.tool_calls?.[0];
    
    if (!toolCall) {
      throw new Error("No tool call in AI response");
    }

    const journalData = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(journalData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Summary generation error:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Couldn't create summary — let's try again." 
      }), 
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
