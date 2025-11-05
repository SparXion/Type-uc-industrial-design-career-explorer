# UCID App - User Journey Map
*Comprehensive UX mapping for the Industrial Design Career Explorer*

**Last Updated**: [Date]  
**Version**: 1.0  
**Status**: In Progress

---

## 📋 Document Purpose

This document maps the complete user journey through the UCID app, documenting:
- User goals, emotions, and thoughts at each stage
- Current implementation state vs. planned state
- Visual states, interactions, and transitions
- UX gaps and improvement opportunities
- Decision points and edge cases

---

## 🎯 User Profile

**Primary User**: UC DAAP students (18-year-olds) exploring Industrial Design careers

**User Goals**:
- Discover what Industrial Design means to them personally
- Understand their interests and talents in relation to ID
- Explore career paths that match their profile
- Get actionable next steps for their ID journey

**User Context**:
- May be uncertain about their path
- Looking for clarity and inspiration
- Want to feel understood and guided
- Expect engaging, modern, visual experience

---

## 🗺️ Journey Overview

```
Entry → Video Introduction → Ready State → Conversation → Collection → Career Exploration → Exit
```

**Current Implementation**: `/video` → `/ready` → `/conversation` → `/collection` → `/exploration`

**Estimated Duration**: 10-20 minutes for complete journey

---

## 📍 Phase 1: Video Introduction

### User's Goal
- Understand what Industrial Design is
- Get inspired and excited about ID
- Decide if they want to continue

### Emotional State
- **Entry**: Curious, possibly uncertain
- **During**: Engaged, intrigued
- **Exit**: Motivated to continue (or ready to skip)

### User's Thoughts
- "What is Industrial Design exactly?"
- "Does this relate to me?"
- "Is this interesting enough to continue?"
- "How long is this video?"

### Visual State
- **Current**: Video fills entire screen (fullscreen)
- **Elements**: 
  - Video player with controls
  - Skip button (top-right)
  - Autoplay on load
- **Transition**: Smooth fade to Ready State

### Interactions Available
- Watch video (15-20 seconds)
- Click skip button (top-right)
- Video ends → auto-transition to Ready

### System Response
- Video plays automatically
- Skip button available after 2-3 seconds
- On video end or skip: Smooth transition to `/ready`

### Current Implementation Status
✅ **Implemented**: Video component exists  
✅ **Working**: Video plays, skip button functional  
⚠️ **Needs**: Smoother transition animation to Ready State

### UX Questions & Decisions Needed
1. **Should there be a brief intro text before the video?** (e.g., "Welcome to your Industrial Design journey")
2. **What happens if video fails to load?** (Error state, fallback)
3. **Should skip button be visible immediately or after delay?**
4. **Do we need a progress indicator for video length?**

### Transition to Next Phase
- **Trigger**: Video ends OR user clicks skip
- **Animation**: Fade out video → Fade in Ready State
- **Duration**: ~0.6s ease-out
- **Direction**: Forward only (no back button needed)

---

## 📍 Phase 2: Ready State

### User's Goal
- Confirm they're ready to begin
- Understand what's coming next
- Feel prepared to engage

### Emotional State
- **Entry**: Anticipatory, ready to start
- **During**: Confident, prepared
- **Exit**: Excited to begin conversation

### User's Thoughts
- "What's next?"
- "I'm ready to start"
- "What will I be asked?"
- "How long will this take?"

### Visual State
- **Current**: Clean white background
- **Elements**:
  - "Ready?" text (large, centered)
  - Arrow button (circular, blue border)
  - Minimal, clean design
- **Layout**: Centered, spacious

### Interactions Available
- Click arrow button → proceed to Conversation
- Button should be prominent and inviting

### System Response
- Button has hover effect (scale up, fill with blue)
- Smooth transition to `/conversation` on click

### Current Implementation Status
✅ **Implemented**: ReadyState component exists  
✅ **Working**: Arrow button functional  
⚠️ **Needs**: More context about what's coming (optional intro text)

### UX Questions & Decisions Needed
1. **Should we add brief context text?** (e.g., "Let's start by learning about your interests and talents")
2. **Is the arrow button clear enough?** (Does it need a label like "Start" or "Continue"?)
3. **Should we show a brief preview of what's coming?** (e.g., "You'll chat with an AI about your interests")

### Transition to Next Phase
- **Trigger**: User clicks arrow button
- **Animation**: Fade out → Slide in Conversation interface
- **Duration**: ~0.6s ease-out
- **Direction**: Forward (can add back button if needed)

---

## 📍 Phase 3: Conversation Interface

### User's Goal
- Share their interests and talents
- Feel understood and heard
- Discover what they're passionate about
- Get to know themselves better

### Emotional State
- **Entry**: Curious, maybe a bit nervous about what to say
- **During**: Engaged, reflective, discovering
- **Exit**: Understood, with clearer sense of self

### User's Thoughts
- "What should I say?"
- "How do I start?"
- "What if I don't know what to answer?"
- "Is the AI understanding me?"
- "When will I see results?"

### Visual State
- **Current**: Grok-style chat box (collapsed → expanded)
- **Initial State**: 
  - Welcome content (to be implemented) + Small centered chat box (80px height, 500px width)
  - Welcome content includes:
    - App purpose explanation
    - Greeting message
    - 3-step process overview
- **Expanded State**: Full chat interface (600px height, 600px width)
- **Elements**:
  - Welcome content (pending implementation decision)
  - Chat messages (AI and user)
  - Input field at bottom
  - Send button
  - Typing indicator (when AI is responding)
  - Continue button (after enough exchanges)

### Interactions Available
- Click chat box → expands
- Focus input field → expands
- Type message → send
- Send message → AI responds
- Continue button (after 6+ messages) → proceed to Collection

### System Response
- Chat box expands smoothly on interaction
- AI responds contextually based on conversation history
- Messages appear in real-time
- Typing indicator shows AI is thinking
- Continue button appears when ready

### Current Implementation Status
✅ **Implemented**: ConversationalInterface component  
✅ **Working**: Chat box, message flow, AI responses  
⚠️ **Needs**: 
- Introduction/welcome message explaining what to do
- Better initial state (what greets user?)
- Clear indication of progress
- Guidance on what to talk about

### UX Questions & Decisions Needed
1. ✅ **DECIDED: What should greet the user when they first arrive?**
   - **Solution**: Welcome screen with app explanation and process overview
   - **Content**:
     - Welcome message: "Industrial design is a wide, complex field. We think we can help you discover a path to your career in Industrial Design based on your interests and talents. This is an exciting journey of discovery."
     - Greeting: "Welcome to the UC ID app (name tbd) where we will begin to uncover some career paths for you based on your interests and your talents."
     - Process explanation:
       1. "We'll have a conversation about some of the things you like to get an understanding of your interests."
       2. "Next, we'll try to uncover what you're really good at. There will be some things that are obvious, like drawing, and some that aren't, like spatial design talent."
       3. "This information will feed my understanding of your interests and talents and guide a discovery process aligned with those interests and talents."
   - **Implementation Options**:
     - Option A: Separate welcome screen before chat (full page, click "Start" to begin chat)
     - Option B: Welcome content above chat box (scrollable, chat box below)
     - Option C: Welcome overlay/modal (dismissible, reveals chat box)
     - Option D: Welcome content fades in with chat box, stays visible above
   - **Next Decision**: Which UI pattern? (Recommendation: Option B or D for continuity)

2. **Should the chat box start expanded or collapsed?** (Currently collapsed)
3. **How do we communicate the purpose?** (e.g., "Tell me about things you enjoy creating or working on")
4. **Should we show conversation progress?** (e.g., "Question 3 of 8" or progress bar)
5. **What happens if user wants to go back?** (Back button to Ready State?)
6. **How do we handle empty/confused states?** (Helpful prompts, examples)

### Transition to Next Phase
- **Trigger**: User clicks "Continue to Career Exploration" button (after 6+ messages)
- **Animation**: Chat box fades out → Form collection slides in
- **Duration**: ~0.6s ease-out
- **Direction**: Forward (back button available?)

---

## 📍 Phase 4: Form Collection

### User's Goal
- Organize their interests and talents
- Provide structured data about themselves
- See how their inputs are being used

### Emotional State
- **Entry**: Reflective, ready to organize thoughts
- **During**: Thoughtful, completing tasks
- **Exit**: Accomplished, ready to see results

### User's Thoughts
- "What should I put here?"
- "How detailed should I be?"
- "What if I don't have 3-5 items?"
- "When will I see career suggestions?"

### Visual State
- **Current**: Form with fields for talents and interests
- **Elements**:
  - Input fields
  - Submit button
  - Progress indicators
- **Layout**: Centered form, clean design

### Interactions Available
- Fill in form fields
- Submit form
- Navigate back (if available)

### System Response
- Form validation
- Data saved/stored
- Transition to Career Exploration

### Current Implementation Status
✅ **Implemented**: FormCollection component  
⚠️ **Needs Review**: Form structure, validation, user guidance

### UX Questions & Decisions Needed
1. **What should the form ask for?** (Talents? Interests? Both? In what format?)
2. **How do we connect this to the conversation they just had?** (Pre-populate? Show summary?)
3. **Should this phase be integrated differently?** (Is it redundant with conversation?)
4. **What happens after form submission?** (Immediate transition? Preview?)

### Transition to Next Phase
- **Trigger**: Form submission
- **Animation**: Form slides out → Career Exploration appears
- **Duration**: ~0.6s ease-out

---

## 📍 Phase 5: Career Exploration

### User's Goal
- See career paths that match their profile
- Explore different ID career options
- Get inspired by examples and resources
- Understand next steps

### Emotional State
- **Entry**: Excited, curious to see results
- **During**: Engaged, exploring, comparing
- **Exit**: Inspired, with clear direction or more questions

### User's Thoughts
- "Which career matches me?"
- "What does this career involve?"
- "Can I see examples of this work?"
- "How do I get started?"

### Visual State
- **Planned**: Career path boxes/grid (5 career options)
- **Elements**:
  - Career cards with images/icons
  - Hover effects
  - Click to explore deeper
- **Layout**: Grid or mind map (A/B tested)

### Interactions Available
- View career cards
- Hover for more info
- Click to explore deeper
- Navigate back

### System Response
- Career suggestions based on user profile
- Detailed information on selection
- Links to resources, examples, contacts

### Current Implementation Status
⚠️ **Needs Implementation**: CareerExploration component exists but needs full design

### UX Questions & Decisions Needed
1. **How many career paths should we show?** (3? 5? More?)
2. **What information should each card show?** (Title, description, examples, salary?)
3. **Should we show confidence/match scores?** (How well does this match their profile?)
4. **How deep should exploration go?** (Multiple layers? Sub-careers?)
5. **Should we include practice projects here?** (As mentioned in PRD)

---

## 🔄 Journey Transitions & Animations

### General Transition Principles
- **Duration**: 0.4-0.6 seconds
- **Easing**: ease-out or cubic-bezier for natural feel
- **Direction**: Left-to-right for forward, right-to-left for back
- **Style**: Smooth, not jarring

### Specific Transitions
1. **Video → Ready**: Fade out video, fade in ready state
2. **Ready → Conversation**: Fade out, slide in chat box
3. **Conversation → Collection**: Chat box collapses, form slides in
4. **Collection → Exploration**: Form fades out, career grid appears

---

## ⚠️ UX Gaps & Priorities

### Critical Gaps (Must Fix)
1. **Conversation Introduction**: Users don't know what to do when they arrive
2. **Progress Indication**: No sense of how far along they are
3. **Error States**: What happens if things go wrong?
4. **Empty States**: What if user doesn't know what to say?

### Important Gaps (Should Fix)
1. **Back Navigation**: Can users go back? Should they?
2. **Save Progress**: Can users return later?
3. **Mobile Experience**: How does this work on mobile?
4. **Loading States**: Clear feedback during AI processing

### Nice-to-Have (Future)
1. **Keyboard Shortcuts**: Power user features
2. **Accessibility**: Screen reader support, keyboard navigation
3. **Personalization**: Remember user preferences

---

## 📝 Notes & Decisions Log

### Decision 1: Conversation Introduction
**Question**: What should greet users when they arrive at conversation?
**Status**: ✅ DECIDED
**Decision**: Welcome screen with three-part introduction:
1. App purpose explanation: "Industrial design is a wide, complex field. We think we can help you discover a path to your career in Industrial Design based on your interests and talents. This is an exciting journey of discovery."
2. Greeting: "Welcome to the UC ID app (name tbd) where we will begin to uncover some career paths for you based on your interests and your talents."
3. Process overview with 3 steps:
   - Step 1: Conversation about things they like (interests)
   - Step 2: Uncover what they're good at (obvious and non-obvious talents)
   - Step 3: Discovery process aligned with interests and talents
**Implementation**: TBD - Need to decide on UI pattern (separate screen, overlay, or content above chat box)

---

*This document is a living document. Update as decisions are made and implementation progresses.*

