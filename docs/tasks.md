# 📋 tasks.md
**Source of Truth for SafeVoice Implementation**

Status Key: 🔴 Not Started | 🟡 In Progress | ✅ Completed

---

## Phase 1: Foundation & Design System ✅
*Establishes emotional design language and technical foundation*

### Task 1.1: Design System Implementation ✅
**Status**: ✅ Completed  
**Files**: `src/index.css`, `tailwind.config.ts`

**What was built**:
- Color palette with HSL values for Soft Blue (#7A9BAF), Warm Peach (#E7C8A9), Ivory White (#F8F8F7), Sage Green (#B5D6B2)
- Typography system using Inter font family with 1.6 line-height
- 8pt spacing grid system
- Semantic design tokens (--primary, --accent, --positive, --muted-coral)

**Testing**:
- Verify all colors render correctly in light mode
- Check font loading and readability at 16pt minimum
- Validate 8pt spacing across all components

---

## Phase 2: Core Pages & Navigation ✅
*Creates user-facing pages and routing structure*

### Task 2.1: Landing Page ✅
**Status**: ✅ Completed  
**File**: `src/pages/Landing.tsx`

**What was built**:
- Hero section with warm background image
- Emotional value propositions ("Safe Space", "Your Companion", "Private & Secure")
- CTA button to Setup page
- Mobile-first responsive design

**Testing**:
- Load landing page and verify hero image displays
- Click "Get Started" → should navigate to /setup
- Test on mobile viewport (max-width: 720px)

---

### Task 2.2: Setup Flow ✅
**Status**: ✅ Completed  
**File**: `src/pages/Setup.tsx`

**What was built**:
- Step-by-step companion customization (Name → Voice → Role)
- Local storage persistence of preferences
- Smooth transitions between steps (300ms ease-in-out)
- Completion redirects to /dashboard

**Code Reference**:
```typescript
// Store companion preferences in localStorage
const preferences = {
  name: companionName,
  voice: selectedVoice,
  role: selectedRole
};
localStorage.setItem('companionPreferences', JSON.stringify(preferences));
```

**Testing**:
- Complete all 3 steps and verify preferences saved to localStorage
- Refresh page → preferences should persist
- Navigate to /dashboard after completion

---

### Task 2.3: Dashboard (Home) ✅
**Status**: ✅ Completed  
**File**: `src/pages/Dashboard.tsx`

**What was built**:
- Personalized greeting with companion name
- Quick action cards (Start Chat, View Journal)
- Navigation to Chat, Journal, Settings
- Calm gradient background

**Testing**:
- Verify companion name displays from localStorage
- Click "Start a conversation" → navigate to /chat
- Click "View your journal" → navigate to /journal

---

### Task 2.4: Chat Interface (Text-Only) ✅
**Status**: ✅ Completed  
**File**: `src/pages/Chat.tsx`

**What was built**:
- Message input with send button
- Message bubbles (user vs AI styling)
- Local state management for messages
- Placeholder for AI integration (currently echo responses)

**Next Steps for Chat**:
- Connect to Lovable AI backend (Task 3.1)
- Add streaming response animation
- Implement "listening pulse" animation during AI response

**Testing**:
- Type message and press Send
- Verify message appears in chat history
- Confirm bubbles have correct styling (user vs AI)

---

### Task 2.5: Journal Page ✅
**Status**: ✅ Completed  
**File**: `src/pages/Journal.tsx`

**What was built**:
- Empty state with placeholder UI
- Layout structure for future journal entries
- Timeline-style card design

**Next Steps**:
- Add journal entry storage in database (Task 4.2)
- Display conversation summaries with emotional tags
- Add filtering by emotion tags

---

### Task 2.6: Settings Page ✅
**Status**: ✅ Completed  
**File**: `src/pages/Settings.tsx`

**What was built**:
- Account section placeholder
- Privacy settings section
- Companion preferences editing
- Data export/delete options

**Next Steps**:
- Add auth integration (Task 3.2)
- Implement data export functionality
- Add notification preferences

---

## Phase 3: Backend & AI Integration 🔴
*Connects frontend to Lovable Cloud and AI services*

### Task 3.1: Lovable AI Integration ✅
**Status**: ✅ Completed  
**Dependencies**: Lovable Cloud enabled ✅  
**Files Created**: 
- `supabase/functions/chat/index.ts` - Edge function with streaming
- `src/lib/streamChat.ts` - Frontend streaming utility
- Updated `src/pages/Chat.tsx` - Integrated streaming chat

**What was built**:
- ✅ Enabled Lovable AI (LOVABLE_API_KEY auto-configured)
- ✅ Created chat edge function with empathetic system prompt
- ✅ Implemented SSE streaming for real-time responses
- ✅ Token-by-token rendering in Chat UI
- ✅ Error handling for rate limits (429) and credits (402)
- ✅ Using `google/gemini-2.5-flash` model

**System Prompt Features**:
- Warm, empathetic tone ("trusted friend" persona)
- Judgment-free emotional space
- Active listening and validation
- Concise responses (2-3 sentences)
- Gentle questions to encourage reflection
- Respects emotional pacing

**How to test**:
1. Navigate to /chat
2. Type a message: "I'm feeling overwhelmed today"
3. Watch AI response stream in real-time token-by-token
4. Verify empathetic, warm tone in responses
5. Try rapid messages to test rate limiting handling

**Acceptance Criteria**:
- ✅ AI responds within 2 seconds of user message
- ✅ Responses feel "warm and human" (not robotic)
- ✅ Error messages use empathetic microcopy
- ✅ Streaming animation visible during response generation

---

### Task 3.2: Authentication System ✅
**Status**: ✅ Completed  
**Dependencies**: Lovable Cloud enabled ✅  
**Files Created**: 
- `src/contexts/AuthContext.tsx` - Auth context with session management
- `src/components/ProtectedRoute.tsx` - Route protection component
- Updated `src/pages/Login.tsx` - Email + Google OAuth support
- Database migration for profiles table

**What was built**:
- ✅ Created profiles table with RLS policies
- ✅ Auto-profile creation trigger on user signup
- ✅ Email/password authentication with empathetic error messages
- ✅ Google OAuth integration ("Continue with Google" button)
- ✅ AuthContext for session management
- ✅ ProtectedRoute component for route protection
- ✅ Auto-confirm email enabled (development mode)
- ✅ Proper session persistence across page refreshes
- ✅ Sign-out functionality in Settings

**How to test**:
1. Go to /login and sign up with a new email
2. Check that profile was auto-created in database
3. Log out from Settings page
4. Log back in with same credentials
5. Try "Continue with Google" button
6. Try accessing /dashboard without login → redirected to /login
7. Verify session persists after page refresh

**Acceptance Criteria**:
- ✅ User can sign up with email/password
- ✅ User can sign in with Google OAuth
- ✅ Profile automatically created on signup
- ✅ Protected routes redirect to login if not authenticated
- ✅ Error messages use empathetic microcopy
- ✅ Session persists across page refreshes

**Note**: For Google OAuth to work in production, you'll need to configure Google Cloud credentials in the backend dashboard.

1. **Create profiles table migration**
   ```sql
   -- Create profiles table for user data
   CREATE TABLE public.profiles (
     id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id UUID NOT NULL UNIQUE,
     email TEXT NOT NULL,
     display_name TEXT,
     companion_name TEXT,
     companion_voice TEXT,
     companion_role TEXT,
     created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
     updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
     CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
   );

   -- Enable RLS
   ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

   -- RLS Policies
   CREATE POLICY "Users can view their own profile"
   ON public.profiles FOR SELECT
   USING (auth.uid() = user_id);

   CREATE POLICY "Users can update their own profile"
   ON public.profiles FOR UPDATE
   USING (auth.uid() = user_id);

   CREATE POLICY "Users can insert their own profile"
   ON public.profiles FOR INSERT
   WITH CHECK (auth.uid() = user_id);

   -- Trigger for updated_at
   CREATE OR REPLACE FUNCTION public.update_updated_at_column()
   RETURNS TRIGGER AS $$
   BEGIN
     NEW.updated_at = now();
     RETURN NEW;
   END;
   $$ LANGUAGE plpgsql SET search_path = public;

   CREATE TRIGGER update_profiles_updated_at
   BEFORE UPDATE ON public.profiles
   FOR EACH ROW
   EXECUTE FUNCTION public.update_updated_at_column();

   -- Function to auto-create profile on signup
   CREATE OR REPLACE FUNCTION public.handle_new_user()
   RETURNS TRIGGER AS $$
   BEGIN
     INSERT INTO public.profiles (user_id, email)
     VALUES (NEW.id, NEW.email);
     RETURN NEW;
   END;
   $$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

   CREATE TRIGGER on_auth_user_created
   AFTER INSERT ON auth.users
   FOR EACH ROW
   EXECUTE FUNCTION public.handle_new_user();
   ```

2. **Configure Supabase Auth**
   - Enable auto-confirm email (development mode)
   - Set redirect URLs to preview and deployed URLs
   - Disable anonymous signups

3. **Update Login.tsx**
   ```typescript
   // src/pages/Login.tsx - Add proper auth flow
   import { useState } from 'react';
   import { supabase } from '@/integrations/supabase/client';
   import { useNavigate } from 'react-router-dom';
   import { toast } from 'sonner';

   const [isSignup, setIsSignup] = useState(false);
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const navigate = useNavigate();

   const handleAuth = async (e: React.FormEvent) => {
     e.preventDefault();
     
     if (isSignup) {
       const { error } = await supabase.auth.signUp({
         email,
         password,
         options: {
           emailRedirectTo: `${window.location.origin}/dashboard`,
         }
       });
       
       if (error) {
         toast.error(error.message === 'User already registered' 
           ? "This email is already registered. Try logging in instead."
           : "Something went wrong — let's try again calmly.");
       } else {
         toast.success("Welcome! Your account is ready.");
         navigate('/setup');
       }
     } else {
       const { error } = await supabase.auth.signInWithPassword({
         email,
         password,
       });
       
       if (error) {
         toast.error(error.message === 'Invalid login credentials'
           ? "We couldn't find that account. Double-check your email and password?"
           : "Something went wrong — let's try again calmly.");
       } else {
         toast.success("Welcome back — your space is ready.");
         navigate('/dashboard');
       }
     }
   };
   ```

4. **Create Auth Context**
   ```typescript
   // src/contexts/AuthContext.tsx
   import { createContext, useContext, useEffect, useState } from 'react';
   import { User, Session } from '@supabase/supabase-js';
   import { supabase } from '@/integrations/supabase/client';

   interface AuthContextType {
     user: User | null;
     session: Session | null;
     signOut: () => Promise<void>;
   }

   const AuthContext = createContext<AuthContextType | undefined>(undefined);

   export function AuthProvider({ children }: { children: React.ReactNode }) {
     const [user, setUser] = useState<User | null>(null);
     const [session, setSession] = useState<Session | null>(null);

     useEffect(() => {
       // Set up listener FIRST
       const { data: { subscription } } = supabase.auth.onAuthStateChange(
         (event, session) => {
           setSession(session);
           setUser(session?.user ?? null);
         }
       );

       // THEN check for existing session
       supabase.auth.getSession().then(({ data: { session } }) => {
         setSession(session);
         setUser(session?.user ?? null);
       });

       return () => subscription.unsubscribe();
     }, []);

     const signOut = async () => {
       await supabase.auth.signOut();
       setUser(null);
       setSession(null);
     };

     return (
       <AuthContext.Provider value={{ user, session, signOut }}>
         {children}
       </AuthContext.Provider>
     );
   }

   export const useAuth = () => {
     const context = useContext(AuthContext);
     if (!context) throw new Error('useAuth must be used within AuthProvider');
     return context;
   };
   ```

5. **Protect Routes**
   ```typescript
   // src/App.tsx - Add protected route wrapper
   import { useAuth } from '@/contexts/AuthContext';
   
   function ProtectedRoute({ children }: { children: React.ReactNode }) {
     const { user } = useAuth();
     const navigate = useNavigate();
     
     useEffect(() => {
       if (!user) navigate('/login');
     }, [user, navigate]);
     
     return user ? <>{children}</> : null;
   }

   // Wrap protected routes
   <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
   <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
   <Route path="/journal" element={<ProtectedRoute><Journal /></ProtectedRoute>} />
   ```

**Testing**:
- Sign up with new email → Profile auto-created in database
- Log out and log back in → Session persists
- Try accessing /dashboard without login → Redirected to /login
- Test error handling: Invalid credentials, duplicate email
- Verify email redirect URL works in preview and production

**Acceptance Criteria**:
- [ ] User can sign up with email/password
- [ ] Profile automatically created on signup
- [ ] Protected routes redirect to login if not authenticated
- [ ] Error messages use empathetic microcopy
- [ ] Session persists across page refreshes

---

## Phase 4: Data Persistence & Journal 🔴
*Stores conversations and generates emotional summaries*

### Task 4.1: Conversation Storage 🔴
**Status**: 🔴 Not Started  
**Dependencies**: Task 3.1 (AI Integration), Task 3.2 (Auth)  
**Files**: Database migration, update `src/pages/Chat.tsx`

**Decision Needed**: Store full conversation history or just summaries? (See clarifying questions)

**Assuming full conversation storage for now:**

**Database Migration**:
```sql
-- Conversations table
CREATE TABLE public.conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL DEFAULT 'New Conversation',
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  ended_at TIMESTAMP WITH TIME ZONE,
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Messages table
CREATE TABLE public.messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT fk_conversation FOREIGN KEY (conversation_id) REFERENCES public.conversations(id) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies for conversations
CREATE POLICY "Users can view their own conversations"
ON public.conversations FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own conversations"
ON public.conversations FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own conversations"
ON public.conversations FOR UPDATE
USING (auth.uid() = user_id);

-- RLS Policies for messages
CREATE POLICY "Users can view messages in their conversations"
ON public.messages FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.conversations
    WHERE id = messages.conversation_id
    AND user_id = auth.uid()
  )
);

CREATE POLICY "Users can create messages in their conversations"
ON public.messages FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.conversations
    WHERE id = messages.conversation_id
    AND user_id = auth.uid()
  )
);

-- Enable realtime for live chat updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;

-- Index for performance
CREATE INDEX idx_messages_conversation_id ON public.messages(conversation_id);
CREATE INDEX idx_conversations_user_id ON public.conversations(user_id);
```

**Update Chat.tsx**:
```typescript
// src/pages/Chat.tsx - Add conversation persistence
const [conversationId, setConversationId] = useState<string | null>(null);

// Create conversation on mount
useEffect(() => {
  const createConversation = async () => {
    const { data, error } = await supabase
      .from('conversations')
      .insert({ user_id: (await supabase.auth.getUser()).data.user?.id })
      .select()
      .single();
    
    if (data) setConversationId(data.id);
  };
  createConversation();
}, []);

// Save messages to database
const saveMessage = async (role: 'user' | 'assistant', content: string) => {
  if (!conversationId) return;
  
  await supabase.from('messages').insert({
    conversation_id: conversationId,
    role,
    content,
  });
};

// Update sendMessage to save
const sendMessage = async () => {
  const userMessage = inputMessage.trim();
  if (!userMessage) return;
  
  // Save user message
  await saveMessage('user', userMessage);
  setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
  setInputMessage('');
  
  // Stream AI response
  let aiResponse = '';
  await streamChat({
    messages: [...messages, { role: 'user', content: userMessage }],
    companionPrefs: JSON.parse(localStorage.getItem('companionPreferences') || '{}'),
    onDelta: (chunk) => {
      aiResponse += chunk;
      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last?.role === 'assistant') {
          return [...prev.slice(0, -1), { role: 'assistant', content: aiResponse }];
        }
        return [...prev, { role: 'assistant', content: aiResponse }];
      });
    },
    onDone: async () => {
      // Save complete AI response
      await saveMessage('assistant', aiResponse);
    }
  });
};
```

**Testing**:
- Start conversation → New row created in conversations table
- Send messages → Messages saved to database
- Refresh page → Conversation history loads from database
- Check RLS: Cannot access other users' conversations

**Acceptance Criteria**:
- [ ] Conversations created on chat start
- [ ] All messages persisted to database
- [ ] Conversation history loads on page refresh
- [ ] RLS prevents cross-user data access

---

### Task 4.2: Emotional Journal Summaries 🔴
**Status**: 🔴 Not Started  
**Dependencies**: Task 4.1 (Conversation Storage)  
**Files**: Database migration, edge function, `src/pages/Journal.tsx`

**Database Migration**:
```sql
-- Journal entries table
CREATE TABLE public.journal_entries (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  conversation_id UUID NOT NULL,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  emotional_tags TEXT[] NOT NULL DEFAULT '{}',
  reflection_question TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE,
  CONSTRAINT fk_conversation FOREIGN KEY (conversation_id) REFERENCES public.conversations(id) ON DELETE CASCADE
);

-- Enable RLS
ALTER TABLE public.journal_entries ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view their own journal entries"
ON public.journal_entries FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own journal entries"
ON public.journal_entries FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own journal entries"
ON public.journal_entries FOR DELETE
USING (auth.uid() = user_id);

-- Index
CREATE INDEX idx_journal_entries_user_id ON public.journal_entries(user_id);
```

**Edge Function for Summary Generation**:
```typescript
// supabase/functions/generate-summary/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { conversationId } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    // Fetch conversation messages from database
    const { data: messages } = await supabase
      .from('messages')
      .select('role, content')
      .eq('conversation_id', conversationId)
      .order('created_at');

    const conversationText = messages
      .map(m => `${m.role === 'user' ? 'User' : 'Companion'}: ${m.content}`)
      .join('\n');

    // Use Lovable AI with structured output (tool calling)
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
            content: "Analyze this conversation and provide a compassionate summary with emotional insights."
          },
          {
            role: "user",
            content: `Conversation:\n\n${conversationText}`
          }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "create_journal_entry",
              description: "Generate a journal entry with summary and emotional tags",
              parameters: {
                type: "object",
                properties: {
                  title: { type: "string", description: "Short descriptive title (max 50 chars)" },
                  summary: { type: "string", description: "Compassionate 2-3 sentence summary" },
                  emotional_tags: {
                    type: "array",
                    items: { type: "string", enum: ["calm", "anxious", "grateful", "hopeful", "uncertain", "relieved", "overwhelmed", "peaceful"] },
                    description: "2-3 emotional tags detected"
                  },
                  reflection_question: { type: "string", description: "Gentle open-ended question for reflection" }
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

    const result = await response.json();
    const toolCall = result.choices[0]?.message?.tool_calls?.[0];
    const journalData = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(journalData), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("summary error:", e);
    return new Response(JSON.stringify({ error: "Couldn't create summary — let's try again." }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
```

**Update Chat.tsx to trigger summary**:
```typescript
// src/pages/Chat.tsx - Add end conversation button
const endConversation = async () => {
  if (!conversationId) return;
  
  // Mark conversation as ended
  await supabase
    .from('conversations')
    .update({ ended_at: new Date().toISOString() })
    .eq('id', conversationId);
  
  // Generate summary
  const { data: summary } = await supabase.functions.invoke('generate-summary', {
    body: { conversationId }
  });
  
  // Create journal entry
  await supabase.from('journal_entries').insert({
    conversation_id: conversationId,
    user_id: (await supabase.auth.getUser()).data.user?.id,
    ...summary
  });
  
  navigate('/journal');
};
```

**Update Journal.tsx to display entries**:
```typescript
// src/pages/Journal.tsx - Load and display journal entries
const [entries, setEntries] = useState([]);

useEffect(() => {
  const loadEntries = async () => {
    const { data } = await supabase
      .from('journal_entries')
      .select('*')
      .order('created_at', { ascending: false });
    
    setEntries(data || []);
  };
  loadEntries();
}, []);

// Render entries with emotional tags
{entries.map(entry => (
  <Card key={entry.id} className="p-6">
    <div className="flex items-start justify-between">
      <div>
        <h3 className="font-semibold text-lg">{entry.title}</h3>
        <p className="text-sm text-muted mt-1">
          {new Date(entry.created_at).toLocaleDateString()}
        </p>
      </div>
      <div className="flex gap-2">
        {entry.emotional_tags.map(tag => (
          <Badge key={tag} variant="secondary">{tag}</Badge>
        ))}
      </div>
    </div>
    <p className="mt-4 text-foreground/80 leading-relaxed">
      {entry.summary}
    </p>
    <p className="mt-4 text-sm text-muted italic">
      Reflection: {entry.reflection_question}
    </p>
  </Card>
))}
```

**Testing**:
- End conversation → Summary generated and journal entry created
- Navigate to /journal → Entry displays with emotional tags
- Verify tags are accurate (match conversation tone)
- Check reflection question is open-ended and gentle

**Acceptance Criteria**:
- [ ] Summary generated within 5 seconds of ending conversation
- [ ] Emotional tags accurately reflect conversation sentiment
- [ ] Reflection questions are open-ended and empathetic
- [ ] Journal entries display in chronological order

---

## Phase 5: Voice Integration (Optional) 🔴
*Adds voice input/output using ElevenLabs*

### Task 5.1: ElevenLabs Voice Integration ✅
**Status**: ✅ Completed  
**Dependencies**: Task 3.1 (AI Integration)  
**Decision**: This is a "Phase 5: Growth & Refinement" feature per implementation-plan.md

**What's Completed**:
- ✅ Created `transcribe` edge function for text-to-speech
- ✅ Added `ELEVENLABS_API_KEY` as Supabase secret
- ✅ Configured function with CORS and error handling
- ✅ Supports voice selection, model, and output format parameters
- ✅ Integrated TTS playback in Chat.tsx with voice button on AI messages
- ✅ Added waveform visualization during audio playback
- ✅ Implemented audio state management and cleanup

**Edge Function Details**:
- **File**: `supabase/functions/transcribe/index.ts`
- **Endpoint**: `POST /functions/v1/transcribe`
- **Input**: `{ text, voiceId?, modelId?, outputFormat? }`
- **Output**: `{ audioContent: base64EncodedMp3 }`
- **Default Voice**: Aria (9BWtsMINqrJLrRacOk9x)
- **Default Model**: eleven_turbo_v2_5

**Frontend Integration**:
- Volume2 icon button appears on all AI messages
- Click to play/stop audio
- Animated waveform bars during playback
- Automatic cleanup on audio end

**Testing the Feature**:
1. Navigate to `/chat`
2. Send a message to the AI companion
3. Look for the speaker icon (Volume2) on the AI response
4. Click to hear the message spoken by AI voice
5. Waveform animation should pulse during playback

**How to Test**:
```typescript
// The integration is automatic - just click speaker icon on any AI message
// Voice uses Aria (warm, empathetic tone)
// Audio plays as MP3 at 44.1kHz, 128kbps
```

---

## Phase 6: Polish & Emotional Quality 🔴
*Ensures every interaction feels "safe and human"*

### Task 6.1: Animation & Motion Design 🔴
**Status**: 🔴 Not Started  
**Reference**: design-milestone.md Section 5 (Motion & Interaction Design)

**Implementation Checklist**:

1. **Page Transitions** (300ms ease-in-out)
   ```typescript
   // Add to App.tsx or create AnimatedRoutes component
   import { motion, AnimatePresence } from 'framer-motion';
   
   <AnimatePresence mode="wait">
     <motion.div
       key={location.pathname}
       initial={{ opacity: 0, y: 10 }}
       animate={{ opacity: 1, y: 0 }}
       exit={{ opacity: 0, y: -10 }}
       transition={{ duration: 0.3, ease: "easeInOut" }}
     >
       <Routes location={location}>
         {/* routes */}
       </Routes>
     </motion.div>
   </AnimatePresence>
   ```

2. **Chat Bubble Entry** (200ms ease-out)
   ```typescript
   // src/pages/Chat.tsx
   <motion.div
     initial={{ opacity: 0, y: 10, scale: 0.95 }}
     animate={{ opacity: 1, y: 0, scale: 1 }}
     transition={{ duration: 0.2, ease: "easeOut" }}
     className={`message-bubble ${message.role}`}
   >
     {message.content}
   </motion.div>
   ```

3. **Listening Pulse Animation** (2s loop, soft sine wave)
   ```css
   /* src/index.css */
   @keyframes breathe {
     0%, 100% { transform: scale(1); opacity: 0.6; }
     50% { transform: scale(1.1); opacity: 1; }
   }
   
   .listening-pulse {
     animation: breathe 2s ease-in-out infinite;
   }
   ```

4. **Breathing Loader** (replace spinners)
   ```typescript
   // src/components/BreathingLoader.tsx
   export function BreathingLoader({ text = "Taking a moment..." }) {
     return (
       <div className="flex flex-col items-center gap-4">
         <motion.div
           className="w-12 h-12 rounded-full bg-primary/20"
           animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
         />
         <p className="text-sm text-muted">{text}</p>
       </div>
     );
   }
   ```

**Testing**:
- Navigate between pages → Smooth 300ms fade
- Send message → Bubble animates in gently
- AI thinking → Breathing animation (not spinner)
- All animations feel "calm and reassuring" (not flashy)

**Acceptance Criteria**:
- [ ] No jarring transitions or hard cuts
- [ ] Loading states use breathing animation
- [ ] Hover effects are subtle glows (no shadows)
- [ ] Animations tested on mobile (60fps minimum)

---

### Task 6.2: Microcopy & Error States 🔴
**Status**: 🔴 Not Started  
**Reference**: design-milestone.md Section 6 (Voice & Tone System), app-flow-pages-and-rules.md Section 6 (UX Rules)

**Microcopy Audit**:

| Screen | Current Copy | Emotionally Aligned Copy |
|--------|-------------|--------------------------|
| Loading | "Loading..." | "Taking a moment..." |
| Error | "Error occurred" | "Something went wrong — let's try again calmly." |
| Empty Journal | "No entries yet" | "Your journal is waiting for your first conversation." |
| Login Error | "Invalid credentials" | "We couldn't find that account. Double-check your email?" |
| Rate Limit | "429 Too Many Requests" | "Taking a moment to breathe... Please try again shortly." |
| Sign Out | "Confirm sign out?" | "Taking a break? Your space will be here when you return." |

**Implementation**:
```typescript
// src/lib/copy.ts - Centralized microcopy
export const MICROCOPY = {
  loading: {
    default: "Taking a moment...",
    thinking: "Thinking this through for you...",
    saving: "Saving your thoughts...",
  },
  errors: {
    generic: "Something went wrong — let's try again calmly.",
    network: "Connection lost. Take a breath, then try again?",
    auth: "We couldn't find that account. Double-check your email?",
    rateLimit: "Taking a moment to breathe... Please try again shortly.",
  },
  empty: {
    journal: "Your journal is waiting for your first conversation.",
    chat: "Say hello, or just share what's on your mind.",
  },
  confirmations: {
    signOut: "Taking a break? Your space will be here when you return.",
    delete: "This will remove your entry. Are you sure?",
  }
};
```

**Testing**:
- Trigger all error states → Verify empathetic messaging
- Check empty states → Language feels inviting, not cold
- Test all confirmation dialogs → Tone is reassuring

**Acceptance Criteria**:
- [ ] No system-like or cold language anywhere
- [ ] All error messages offer gentle next steps
- [ ] Empty states feel welcoming, not vacant
- [ ] Confirmations acknowledge user emotions

---

### Task 6.3: Accessibility Audit 🔴
**Status**: 🔴 Not Started  
**Reference**: design-milestone.md Section 7 (Accessibility Must-Dos)

**Audit Checklist**:

1. **Contrast Ratios** (≥ 4.5:1)
   - [ ] Run contrast checker on all text/background pairs
   - [ ] Fix any failing combinations (especially muted text)

2. **Font Sizing** (16pt mobile minimum)
   - [ ] Audit all text elements
   - [ ] Increase caption/meta text if below 16pt

3. **Keyboard Navigation**
   - [ ] Tab order follows logical flow (top-to-bottom, left-to-right)
   - [ ] All interactive elements focusable
   - [ ] Focus indicators visible (custom styling allowed)

4. **Screen Reader Support**
   - [ ] Add aria-labels to icon-only buttons
   - [ ] Add alt text to all images (including generated ones)
   - [ ] Test with VoiceOver (iOS) or TalkBack (Android)

5. **Motion Sensitivity**
   ```typescript
   // src/index.css - Add prefers-reduced-motion support
   @media (prefers-reduced-motion: reduce) {
     *,
     *::before,
     *::after {
       animation-duration: 0.01ms !important;
       animation-iteration-count: 1 !important;
       transition-duration: 0.01ms !important;
     }
   }
   ```

**Testing**:
- Use keyboard only → All features accessible
- Enable screen reader → All elements properly labeled
- Toggle "Reduce motion" → Animations disabled
- Run Lighthouse accessibility audit → Score ≥ 95

**Acceptance Criteria**:
- [ ] WCAG AA compliant (minimum)
- [ ] Keyboard navigation 100% functional
- [ ] Screen reader friendly
- [ ] Reduced motion mode respects user preference

---

## Phase 7: Launch Preparation 🔴
*Final checks before public release*

### Task 7.1: Privacy & Data Export 🔴
**Status**: 🔴 Not Started  
**Reference**: masterplan.md (Ethical Differentiation), app-flow-pages-and-rules.md Section 7 (Settings)

**Implementation**:

1. **Data Export Functionality**
   ```typescript
   // src/pages/Settings.tsx
   const exportUserData = async () => {
     const { data: profile } = await supabase.from('profiles').select('*').single();
     const { data: conversations } = await supabase.from('conversations').select('*, messages(*)');
     const { data: journal } = await supabase.from('journal_entries').select('*');
     
     const exportData = {
       profile,
       conversations,
       journal,
       exportedAt: new Date().toISOString(),
     };
     
     const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
     const url = URL.createObjectURL(blob);
     const a = document.createElement('a');
     a.href = url;
     a.download = `safevoice-data-${Date.now()}.json`;
     a.click();
     
     toast.success("Your data has been exported. You're always in control.");
   };
   ```

2. **Account Deletion**
   ```typescript
   const deleteAccount = async () => {
     // Delete all user data (cascades via foreign keys)
     await supabase.rpc('delete_user_account', { user_id: user.id });
     
     // Sign out
     await supabase.auth.signOut();
     
     toast.success("Your account has been deleted. Take care.");
     navigate('/');
   };
   ```

   ```sql
   -- supabase migration: Create RPC function for account deletion
   CREATE OR REPLACE FUNCTION public.delete_user_account(user_id UUID)
   RETURNS VOID AS $$
   BEGIN
     -- Delete profile (cascades to conversations, messages, journal)
     DELETE FROM public.profiles WHERE user_id = $1;
     
     -- Delete auth user
     DELETE FROM auth.users WHERE id = $1;
   END;
   $$ LANGUAGE plpgsql SECURITY DEFINER;
   ```

3. **Privacy Policy Page**
   - Create `/privacy` route with clear data handling explanation
   - Link from footer and settings page

**Testing**:
- Export data → JSON file downloads with complete user data
- Delete account → All data removed from database
- Verify privacy policy is accessible and clear

**Acceptance Criteria**:
- [ ] Users can export all their data (JSON format)
- [ ] Account deletion removes all traces from database
- [ ] Privacy policy explains data handling in plain English
- [ ] 100% explicit consent for data backup to cloud

---

### Task 7.2: Performance Optimization 🔴
**Status**: 🔴 Not Started  

**Optimization Checklist**:

1. **Image Optimization**
   - [ ] Compress hero background (target: <200KB)
   - [ ] Add lazy loading to images: `loading="lazy"`
   - [ ] Use WebP format where supported

2. **Code Splitting**
   ```typescript
   // src/App.tsx - Lazy load routes
   import { lazy, Suspense } from 'react';
   import { BreathingLoader } from '@/components/BreathingLoader';
   
   const Dashboard = lazy(() => import('./pages/Dashboard'));
   const Chat = lazy(() => import('./pages/Chat'));
   const Journal = lazy(() => import('./pages/Journal'));
   
   <Suspense fallback={<BreathingLoader />}>
     <Routes>
       <Route path="/dashboard" element={<Dashboard />} />
       {/* ... */}
     </Routes>
   </Suspense>
   ```

3. **Database Query Optimization**
   - [ ] Add indexes to frequently queried columns (already done in migrations)
   - [ ] Limit journal entry fetches (e.g., last 50 entries)
   - [ ] Use pagination for conversations list

4. **Bundle Size**
   - [ ] Run `npm run build` and analyze bundle size
   - [ ] Remove unused dependencies
   - [ ] Ensure bundle < 500KB gzipped

**Testing**:
- Run Lighthouse audit → Performance score ≥ 90
- Test on slow 3G → Pages load within 5 seconds
- Check bundle size → Under 500KB gzipped

**Acceptance Criteria**:
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3.5s
- [ ] Bundle size < 500KB gzipped
- [ ] No console errors or warnings

---

### Task 7.3: SEO & Meta Tags 🔴
**Status**: 🔴 Not Started  

**Implementation**:
```html
<!-- index.html - Already partially implemented, verify/enhance -->
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- Primary Meta Tags -->
  <title>SafeVoice - Your Emotionally Intelligent AI Companion</title>
  <meta name="title" content="SafeVoice - Your Emotionally Intelligent AI Companion" />
  <meta name="description" content="A safe space to express emotions without judgment. Chat with an empathetic AI companion that truly listens and understands." />
  <meta name="keywords" content="emotional support, AI companion, mental wellness, emotional intelligence, safe space, empathy" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://safevoice.app/" />
  <meta property="og:title" content="SafeVoice - Your Emotionally Intelligent AI Companion" />
  <meta property="og:description" content="A safe space to express emotions without judgment. Chat with an empathetic AI companion that truly listens and understands." />
  <meta property="og:image" content="/og-image.jpg" />
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://safevoice.app/" />
  <meta property="twitter:title" content="SafeVoice - Your Emotionally Intelligent AI Companion" />
  <meta property="twitter:description" content="A safe space to express emotions without judgment." />
  <meta property="twitter:image" content="/og-image.jpg" />
  
  <!-- Favicon -->
  <link rel="icon" type="image/png" href="/favicon.png" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
</head>
```

**Additional Files Needed**:
- Generate OG image (1200x630px) with SafeVoice branding
- Create favicon.png (32x32, 192x192, 512x512)

**Testing**:
- Share link on social media → Preview shows correct title/image
- Test with Facebook Debugger and Twitter Card Validator

**Acceptance Criteria**:
- [ ] Meta tags complete and accurate
- [ ] OG image displays correctly on social platforms
- [ ] Favicon visible in browser tab
- [ ] robots.txt allows crawling (already exists)

---

## Summary of Next Actions

**Immediate Priority (MVP)**:
1. ✅ Enable Lovable Cloud
2. ✅ **Task 3.1**: Integrate Lovable AI for chat responses
3. 🔴 **Task 3.2**: Implement authentication (email-only)
4. 🔴 **Task 4.1**: Add conversation storage to database
5. 🔴 **Task 4.2**: Generate journal summaries with emotional tags

**Post-MVP (Growth & Refinement)**:
6. 🔴 **Task 5.1**: Add voice integration (ElevenLabs)
7. 🔴 **Task 6.1**: Polish animations and motion design
8. 🔴 **Task 6.2**: Audit microcopy for emotional alignment
9. 🔴 **Task 6.3**: Accessibility audit (WCAG AA compliance)

**Pre-Launch**:
10. 🔴 **Task 7.1**: Privacy & data export functionality
11. 🔴 **Task 7.2**: Performance optimization
12. 🔴 **Task 7.3**: SEO & meta tags

---

## Developer Notes

**When implementing tasks**:
- Always reference design-milestone.md for tone, spacing, colors
- Use MICROCOPY constants for all user-facing text
- Test emotional quality: "Does this feel safe?"
- Run `supabase db lint` after every migration
- Update this file to mark tasks as ✅ Completed when done

**Before marking any task complete**:
- Run all tests listed in "Testing" section
- Verify all acceptance criteria met
- Check for console errors/warnings
- Test on mobile viewport

**Questions or blockers?**
- Refer to masterplan.md for product vision
- Check implementation-plan.md for sequencing guidance
- Review app-flow-pages-and-rules.md for UX rules
