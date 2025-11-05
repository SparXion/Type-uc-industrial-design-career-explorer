# UCID App - Illustrator Design Checklist

**Project**: UCID Industrial Design Career Explorer App  
**Designer**: [Your Name]  
**Date**: [Current Date]  
**Status**: In Progress

---

## 🎯 **Design System Foundation**

### **Color Palette**
- [ ] Primary Blue: #007BFF
- [ ] Secondary Gray: #6C757D
- [ ] Success Green: #28A745
- [ ] Warning Yellow: #FFC107
- [ ] Danger Red: #DC3545
- [ ] White: #FFFFFF
- [ ] Light Gray: #E9ECEF
- [ ] Text Primary: #212529
- [ ] Text Secondary: #6C757D
- [ ] Border: #DEE2E6

### **Typography Scale**
- [ ] Heading 1: 36px (2.25rem)
- [ ] Heading 2: 30px (1.875rem)
- [ ] Large Text: 20px (1.25rem)
- [ ] Base Text: 16px (1rem)
- [ ] Small Text: 14px (0.875rem)
- [ ] Extra Small: 12px (0.75rem)

---

## 🔘 **Primary Interactive Elements**

### **Arrow Button (Critical UX Element)**
- [ ] **Normal State**: White circle (60px), blue border (2px), right arrow icon
- [ ] **Hover State**: Blue background, white arrow, scale 1.1x
- [ ] **Active State**: Pressed down effect (scale 0.95x)
- [ ] **Disabled State**: Grayed out (opacity 0.5)
- [ ] **File**: `arrow-button-normal.png`, `arrow-button-hover.png`, `arrow-button-active.png`, `arrow-button-disabled.png`

### **Primary Buttons**
- [ ] **Normal State**: Blue background, white text, 8px border radius, 40-48px height
- [ ] **Hover State**: Darker blue (#0056b3), lift effect (translateY -1px)
- [ ] **Active State**: Pressed down (translateY 0)
- [ ] **Disabled State**: Grayed out, no hover effects
- [ ] **Variations**: Send, Next, Continue, Start Over, Print Career Summary
- [ ] **File**: `button-primary-normal.png`, `button-primary-hover.png`, `button-primary-active.png`, `button-primary-disabled.png`

### **Skip Button**
- [ ] **Normal State**: Transparent/ghost style, top-right positioning
- [ ] **Hover State**: Light background highlight
- [ ] **File**: `skip-button-normal.png`, `skip-button-hover.png`

---

## 📝 **Form Elements**

### **Text Input Fields**
- [ ] **Normal State**: White background, gray border (2px), 8px border radius
- [ ] **Focus State**: Blue border, subtle blue shadow (0 0 0 3px rgba(0, 123, 255, 0.1))
- [ ] **Error State**: Red border, red shadow
- [ ] **Success State**: Green border, green shadow
- [ ] **Placeholder Text**: Light gray styling
- [ ] **File**: `input-normal.png`, `input-focus.png`, `input-error.png`, `input-success.png`

### **Textarea Fields**
- [ ] **Same states as text inputs**
- [ ] **Resize handle indicator** (bottom-right corner)
- [ ] **File**: `textarea-normal.png`, `textarea-focus.png`, `textarea-error.png`, `textarea-success.png`

### **Progress Indicators**
- [ ] **Step Dots - Empty**: Gray circle (12px)
- [ ] **Step Dots - Current**: Blue circle (12px)
- [ ] **Step Dots - Completed**: Green circle (12px)
- [ ] **Connecting Lines**: Light gray lines between dots
- [ ] **File**: `progress-dot-empty.png`, `progress-dot-current.png`, `progress-dot-completed.png`, `progress-line.png`

---

## 🎨 **Career Exploration Elements**

### **Career Path Cards**
- [ ] **Normal State**: White background, subtle border, 12px border radius, clean layout
- [ ] **Hover State**: Blue border, lift effect (translateY -4px), enhanced shadow
- [ ] **Active/Selected State**: Green border, highlighted background (#F8F9FA)
- [ ] **Content Layout**: Icon space (top), title, description, salary (bottom)
- [ ] **Grid Layout**: 5 cards, responsive design
- [ ] **File**: `career-card-normal.png`, `career-card-hover.png`, `career-card-selected.png`

### **Career Icons (24px, 32px, 48px variants)**
- [ ] **Product Design**: Gear/lightbulb icon
- [ ] **User Experience**: User/interface icon
- [ ] **Sustainable Design**: Leaf/recycle icon
- [ ] **Medical Devices**: Medical cross/device icon
- [ ] **Automotive**: Car/vehicle icon
- [ ] **File**: `icon-product-design.svg`, `icon-ux.svg`, `icon-sustainability.svg`, `icon-medical.svg`, `icon-automotive.svg`

---

## 💬 **Conversation Interface**

### **Chat Bubbles**
- [ ] **User Messages**: Right-aligned, blue background (#007BFF), white text
- [ ] **AI Messages**: Left-aligned, white background, gray border, dark text
- [ ] **Message Timestamps**: Subtle gray text, small size
- [ ] **File**: `chat-bubble-user.png`, `chat-bubble-ai.png`, `chat-timestamp.png`

### **Typing Indicator**
- [ ] **Three Animated Dots**: Gray circles (8px), staggered animation
- [ ] **Container**: Light background, rounded corners
- [ ] **File**: `typing-indicator.png`

### **Input Container**
- [ ] **Text Input**: Same as form inputs
- [ ] **Send Button**: Integrated with input, right side
- [ ] **Send Button States**: Normal, hover, disabled
- [ ] **File**: `chat-input-container.png`, `send-button-normal.png`, `send-button-hover.png`, `send-button-disabled.png`

---

## 🧭 **Navigation Elements**

### **Back Button**
- [ ] **Normal State**: Left arrow icon, secondary button styling
- [ ] **Hover State**: Slight background highlight
- [ ] **Disabled State**: Grayed out (for first step)
- [ ] **File**: `back-button-normal.png`, `back-button-hover.png`, `back-button-disabled.png`

### **Continue/Next Buttons**
- [ ] **Normal State**: Right arrow with text, primary styling
- [ ] **Hover State**: Enhanced styling
- [ ] **Disabled State**: Grayed out (when form incomplete)
- [ ] **File**: `continue-button-normal.png`, `continue-button-hover.png`, `continue-button-disabled.png`

---

## ⏳ **Loading & Feedback States**

### **Loading Spinners**
- [ ] **Typing Indicator Dots**: Three pulsing dots
- [ ] **Page Transition Loading**: Spinner or progress bar
- [ ] **Button Loading States**: Spinner overlay on buttons
- [ ] **File**: `loading-dots.png`, `loading-spinner.png`, `button-loading.png`

### **Success/Error Indicators**
- [ ] **Checkmark Icon**: Green checkmark
- [ ] **Error Icon**: Red X or warning triangle
- [ ] **Toast Notification**: Background with icon and text
- [ ] **File**: `icon-success.png`, `icon-error.png`, `toast-notification.png`

---

## 🎨 **Layout & Background Elements**

### **Page Backgrounds**
- [ ] **Clean White Backgrounds**: Pure white (#FFFFFF)
- [ ] **Subtle Gradient Overlays**: Light gradients for depth
- [ ] **Content Container Backgrounds**: Light gray (#F8F9FA)
- [ ] **File**: `background-white.png`, `background-gradient.png`, `container-background.png`

### **Profile Summary Card**
- [ ] **Light Gray Background**: #F8F9FA
- [ ] **Rounded Corners**: 12px border radius
- [ ] **Text Hierarchy**: Title, content, proper spacing
- [ ] **File**: `profile-summary-card.png`

---

## 📱 **Responsive Design Elements**

### **Mobile Adaptations**
- [ ] **Smaller Button Sizes**: 36px height for mobile
- [ ] **Touch-Friendly Targets**: Minimum 44px touch targets
- [ ] **Simplified Layouts**: Stacked elements for narrow screens
- [ ] **File**: `button-mobile.png`, `career-card-mobile.png`

### **Tablet Adaptations**
- [ ] **Medium Button Sizes**: 42px height
- [ ] **Grid Adjustments**: 2-3 columns for career cards
- [ ] **File**: `button-tablet.png`, `career-card-tablet.png`

---

## 📁 **File Organization**

### **Naming Convention**
- [ ] **Format**: `element-state.png` or `element-state.svg`
- [ ] **Examples**: `arrow-button-hover.png`, `icon-product-design.svg`
- [ ] **States**: normal, hover, active, disabled, error, success

### **File Specifications**
- [ ] **PNG**: For complex elements with multiple colors
- [ ] **SVG**: For scalable icons and simple graphics
- [ ] **Resolution**: 2x for retina displays (e.g., 120px for 60px element)
- [ ] **Transparency**: PNG files with alpha channel
- [ ] **Optimization**: Compressed file sizes

### **Folder Structure**
```
Assets/Images/UI-Elements/
├── Buttons/
│   ├── arrow-button-*.png
│   ├── button-primary-*.png
│   └── skip-button-*.png
├── Forms/
│   ├── input-*.png
│   ├── textarea-*.png
│   └── progress-*.png
├── Career/
│   ├── career-card-*.png
│   └── icons/
│       └── icon-*.svg
├── Chat/
│   ├── chat-bubble-*.png
│   └── typing-indicator.png
├── Navigation/
│   ├── back-button-*.png
│   └── continue-button-*.png
├── Loading/
│   ├── loading-*.png
│   └── success-error-*.png
└── Layout/
    ├── background-*.png
    └── profile-card.png
```

---

## ✅ **Quality Checklist**

### **Design Consistency**
- [ ] All elements follow the established color palette
- [ ] Typography matches the defined scale
- [ ] Spacing follows the 4px grid system
- [ ] Border radius is consistent (8px for buttons, 12px for cards)
- [ ] Shadows follow the established hierarchy

### **Interactive States**
- [ ] All interactive elements have hover states
- [ ] All buttons have active/pressed states
- [ ] Form elements have focus, error, and success states
- [ ] Disabled states are clearly distinguishable

### **Accessibility**
- [ ] High contrast ratios for text
- [ ] Clear focus indicators
- [ ] Touch targets meet minimum size requirements
- [ ] Color is not the only indicator of state

### **Technical Requirements**
- [ ] Files are optimized for web use
- [ ] SVG icons are properly sized and scalable
- [ ] PNG files have appropriate transparency
- [ ] File sizes are reasonable for web performance

---

## 📋 **Implementation Priority**

### **Phase 1: Core UI (Week 1-2)**
- [ ] Arrow button designs (critical for UX flow)
- [ ] Basic form input designs
- [ ] Button variations
- [ ] Page transition animations

### **Phase 2: Interactive States (Week 3-4)**
- [ ] Hover effects for career path boxes
- [ ] Form validation states
- [ ] Loading indicators
- [ ] Success/error feedback

### **Phase 3: Advanced Interactions (Week 5-6)**
- [ ] Conversation interface design
- [ ] Career exploration interactions
- [ ] Responsive grid layouts
- [ ] Micro-animations

---

## 📝 **Notes**

### **Design Guidelines**
- Maintain the clean, minimal aesthetic from existing artboards
- Use white backgrounds with strategic interactive elements
- Ensure all elements work across different screen sizes
- Focus on user experience and clear visual hierarchy

### **Integration Notes**
- All elements will be integrated using CSS classes
- Hover and active states will be handled via CSS transitions
- Icons should be SVG for scalability
- Consider animation timing and easing functions

---

**Total Elements to Design**: 50+ individual UI elements  
**Estimated Time**: 3-4 weeks  
**Review Cycles**: Weekly check-ins recommended

---

*This checklist ensures all UI elements are designed consistently and meet the technical requirements for the UCID Industrial Design Career Explorer App.*

