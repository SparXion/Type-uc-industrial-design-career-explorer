# 📋 UCID App Manual Testing Checklist
*Step-by-step manual testing guide for the UCID Industrial Design Career Explorer*

## 🚀 **Pre-Test Setup**

### **Environment Check**
- [ ] App is running on `http://localhost:5173`
- [ ] All dependencies installed (`npm install`)
- [ ] Database is running (if applicable)
- [ ] Test browser is ready (Chrome/Firefox/Safari)

### **Test Data Preparation**
- [ ] Clear browser cache and localStorage
- [ ] Prepare test user personas
- [ ] Have stopwatch ready for performance tests

---

## 🎯 **1. FUNCTIONAL TESTING**

### **Test 1.1: Complete User Journey**
**Objective**: Validate end-to-end user experience

#### **Steps**:
1. [ ] Open browser to `http://localhost:5173`
2. [ ] Verify video introduction loads and plays
3. [ ] Wait for video to complete or click to skip
4. [ ] Verify "Ready?" state appears
5. [ ] Click "Ready" button
6. [ ] Verify conversation interface loads
7. [ ] Answer first question: "What was your favorite movie or TV show growing up?"
8. [ ] Verify AI response appears
9. [ ] Answer second question: "Do you have any favorite comic book characters?"
10. [ ] Continue answering all 8 questions
11. [ ] Verify "Continue" button appears after all questions
12. [ ] Click "Continue" button
13. [ ] Verify form collection page loads
14. [ ] Fill out talents and interests form
15. [ ] Submit form
16. [ ] Verify career exploration page loads
17. [ ] Explore different career paths
18. [ ] Verify all career paths are clickable and show content

#### **Expected Results**:
- [ ] Smooth navigation between all pages
- [ ] No broken links or 404 errors
- [ ] All components render properly
- [ ] Data persists between pages

#### **Issues Found**:
- [ ] _________________________________
- [ ] _________________________________
- [ ] _________________________________

---

### **Test 1.2: Video Introduction**
**Objective**: Validate video functionality

#### **Steps**:
1. [ ] Load app at root URL
2. [ ] Verify video element is present
3. [ ] Check video plays automatically
4. [ ] Verify video quality is good
5. [ ] Test video controls (play/pause/volume)
6. [ ] Verify video transitions to ready state
7. [ ] Test on different screen sizes

#### **Expected Results**:
- [ ] Video loads and plays smoothly
- [ ] Good video quality
- [ ] Smooth transition to next state
- [ ] Responsive on all screen sizes

#### **Issues Found**:
- [ ] _________________________________
- [ ] _________________________________

---

### **Test 1.3: Conversational Interface**
**Objective**: Validate conversation flow

#### **Steps**:
1. [ ] Navigate to conversation page
2. [ ] Verify welcome message appears
3. [ ] Check typing indicator works
4. [ ] Answer first question
5. [ ] Verify AI response appears
6. [ ] Check next question appears
7. [ ] Test keyboard navigation (Enter to send)
8. [ ] Test with empty input (should be disabled)
9. [ ] Complete all 8 questions
10. [ ] Verify continue button appears
11. [ ] Test continue button functionality

#### **Expected Results**:
- [ ] All 8 questions asked in sequence
- [ ] AI responses are relevant
- [ ] Typing indicator works
- [ ] Continue button appears after all questions
- [ ] Data is cached properly

#### **Issues Found**:
- [ ] _________________________________
- [ ] _________________________________

---

## 🎨 **2. UX/UI TESTING**

### **Test 2.1: Design System Compliance**
**Objective**: Validate North Star design system

#### **Steps**:
1. [ ] Check color palette matches North Star
2. [ ] Verify typography hierarchy
3. [ ] Test spacing consistency
4. [ ] Check button styles and interactions
5. [ ] Verify form input styling
6. [ ] Test hover effects
7. [ ] Check focus states
8. [ ] Verify loading states

#### **Expected Results**:
- [ ] Colors match North Star specifications
- [ ] Typography is consistent
- [ ] Spacing follows design system
- [ ] Interactive elements work properly

#### **Issues Found**:
- [ ] _________________________________
- [ ] _________________________________

---

### **Test 2.2: UX Anchor Compliance**
**Objective**: Validate all 5 UX anchors

#### **Steps**:
1. [ ] **Anchor 1**: Verify video introduction
2. [ ] **Anchor 2**: Verify ready state with arrow button
3. [ ] **Anchor 3**: Verify conversation start
4. [ ] **Anchor 4**: Verify data collection form
5. [ ] **Anchor 5**: Verify career exploration

#### **Expected Results**:
- [ ] All 5 anchors present and functional
- [ ] Smooth transitions between anchors
- [ ] Each anchor serves its purpose

#### **Issues Found**:
- [ ] _________________________________
- [ ] _________________________________

---

### **Test 2.3: Responsive Design**
**Objective**: Validate mobile responsiveness

#### **Steps**:
1. [ ] Test on mobile viewport (375px)
2. [ ] Test on tablet viewport (768px)
3. [ ] Test on desktop viewport (1920px)
4. [ ] Verify touch interactions work
5. [ ] Check text readability on small screens
6. [ ] Test form inputs on mobile
7. [ ] Verify navigation works on touch

#### **Expected Results**:
- [ ] App works on all screen sizes
- [ ] Touch interactions work properly
- [ ] Text is readable on all devices
- [ ] Forms are usable on mobile

#### **Issues Found**:
- [ ] _________________________________
- [ ] _________________________________

---

## ⚡ **3. PERFORMANCE TESTING**

### **Test 3.1: Load Time Performance**
**Objective**: Validate app loads quickly

#### **Steps**:
1. [ ] Clear browser cache
2. [ ] Start stopwatch
3. [ ] Load app
4. [ ] Stop stopwatch when page is fully loaded
5. [ ] Record load time
6. [ ] Test on slow connection (throttle to 3G)
7. [ ] Test video load time
8. [ ] Check bundle size in DevTools

#### **Expected Results**:
- [ ] Initial load < 3 seconds
- [ ] Video loads < 5 seconds
- [ ] Bundle size is reasonable
- [ ] Works on slow connections

#### **Issues Found**:
- [ ] _________________________________
- [ ] _________________________________

---

### **Test 3.2: Runtime Performance**
**Objective**: Validate smooth performance

#### **Steps**:
1. [ ] Open DevTools Performance tab
2. [ ] Start recording
3. [ ] Navigate through app
4. [ ] Stop recording
5. [ ] Check for performance issues
6. [ ] Test memory usage
7. [ ] Check for memory leaks
8. [ ] Test animation performance

#### **Expected Results**:
- [ ] Smooth 60fps animations
- [ ] No memory leaks
- [ ] Stable memory usage
- [ ] No performance bottlenecks

#### **Issues Found**:
- [ ] _________________________________
- [ ] _________________________________

---

## 🔒 **4. SECURITY & COMPLIANCE TESTING**

### **Test 4.1: Data Privacy**
**Objective**: Validate FERPA/GDPR compliance

#### **Steps**:
1. [ ] Check for privacy policy
2. [ ] Verify data collection practices
3. [ ] Test data storage security
4. [ ] Check for data deletion options
5. [ ] Verify consent mechanisms
6. [ ] Test data portability

#### **Expected Results**:
- [ ] Privacy policy present
- [ ] Data collection is transparent
- [ ] Data is stored securely
- [ ] User can delete their data

#### **Issues Found**:
- [ ] _________________________________
- [ ] _________________________________

---

### **Test 4.2: Input Security**
**Objective**: Validate input sanitization

#### **Steps**:
1. [ ] Test XSS prevention
2. [ ] Try SQL injection attempts
3. [ ] Test with malicious input
4. [ ] Verify input validation
5. [ ] Check for script injection
6. [ ] Test with special characters

#### **Expected Results**:
- [ ] All inputs properly sanitized
- [ ] No XSS vulnerabilities
- [ ] Input validation works
- [ ] Special characters handled safely

#### **Issues Found**:
- [ ] _________________________________
- [ ] _________________________________

---

## 🧠 **5. AI/LLM TESTING**

### **Test 5.1: Conversation Quality**
**Objective**: Validate AI responses

#### **Steps**:
1. [ ] Test with various user inputs
2. [ ] Check response relevance
3. [ ] Verify context understanding
4. [ ] Test with edge cases
5. [ ] Check for inappropriate responses
6. [ ] Verify response timing

#### **Expected Results**:
- [ ] Responses are relevant and helpful
- [ ] Context is understood
- [ ] No inappropriate content
- [ ] Responses are timely

#### **Issues Found**:
- [ ] _________________________________
- [ ] _________________________________

---

### **Test 5.2: Career Path Generation**
**Objective**: Validate career path relevance

#### **Steps**:
1. [ ] Complete conversation with specific interests
2. [ ] Check generated career paths
3. [ ] Verify path relevance to interests
4. [ ] Test path completeness
5. [ ] Check for required information
6. [ ] Verify path exploration works

#### **Expected Results**:
- [ ] Career paths match user interests
- [ ] All paths have complete information
- [ ] Path exploration works properly
- [ ] Information is accurate and helpful

#### **Issues Found**:
- [ ] _________________________________
- [ ] _________________________________

---

## 📊 **6. SUCCESS METRICS VALIDATION**

### **Test 6.1: Student Outcomes**
**Objective**: Validate success metrics

#### **Steps**:
1. [ ] Complete full user journey
2. [ ] Count identified career paths (should be 3-5)
3. [ ] Verify path relevance
4. [ ] Check skill identification
5. [ ] Verify company recommendations
6. [ ] Test concrete steps provided

#### **Expected Results**:
- [ ] 3-5 relevant career paths identified
- [ ] Clear skill sets identified
- [ ] Relevant companies recommended
- [ ] Concrete steps provided

#### **Issues Found**:
- [ ] _________________________________
- [ ] _________________________________

---

## 🚀 **7. CROSS-BROWSER TESTING**

### **Test 7.1: Browser Compatibility**
**Objective**: Validate cross-browser support

#### **Steps**:
1. [ ] Test in Chrome
2. [ ] Test in Firefox
3. [ ] Test in Safari
4. [ ] Test in Edge
5. [ ] Check for browser-specific issues
6. [ ] Verify consistent experience

#### **Expected Results**:
- [ ] App works in all browsers
- [ ] Consistent experience across browsers
- [ ] No browser-specific bugs

#### **Issues Found**:
- [ ] _________________________________
- [ ] _________________________________

---

## 📱 **8. ACCESSIBILITY TESTING**

### **Test 8.1: WCAG Compliance**
**Objective**: Validate accessibility standards

#### **Steps**:
1. [ ] Test keyboard navigation
2. [ ] Check color contrast ratios
3. [ ] Verify screen reader compatibility
4. [ ] Test focus management
5. [ ] Check ARIA labels
6. [ ] Test with accessibility tools

#### **Expected Results**:
- [ ] Meets WCAG 2.1 AA standards
- [ ] Keyboard navigation works
- [ ] Screen reader compatible
- [ ] Proper ARIA labels

#### **Issues Found**:
- [ ] _________________________________
- [ ] _________________________________

---

## 📝 **TEST SUMMARY**

### **Overall Results**
- [ ] **Functional Tests**: Passed / Failed
- [ ] **UX/UI Tests**: Passed / Failed
- [ ] **Performance Tests**: Passed / Failed
- [ ] **Security Tests**: Passed / Failed
- [ ] **AI/LLM Tests**: Passed / Failed
- [ ] **Success Metrics**: Passed / Failed

### **Critical Issues**
1. _________________________________
2. _________________________________
3. _________________________________

### **Recommendations**
1. _________________________________
2. _________________________________
3. _________________________________

### **Test Completed By**: _________________
### **Date**: _________________
### **Test Environment**: _________________

---

*Manual Testing Checklist v1.0*  
*Last Updated: August 28, 2025*

