
To document the information architecture, page flows, and user permission rules for SafeVoice — the mobile companion app that helps users feel emotionally safe, heard, and supported.
It acts as the navigation and logic map for both the design and development teams.

1️⃣ App Structure Overview
Layer	Purpose	Emotion
Setup Layer	Customize your AI companion	Calm discovery
Conversation Layer	Core chat + voice experience	Deep empathy
Reflection Layer	Journaling & summaries	Self-awareness
Engagement Layer	Daily check-ins & notifications	Gentle encouragement
System Layer	Profile, privacy, settings	Confidence and control
2️⃣ Page Flow Overview
1. Onboarding → 
2. Setup Virtual Friend →
3. Home / Dashboard →
4. Conversation (Chat / Call) →
5. Session Summary →
6. Emotional Journal →
7. Profile & Settings


Each transition follows soft fades or horizontal slides (250–300ms, ease-in-out) to preserve a feeling of calm continuity rather than abrupt switching.

3️⃣ Detailed Page Specifications
🏁 1. Onboarding
Goal: Introduce the emotional promise — “You’re safe here.”
Key Elements:
Welcome message with warm fade-in.
3-step introduction: Safety, Personalization, Companionship.
Minimal input: name, comfort level, and intent (“I want to relax / I need to talk / I’m curious”).
Emotional Design:
Calm animation of breathing light or wave motion.
Voice option immediately available for accessibility.
Call to Action:
“Let’s create your safe space.”

💬 2. Setup Virtual Friend
Goal: Build emotional trust through personalization.
User Actions:
Choose friend’s name.
Select voice tone: masculine / feminine / neutral.
Choose conversational role: friend, mentor, listener.
Option to add avatar + background theme.

Rules:
All options reversible later.
Default to neutral tone and background (no emotional bias).

Outcome:
User feels ownership and comfort with their companion.

🏠 3. Home / Dashboard
Goal: Provide an emotionally stable hub.
Elements:
Greeting line (“Hi again — how are you today?”).
Quick-start: Chat or Voice Call.
Access to Journal, Profile, and Check-in.
Visuals:
Large whitespace, few distractions.
Background gradient: ivory → soft blue.
Behavior:
If user inactive 3+ days → empathetic reminder:
“Haven’t heard from you lately — hope you’re okay.”

🎙️ 4. Conversation (Chat + Voice)
Goal: Core interaction between user and AI.
Modes:
Chat: text-based with gentle bubble animations.
Voice: live STT/TTS conversation with responsive waveform.
Flow Logic:
User sends message or speaks.
AI listens (visualized as slow pulse).
Response generated with tone alignment.
User can bookmark or tag emotional moments.
Emotional Safeguards:
AI never gives diagnostic advice.

Uses empathetic language (“That sounds difficult.”, “I understand why that felt heavy.”).
Timeout rule: pauses gently if user inactive, resumes softly.
Optional Controls:
Mute voice.
Switch tone mid-session.
End call → smooth fade to summary screen.

📘 5. Session Summary

Goal: Reflect and capture insights post-conversation.
Elements:
Summary paragraph (AI-generated).
Detected emotions: gratitude, anxiety, calm, hope, etc.
Suggested reflection question: “What felt most helpful today?”
Option: Save to Journal or Delete Session.
Visual Language:
Subtle green confirmation on save.
Calm confetti for positive emotion tags.

📔 6. Emotional Journal

Goal: Serve as the user’s private emotional archive.
Features:
Chronological cards (date + title + emotion tag).
“Read summary” → opens full text.
“Voice memory” → optional playback of recorded lines.
Local encryption for full privacy.
Search & Tag System:
Filter by emotion tag (e.g., “Calm”, “Anxiety”, “Gratitude”).
Insights dashboard for long-term reflection (Premium).
Permissions:
All entries visible only to the user.
Cloud sync (Lovable Cloud) optional and encrypted.

⚙️ 7. Profile & Settings

Goal: Give the user control, reinforcing the feeling of safety.
Sections:
Account (email / guest mode)
Voice & tone preferences
Privacy settings (data retention, local mode)
Notification preferences (frequency, tone)
Rules:
Default to private mode (no cloud sync).
Explicit consent required for data backup.
Clear language everywhere: “You’re always in control of your data.”

4️⃣ User Journeys
🧍‍♀️ Primary Journey: Emotional Companion Flow
1. Onboard → 2. Customize Friend → 3. Chat → 4. Summary → 5. Journal
Emotional arc: Curiosity → Safety → Expression → Reflection → Relief

🧠 Secondary Journey: Self-Reflection Habit
1. Open App → 2. Check-in Prompt → 3. Quick Voice Note → 4. Journal Tag
Emotional arc: Awareness → Release → Insight → Calm

🌿 Recovery Journey (Inactive Users)
1. Notification → 2. Gentle Re-engagement → 3. Short “Welcome Back” Session
Goal: Rekindle trust and emotional continuity.

5️⃣ Roles & Permissions
Role	Permissions	Emotional Rationale
User (Free)	Chat, voice, save 5 journals, 1 personality	Balanced freedom + safety
Premium User	Unlimited sessions, insights, voice variety	Deeper trust through customization
System (AI Agent)	Access only to session context; no permanent memory without consent	Ethical safety
Admin (Internal)	Technical logs only; anonymized usage metrics	Prevents data misuse

Every permission design choice should be defensible as kindness through control.

6️⃣ App-Wide UX Rules
One emotional intent per screen.
No competing CTAs or distractions.
Always offer a way to pause or end gracefully.
Ending should feel like closure, not abandonment.
Microcopy consistency: every system message should sound like the same friend.
Loading and waiting states: never blank — use gentle messages like
“Taking a moment to think with you…”
Error handling: empathetic, never blaming.
“Hmm, that didn’t work. Let’s try again together.”

7️⃣ Emotional Continuity Matrix
App State	Desired Feeling	Design Cue
Onboarding	Safety	Soft gradients, gentle welcome text
Chat	Presence	Breathing pulse, warm color balance
Summary	Reflection	Slow fade-in, serif body font optional
Journal	Ownership	Card layout, minimal chroma
Settings	Confidence	Clear labels, direct language

8️⃣ Emotional & Technical QA Checklist

Before any release:
 Do all transitions feel smooth and forgiving?
 Are all data-related screens written in first-person reassurance?
 Can users always see when the AI is listening?
 Are all microcopy strings emotionally consistent?
 Is every visual state accessible and WCAG-compliant?

🪞 Final Principle
“A safe space is not built with encryption alone — it’s built with empathy, patience, and presence.”
SafeVoice must embody that from its first pixel to its final tone.