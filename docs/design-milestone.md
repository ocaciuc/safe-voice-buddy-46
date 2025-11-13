
To define the visual, typographic, motion, and accessibility system for SafeVoice, ensuring every interaction consistently communicates safety, calmness, and trust.

This document is the single source of truth for frontend engineers, UI designers, and copywriters, uniting all creative and technical teams under one emotional vision.

1️⃣ Emotional Thesis
“Feels like a warm, softly lit studio — gentle, human, and safe.”
Derived from the principle “Start with feeling, not features.” (design-tips.md)
Design Intent:
Calm, not sterile.
Empathic, not performative.
Protective, not possessive.
Confidently quiet, not flashy.
Every decision — color, font, spacing, animation — should express this quiet safety.

2️⃣ Typography System
Level	Font	Weight	Style	Usage	Notes
H1	Inter Rounded / Nunito	700	Sans-serif, rounded	Page headers	Feels warm and human
H2	Inter / Poppins	600	Sans-serif	Section titles	Slightly smaller, airy spacing
Body	Inter / Lato	400	Sans-serif	Conversational text	1.6× line-height for calm rhythm
Caption	Inter / Lato	300	Light sans	Notes, meta info	Subtle, whisper-like tone

Guidelines:
Avoid all caps — they feel harsh.
Use generous padding around text.
Maintain minimum body size: 16pt mobile / 18pt desktop.
Ensure ≥ AA+ contrast.

3️⃣ Color System
Role	Color	Hex	Emotional Rationale
Primary	Soft Blue	#7A9BAF	Trust, calmness
Accent	Warm Peach	#E7C8A9	Human warmth, kindness
Background	Ivory White	#F8F8F7	Clarity, neutrality
Text Primary	Deep Charcoal	#2E2E2E	Reliability and grounding
Positive	Sage Green	#B5D6B2	Reassurance and hope
Alert (Gentle)	Muted Coral	#E99A8D	Soft warning tone without fear

System Notes:
Avoid pure white or black — both create emotional tension.
Use tonal harmony (blue–peach–ivory) to maintain safety and warmth.
Gradients: only soft, radial blends (no hard transitions).

4️⃣ Layout Rules
Grid & Rhythm
8pt spacing grid — every margin, padding, and gap based on multiples of 8.
Max width: 720px for mobile-first feel.
Whitespace = kindness. More breathing room → less emotional friction.

Visual Hierarchy
1 Primary action per screen.
1:3:6 rhythm for vertical padding (small, medium, large).
Cards and chat bubbles with 8–16px rounded corners.
Avoid hard edges and excessive shadows — use soft elevation (2–4px blur).

Layout Archetypes
Setup Screen: centered content, smooth onboarding flow, warm fade-ins.
Conversation Screen: minimal distractions, focus on text and voice waveform.
Summary Journal: timeline layout with emotional tags and reflection cards.

5️⃣ Motion & Interaction Design
“Motion is kindness. It should reassure, not impress.”
Core Motion Rules
Motion Type	Duration	Easing	Emotional Purpose
Page transition	300ms	ease-in-out	Graceful pacing
Chat bubble entry	200ms	ease-out	Feels conversational
Listening pulse	2s loop	soft sine wave	Feels alive, attentive
Notification slide	250ms	ease-in	Gentle arrival, not intrusion
Microinteractions

Hover/press effects: soft glow or color shift, no hard shadows.
Loading: use a breathing animation, not spinners (they cause anxiety).
Audio playback: waveform pulses gently, matching tone of speech.
Error state: show empathy: “Something went wrong — let’s try again calmly.”

6️⃣ Voice & Tone System
Core Traits
Attribute	Description
Voice	Gentle, sincere, never robotic
Tone	Calm, emotionally intelligent
Language	Clear, reassuring, conversational
Pacing	Unhurried — pause where a friend would
Microcopy Principles
Speak like a person who genuinely cares.
Avoid filler like “Processing…” — replace with “Thinking this through for you…”
Default message set examples:
“Welcome back — your space is ready.”
“It’s okay to feel uncertain. I’m here.”
“Take your time — no rush.”

7️⃣ Accessibility Must-Dos
Category	Guideline	Reason
Contrast	≥ 4.5:1 on all text	Emotional and visual clarity
Font size	16pt min	Reduces reading stress
Keyboard navigation	Tab order follows flow	For inclusivity and trust
Screen readers	Semantic labeling on all buttons and chat elements	Ensures empathy for all users
Voice support	STT and TTS fully toggleable	Choice = safety
Motion sensitivity	“Reduce motion” mode available	Prevents overwhelm
Accessibility is not an afterthought — it’s a form of emotional respect.

8️⃣ Design Integrity Checklist
Before shipping any design iteration:
Does it visually feel safe?
Does the spacing allow calm breathing?
Is motion patient and meaningful?
Would a tired or anxious user still feel comforted?
Would you trust this app with your feelings?
If any answer is “no,” the design is not yet Lovable.