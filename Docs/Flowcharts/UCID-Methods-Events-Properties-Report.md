# UCID App - Methods, Events, and Properties Report
*Comprehensive analysis of user actions, system events, and configuration*

**Generated**: [Date]  
**Version**: 1.0

---

## 📋 Overview

This document categorizes all aspects of the UCID app into three key areas:
- **Methods**: Actions users perform (what users DO)
- **Events**: System changes that are of interest to users (what HAPPENS)
- **Properties**: Configuration that initializes the system (how it's SET UP)

---

## 🎯 METHODS - User Actions

### Navigation Methods
| Method | Component | Description | Trigger |
|--------|-----------|-------------|---------|
| `navigate('/video')` | App Router | Initial route redirect | App load |
| `navigate('/ready')` | VideoIntroduction | Move to ready state | Video ends or skip clicked |
| `navigate('/conversation')` | ReadyState | Start conversation | Arrow button clicked |
| `navigate('/collection')` | ConversationalInterface | Move to form collection | Continue button clicked (after 6+ messages) |
| `navigate('/exploration')` | FormCollection | Move to career exploration | Form submitted |
| `handleBack()` | FormCollection | Return to previous step | Back button clicked |

### Video Introduction Methods
| Method | Component | Description | Trigger |
|--------|-----------|-------------|---------|
| `handleSkip()` | VideoIntroduction | Skip video introduction | Skip button clicked |
| `handleVideoEnd()` | VideoIntroduction | Video finished playing | Video ends naturally |
| Watch video | VideoIntroduction | User watches intro video | Video autoplays |

### Conversation Methods
| Method | Component | Description | Trigger |
|--------|-----------|-------------|---------|
| `handleSendMessage()` | ConversationalInterface | Send user message to AI | Send button clicked or Enter key pressed |
| `handleInputFocus()` | ConversationalInterface | Focus on input field | Input field clicked/focused |
| `handleBoxClick()` | ConversationalInterface | Click chat box to expand | Chat box clicked (when collapsed) |
| `handleKeyPress()` | ConversationalInterface | Handle keyboard input | Key pressed in input field |
| `handleContinue()` | ConversationalInterface | Continue to next phase | Continue button clicked |
| Type message | ConversationalInterface | User types in input field | User types in chat input |
| Click chat box | ConversationalInterface | Expand collapsed chat box | User clicks on chat container |

### Form Collection Methods
| Method | Component | Description | Trigger |
|--------|-----------|-------------|---------|
| `handleInputChange()` | FormCollection | Update form field value | User types in form field |
| `handleNext()` | FormCollection | Move to next form step | Next button clicked |
| `handleBack()` | FormCollection | Return to previous step | Back button clicked |
| Fill form fields | FormCollection | User enters data | User types in textarea/input |

### Career Exploration Methods
| Method | Component | Description | Trigger |
|--------|-----------|-------------|---------|
| `handleCareerSelect()` | CareerExploration | Select a career path | Career card clicked |
| `handleStartOver()` | CareerExploration | Restart journey | Start over button clicked |
| Print summary | CareerExploration | Print career summary | Print button clicked |
| Hover career card | CareerExploration | View career preview | Mouse hovers over card |
| Click career card | CareerExploration | Explore career details | Career card clicked |

### UI Interaction Methods
| Method | Component | Description | Trigger |
|--------|-----------|-------------|---------|
| Click button | All | Activate button action | User clicks any button |
| Hover element | All | Visual feedback on hover | Mouse hovers over interactive element |
| Scroll messages | ConversationalInterface | View message history | User scrolls chat area |
| Focus input | All | Activate input field | User clicks/tabs into input |

---

## ⚡ EVENTS - System Changes of Interest

### Navigation Events
| Event | Description | User Impact | Triggered By |
|-------|-------------|-------------|--------------|
| Route change | User moves to new screen | Sees new phase of journey | Navigation method |
| Page transition | Smooth animation between screens | Visual continuity | Route change |
| Back navigation | Return to previous screen | Can review or change inputs | Back button |

### Video Introduction Events
| Event | Description | User Impact | Triggered By |
|-------|-------------|-------------|--------------|
| Video starts playing | Intro video begins | Sees ID introduction | Page load |
| Video ends | Intro video completes | Automatically moves forward | Video completion |
| Skip button appears | Option to skip becomes available | Can skip after 2-3 seconds | Time delay |
| Transition to Ready | Move to ready state | Sees "Ready?" screen | Video end or skip |

### Conversation Events
| Event | Description | User Impact | Triggered By |
|-------|-------------|-------------|--------------|
| Chat box expands | Chat interface grows from compact to full | More space to interact | User clicks box or focuses input |
| Message sent | User message appears in chat | Confirms their input was received | Send message |
| AI typing indicator | Shows AI is processing | Knows AI is thinking | Message sent |
| AI response received | AI message appears in chat | Gets contextual response | AI processing complete |
| Continue button appears | Option to proceed becomes available | Can move to next phase | After 6+ messages |
| Conversation context updated | AI builds understanding of user | Responses become more relevant | Each message exchange |

### Form Collection Events
| Event | Description | User Impact | Triggered By |
|-------|-------------|-------------|--------------|
| Form step changes | Move to next form section | New questions appear | Next button |
| Form data saved | User inputs stored | Data persists | Form submission |
| Form validation | Inputs checked for correctness | Feedback on errors | Field changes |

### Career Exploration Events
| Event | Description | User Impact | Triggered By |
|-------|-------------|-------------|--------------|
| Career suggestions appear | Career paths displayed | Sees personalized options | Form submission |
| Career card hover | Visual feedback on hover | Preview career option | Mouse hover |
| Career selected | Career details shown | Explores specific path | Career card click |
| Career data loaded | Career information available | Can explore options | Navigation to exploration |

### AI Processing Events
| Event | Description | User Impact | Triggered By |
|-------|-------------|-------------|--------------|
| LLM service called | AI processing begins | Response incoming | Message sent |
| Context analysis | AI analyzes conversation history | More relevant responses | Each interaction |
| Response generated | AI creates contextual response | Gets personalized answer | AI processing |

### Error Events
| Event | Description | User Impact | Triggered By |
|-------|-------------|-------------|--------------|
| API error | Backend request fails | Error message shown | Network/server issue |
| Validation error | Form input invalid | Error feedback displayed | Invalid input |
| Video load error | Video fails to load | Fallback content shown | Video file issue |

### State Change Events
| Event | Description | User Impact | Triggered By |
|-------|-------------|-------------|--------------|
| Messages updated | Chat history changes | New messages visible | Message sent/received |
| Input cleared | Input field resets | Ready for next message | Message sent |
| Typing state changes | Typing indicator toggles | Visual feedback on AI status | AI processing |
| Expanded state changes | Chat box size changes | More/less interface space | User interaction |

---

## ⚙️ PROPERTIES - Configuration & Initialization

### Route Configuration
| Property | Value | Description | Location |
|----------|-------|-------------|----------|
| `/` | Redirects to `/video` | Default route | App.tsx |
| `/video` | VideoIntroduction component | Video intro screen | App.tsx |
| `/ready` | ReadyState component | Ready confirmation screen | App.tsx |
| `/conversation` | ConversationalInterface component | Chat interface | App.tsx |
| `/collection` | FormCollection component | Form input screen | App.tsx |
| `/exploration` | CareerExploration component | Career discovery screen | App.tsx |

### Component Initial State Properties

#### ConversationalInterface
| Property | Initial Value | Description | Type |
|----------|---------------|-------------|------|
| `messages` | `[{ id: 1, text: "Hi! I'm here...", isUser: false, timestamp: new Date() }]` | Initial AI greeting | Message[] |
| `inputValue` | `''` | Empty input field | string |
| `isTyping` | `false` | No typing indicator | boolean |
| `isExpanded` | `false` | Chat box starts collapsed | boolean |

#### VideoIntroduction
| Property | Initial Value | Description | Type |
|----------|---------------|-------------|------|
| `showSkip` | `false` | Skip button hidden initially | boolean |

#### FormCollection
| Property | Initial Value | Description | Type |
|----------|---------------|-------------|------|
| `currentStep` | `1` | Start at first step | number |
| `formData` | `{ talents: '', interests: '', goals: '' }` | Empty form fields | object |

### CSS Design System Properties

#### Color Variables
| Property | Value | Usage |
|----------|-------|-------|
| `--uc-white` | `#FFFFFF` | Backgrounds |
| `--uc-off-white` | `#F8F9FA` | Light backgrounds |
| `--uc-light-gray` | `#E9ECEF` | Subtle backgrounds |
| `--uc-primary` | `#007BFF` | Primary actions, buttons |
| `--uc-secondary` | `#6C757D` | Secondary text |
| `--uc-accent` | `#28A745` | Success states |
| `--uc-warning` | `#FFC107` | Warning states |
| `--uc-danger` | `#DC3545` | Error states |
| `--uc-text-primary` | `#212529` | Main text |
| `--uc-text-secondary` | `#6C757D` | Secondary text |
| `--uc-border` | `#DEE2E6` | Borders |

#### Typography Properties
| Property | Value | Usage |
|----------|-------|-------|
| `--uc-font-primary` | `'Inter', -apple-system, BlinkMacSystemFont, sans-serif` | Main font |
| `--uc-text-xs` | `0.75rem` (12px) | Extra small text |
| `--uc-text-sm` | `0.875rem` (14px) | Small text |
| `--uc-text-base` | `1rem` (16px) | Base text |
| `--uc-text-lg` | `1.125rem` (18px) | Large text |
| `--uc-text-xl` | `1.25rem` (20px) | Extra large text |
| `--uc-text-2xl` | `1.5rem` (24px) | Heading 2 |
| `--uc-text-3xl` | `1.875rem` (30px) | Heading 1 |
| `--uc-text-4xl` | `2.25rem` (36px) | Display text |

#### Spacing Properties
| Property | Value | Usage |
|----------|-------|-------|
| `--uc-space-1` | `0.25rem` (4px) | Tight spacing |
| `--uc-space-2` | `0.5rem` (8px) | Small spacing |
| `--uc-space-3` | `0.75rem` (12px) | Medium spacing |
| `--uc-space-4` | `1rem` (16px) | Base spacing |
| `--uc-space-6` | `1.5rem` (24px) | Large spacing |
| `--uc-space-8` | `2rem` (32px) | Extra large spacing |
| `--uc-space-12` | `3rem` (48px) | Section spacing |
| `--uc-space-16` | `4rem` (64px) | Page spacing |
| `--uc-space-20` | `5rem` (80px) | Major spacing |
| `--uc-space-24` | `6rem` (96px) | Maximum spacing |

### Chat Box Properties
| Property | Value | Description |
|----------|-------|-------------|
| Collapsed height | `80px` | Initial chat box height |
| Collapsed max-width | `500px` | Initial chat box width |
| Expanded height | `600px` | Full chat box height |
| Expanded max-width | `600px` | Full chat box width |
| Border radius | `16px` | Chat box corner radius |
| Transition duration | `0.4s` | Expansion animation time |
| Transition easing | `cubic-bezier(0.4, 0, 0.2, 1)` | Animation curve |

### Animation Properties
| Property | Value | Description |
|----------|-------|-------------|
| Page transition duration | `0.6s` | Screen transition time |
| Page transition easing | `ease-out` | Transition curve |
| Button hover duration | `0.2s` | Hover animation time |
| Message scroll behavior | `smooth` | Scroll animation type |

### LLM Service Properties
| Property | Value | Description |
|----------|-------|-------------|
| Service type | `MockLLMService` | Current implementation |
| Response delay | `800ms` | Simulated AI response time |
| Context window | `Last 10 messages` | Conversation history limit |
| Category | `'talents'` | Default conversation category |

### Form Properties
| Property | Value | Description |
|----------|-------|-------------|
| Total steps | `3` | Number of form sections |
| Step 1 field | `talents` | First form field |
| Step 2 field | `interests` | Second form field |
| Step 3 field | `goals` | Third form field |
| Storage key | `'ucid-form-data'` | localStorage key |

### Message Threshold Properties
| Property | Value | Description |
|----------|-------|-------------|
| Continue button threshold | `6 messages` | When continue button appears |
| Career suggestion threshold | `3-5 inputs` | When career boxes appear (planned) |
| AI confidence threshold | `5 messages` | When AI suggests continuation |

### Video Properties
| Property | Value | Description |
|----------|-------|-------------|
| Video file | `what-Is-ID-001.mp4` | Video asset name |
| Video duration | `15-20 seconds` | Estimated length |
| Skip delay | `2-3 seconds` | When skip button appears |
| Autoplay | `true` | Video starts automatically |

### Breakpoint Properties (Responsive)
| Property | Value | Description |
|----------|-------|-------------|
| Mobile max | `768px` | Mobile breakpoint |
| Tablet min | `768px` | Tablet breakpoint |
| Desktop min | `1024px` | Desktop breakpoint |
| Large desktop min | `1440px` | Large desktop breakpoint |

### localStorage Keys
| Property | Key | Description |
|----------|-----|-------------|
| Form data | `'ucid-form-data'` | Stored form inputs |
| Conversation history | `'ucid-conversation-history'` | Chat messages (planned) |
| User data | `'ucid-user-data'` | User profile (planned) |
| Auth token | `'ucid-auth-token'` | Authentication (planned) |
| User ID | `'ucid-user-id'` | User identifier (planned) |

---

## 🔄 Property Flow & Dependencies

### Initialization Sequence
1. **App loads** → Route configuration initializes
2. **Component mounts** → Initial state properties set
3. **CSS variables** → Design system properties loaded
4. **User interaction** → Methods trigger Events
5. **Events occur** → Properties update
6. **Properties change** → UI updates

### State Management Flow
```
User Action (Method) 
  → Component State Change (Property)
    → UI Update (Event)
      → User Sees Change (Event)
```

### Example: Sending a Message
1. **Method**: `handleSendMessage()` called
2. **Property**: `inputValue` cleared, `isTyping` set to `true`
3. **Event**: Message appears in chat, typing indicator shows
4. **Method**: `llmService.generateResponse()` called
5. **Property**: `isTyping` set to `false`, new message added
6. **Event**: AI response appears, typing indicator hides

---

## 📊 Summary Statistics

- **Total Methods**: 20+ user actions
- **Total Events**: 25+ system changes
- **Total Properties**: 50+ configuration values
- **Route Count**: 6 routes
- **Component Count**: 5 main components
- **CSS Variables**: 30+ design tokens

---

## 🎯 Key Insights

### Methods
- Most methods are navigation and input-related
- Conversation methods are the most interactive
- Few delete/undo methods (consider adding)

### Events
- Events are well-distributed across journey phases
- Most events are user-initiated (good)
- Some planned events not yet implemented (career suggestions)

### Properties
- Comprehensive design system with CSS variables
- Clear initial state for all components
- Good separation of concerns (routes, state, styling)
- Some properties need values (app name, video duration)

---

*This report should be updated as new methods, events, and properties are added to the system.*

