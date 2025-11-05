# UCID CSS/UI North Star: Visual Design System

*Last Updated: August 28, 2025*  
*Version: 1.0*

## 🎨 **Design Philosophy**

**"White artboard with interactive bits"** - Clean, minimal, focused on content with strategic interactive elements that guide the user through their career discovery journey.

## 🖼️ **Artwork Analysis**

### **Primary UI System: Artboards 1-20**
- **Style**: Clean white backgrounds with minimal, purposeful design elements
- **Layout**: Full-page artboards designed to fill the entire application viewport
- **Typography**: Clean, readable fonts with strategic hierarchy
- **Color**: Primarily white/light backgrounds with accent colors for interactive elements

### **Content Frames: What-Is-ID Series**
- **Purpose**: Video content frames that guide the user introduction
- **Transition**: Seamless flow from video to interactive application
- **Key Frames**: 001-Begins, 013-Ready, 014-Conversation, 015-Collection

## 🎯 **UX Anchor Artwork (Critical Path)**

### **Anchor 1: Opening Scene**
- **Artwork**: `what-Is-ID-001.mp4` → `Artboard 13.png`
- **Requirement**: Video fills entire screen, seamless transition to "Ready?" state
- **Missing**: Seamless video-to-artboard transition animation

### **Anchor 2: Video Transition**
- **Artwork**: `Artboard 13.png` (Ready state)
- **Requirement**: "Ready?" text with animated arrow button
- **Missing**: Arrow button design, transition animations

### **Anchor 3: Conversation Start**
- **Artwork**: `Artboard 14.png`
- **Requirement**: Conversation interface with icebreaker prompts
- **Missing**: Chat interface design, prompt display system

### **Anchor 4: Data Collection**
- **Artwork**: `Artboard 15.png`
- **Requirement**: Form interface for talents + interests collection
- **Missing**: Form design, input fields, validation states

### **Anchor 5: Career Exploration**
- **Artwork**: `Artboard 18.png`, `Artboard 19.png` (large files - likely detailed)
- **Requirement**: Five career path boxes with hover effects and click states
- **Missing**: Interactive state designs, hover animations, click feedback

## 🎨 **Design System Definition**

### **Color Palette**
```css
:root {
  /* Primary Colors */
  --uc-white: #FFFFFF;
  --uc-off-white: #F8F9FA;
  --uc-light-gray: #E9ECEF;
  
  /* Accent Colors (based on artwork analysis) */
  --uc-primary: #007BFF;      /* Interactive elements */
  --uc-secondary: #6C757D;    /* Secondary text */
  --uc-accent: #28A745;       /* Success states */
  --uc-warning: #FFC107;      /* Attention states */
  --uc-danger: #DC3545;       /* Error states */
  
  /* Neutral Colors */
  --uc-text-primary: #212529;
  --uc-text-secondary: #6C757D;
  --uc-border: #DEE2E6;
}
```

### **Typography Scale**
```css
:root {
  /* Font Families */
  --uc-font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --uc-font-display: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  
  /* Font Sizes */
  --uc-text-xs: 0.75rem;    /* 12px */
  --uc-text-sm: 0.875rem;   /* 14px */
  --uc-text-base: 1rem;     /* 16px */
  --uc-text-lg: 1.125rem;   /* 18px */
  --uc-text-xl: 1.25rem;    /* 20px */
  --uc-text-2xl: 1.5rem;    /* 24px */
  --uc-text-3xl: 1.875rem;  /* 30px */
  --uc-text-4xl: 2.25rem;   /* 36px */
  
  /* Line Heights */
  --uc-leading-tight: 1.25;
  --uc-leading-normal: 1.5;
  --uc-leading-relaxed: 1.75;
}
```

### **Spacing System**
```css
:root {
  /* Spacing Scale */
  --uc-space-1: 0.25rem;   /* 4px */
  --uc-space-2: 0.5rem;    /* 8px */
  --uc-space-3: 0.75rem;   /* 12px */
  --uc-space-4: 1rem;      /* 16px */
  --uc-space-6: 1.5rem;    /* 24px */
  --uc-space-8: 2rem;      /* 32px */
  --uc-space-12: 3rem;     /* 48px */
  --uc-space-16: 4rem;     /* 64px */
  --uc-space-20: 5rem;     /* 80px */
  --uc-space-24: 6rem;     /* 96px */
}
```

## 🔘 **Interactive Elements Design**

### **Primary Button**
```css
.uc-button-primary {
  background: var(--uc-primary);
  color: var(--uc-white);
  border: none;
  border-radius: 8px;
  padding: var(--uc-space-3) var(--uc-space-6);
  font-size: var(--uc-text-base);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 123, 255, 0.2);
}

.uc-button-primary:hover {
  background: #0056b3;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3);
}

.uc-button-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 4px rgba(0, 123, 255, 0.2);
}
```

### **Arrow Button (Critical for UX Flow)**
```css
.uc-arrow-button {
  background: var(--uc-white);
  border: 2px solid var(--uc-primary);
  color: var(--uc-primary);
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.15);
}

.uc-arrow-button:hover {
  background: var(--uc-primary);
  color: var(--uc-white);
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 123, 255, 0.25);
}

.uc-arrow-button svg {
  width: 24px;
  height: 24px;
  transition: transform 0.3s ease;
}

.uc-arrow-button:hover svg {
  transform: translateX(2px);
}
```

### **Career Path Boxes**
```css
.uc-career-box {
  background: var(--uc-white);
  border: 2px solid var(--uc-border);
  border-radius: 12px;
  padding: var(--uc-space-6);
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.uc-career-box:hover {
  border-color: var(--uc-primary);
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 123, 255, 0.15);
}

.uc-career-box.active {
  border-color: var(--uc-accent);
  background: var(--uc-off-white);
  box-shadow: 0 4px 16px rgba(40, 167, 69, 0.2);
}
```

### **Form Inputs**
```css
.uc-input {
  background: var(--uc-white);
  border: 2px solid var(--uc-border);
  border-radius: 8px;
  padding: var(--uc-space-3) var(--uc-space-4);
  font-size: var(--uc-text-base);
  transition: all 0.2s ease;
}

.uc-input:focus {
  outline: none;
  border-color: var(--uc-primary);
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.uc-input.error {
  border-color: var(--uc-danger);
  box-shadow: 0 0 0 3px rgba(220, 53, 69, 0.1);
}
```

## 🎭 **Animation & Transitions**

### **Page Transitions**
```css
.uc-page-transition {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### **Hover Effects**
```css
.uc-hover-lift {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.uc-hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

## 📱 **Responsive Design**

### **Breakpoints**
```css
/* Mobile First Approach */
:root {
  --uc-container-padding: var(--uc-space-4);
}

/* Tablet */
@media (min-width: 768px) {
  :root {
    --uc-container-padding: var(--uc-space-6);
  }
}

/* Desktop */
@media (min-width: 1024px) {
  :root {
    --uc-container-padding: var(--uc-space-8);
  }
}

/* Large Desktop */
@media (min-width: 1440px) {
  :root {
    --uc-container-padding: var(--uc-space-12);
  }
}
```

## 🎨 **Missing Artwork Requirements**

### **Critical Missing Pieces**

#### **1. Interactive Element Designs**
- **Arrow Button States**: Normal, hover, active, disabled
- **Form Input Fields**: Text inputs, textareas, select dropdowns
- **Button Variations**: Primary, secondary, ghost, danger
- **Loading States**: Spinners, progress bars, skeleton screens

#### **2. Career Path Interface**
- **Hover States**: Visual feedback for interactive elements
- **Click States**: Active/selected state designs
- **Transition Animations**: Smooth state changes
- **Grid Layout**: Responsive career path arrangement

#### **3. Conversation Interface**
- **Chat Bubbles**: User and AI message designs
- **Input Area**: Text input with send button
- **Typing Indicators**: AI response loading states
- **Message Flow**: Visual conversation progression

#### **4. Form Collection Interface**
- **Input Fields**: Various input types and states
- **Validation States**: Success, error, warning indicators
- **Progress Indicators**: Form completion progress
- **Submit Button**: Final action button design

#### **5. Navigation Elements**
- **Skip Button**: Video skip functionality
- **Back Button**: Return to previous step
- **Progress Bar**: Step-by-step progress indicator
- **Menu Toggle**: Mobile navigation (if needed)

### **Artwork Specifications**

#### **File Requirements**
- **Format**: PNG with transparency, SVG for scalable elements
- **Resolution**: 2x for retina displays (Artboards 1-20 are 1x)
- **Naming**: Descriptive names with state indicators
- **Organization**: Grouped by component type

#### **Design Consistency**
- **White Backgrounds**: Maintain clean, minimal aesthetic
- **Interactive Elements**: Consistent hover/active states
- **Typography**: Match existing artboard text styles
- **Spacing**: Follow established layout patterns

## 🚀 **Implementation Priority**

### **Phase 1: Core UI (Week 1-2)**
1. Arrow button designs (critical for UX flow)
2. Basic form input designs
3. Button variations
4. Page transition animations

### **Phase 2: Interactive States (Week 3-4)**
1. Hover effects for career path boxes
2. Form validation states
3. Loading indicators
4. Success/error feedback

### **Phase 3: Advanced Interactions (Week 5-6)**
1. Conversation interface design
2. Career exploration interactions
3. Responsive grid layouts
4. Micro-animations

## 📋 **Art Direction Checklist**

### **For Each New Artwork Piece**
- [ ] **Consistency**: Matches existing artboard style
- [ ] **Functionality**: Serves clear UX purpose
- [ ] **Accessibility**: High contrast, readable text
- [ ] **Responsiveness**: Works across device sizes
- [ ] **Performance**: Optimized file sizes
- [ ] **States**: All interactive states designed
- [ ] **Transitions**: Smooth state changes

### **Quality Assurance**
- [ ] **Visual Review**: Matches design system
- [ ] **Technical Review**: Proper file formats and sizes
- [ ] **UX Review**: Serves intended purpose
- [ ] **Accessibility Review**: Meets accessibility standards

## 🔗 **Integration with Development**

### **CSS Variables**
- All design tokens defined as CSS custom properties
- Easy theme switching and maintenance
- Consistent spacing and color usage

### **Component Library**
- Reusable CSS classes for common elements
- Consistent behavior across the application
- Easy to maintain and update

### **Design Handoff**
- Clear specifications for developers
- Interactive states clearly defined
- Responsive behavior documented

---

*This document serves as the visual design foundation for the UCID application. Update as new artwork is created and design decisions evolve.*
