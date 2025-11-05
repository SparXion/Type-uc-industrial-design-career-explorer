# 🧪 UCID App Test Suite
*Comprehensive testing framework for the UCID Industrial Design Career Explorer*

## 🚀 **Quick Start**

### **Prerequisites**
- Node.js installed
- App running on `http://localhost:5173`
- All dependencies installed (`npm install`)

### **Run All Tests**
```bash
npm run test:all
```

### **Run Specific Test Types**
```bash
# Automated tests only
npm run test:automated

# Build tests only
npm run test:build

# Linting tests only
npm run test:lint

# Type checking only
npm run test:types

# Performance tests only
npm run test:performance

# Security tests only
npm run test:security

# Show manual testing checklist
npm run test:manual
```

---

## 📋 **Test Suite Overview**

### **1. Automated Tests** (`automated-test-runner.js`)
- **Functional Testing**: Core user journey, video introduction, conversation flow
- **UX/UI Testing**: Design system compliance, UX anchor validation
- **Performance Testing**: Load times, runtime performance
- **Security Testing**: FERPA/GDPR compliance, input sanitization
- **AI/LLM Testing**: Conversation quality, career path generation
- **Success Metrics**: Student outcome validation

### **2. Manual Tests** (`manual-test-checklist.md`)
- **Step-by-step testing guide**
- **Cross-browser compatibility**
- **Accessibility testing**
- **User experience validation**
- **Edge case testing**

### **3. Test Execution** (`run-tests.sh`)
- **Automated test runner**
- **Build validation**
- **Linting and type checking**
- **Performance auditing**
- **Security scanning**
- **Report generation**

---

## 🎯 **Test Categories**

### **Functional Tests**
- ✅ Complete user journey validation
- ✅ Video introduction functionality
- ✅ Conversational interface flow
- ✅ Form validation and data persistence
- ✅ Career exploration features

### **UX/UI Tests**
- ✅ North Star design system compliance
- ✅ UX anchor implementation
- ✅ Responsive design validation
- ✅ Cross-browser compatibility
- ✅ Accessibility standards (WCAG 2.1 AA)

### **Performance Tests**
- ✅ Initial load time (< 3 seconds)
- ✅ Video loading performance (< 5 seconds)
- ✅ Runtime performance monitoring
- ✅ Memory usage validation
- ✅ Animation performance (60fps)

### **Security Tests**
- ✅ FERPA compliance validation
- ✅ GDPR compliance checking
- ✅ Input sanitization testing
- ✅ Data encryption verification
- ✅ XSS/SQL injection prevention

### **AI/LLM Tests**
- ✅ Conversation quality validation
- ✅ Question sequence logic
- ✅ Career path relevance
- ✅ Response appropriateness
- ✅ Context understanding

### **Success Metrics Tests**
- ✅ Career path identification (3-5 paths)
- ✅ Skill set identification
- ✅ Company targeting
- ✅ Concrete steps provision
- ✅ Student outcome validation

---

## 📊 **Test Results**

### **Test Status Legend**
- ✅ **Passed**: Test completed successfully
- ❌ **Failed**: Test failed, needs attention
- ⏳ **Pending**: Test not yet executed
- 🔄 **In Progress**: Test currently running
- ⚠️ **Blocked**: Test blocked by dependencies

### **Reports Location**
- **Automated Tests**: `tests/reports/automated-tests-[timestamp].log`
- **Build Tests**: `tests/reports/build-tests-[timestamp].log`
- **Linting**: `tests/reports/lint-tests-[timestamp].log`
- **Type Checking**: `tests/reports/type-tests-[timestamp].log`
- **Performance**: `tests/reports/lighthouse-[timestamp].json`
- **Test Report**: `tests/reports/test-report-[timestamp].md`

---

## 🔧 **Test Configuration**

### **Environment Variables**
```bash
# App URL (default: http://localhost:5173)
export UCID_APP_URL="http://localhost:5173"

# Test timeout (default: 30000ms)
export UCID_TEST_TIMEOUT="30000"

# Report directory (default: tests/reports)
export UCID_REPORT_DIR="tests/reports"
```

### **Test Data**
- **Test Users**: Various personas for different testing scenarios
- **Test Inputs**: Edge cases, malicious inputs, special characters
- **Test Scenarios**: Happy path, error conditions, boundary cases

---

## 🚨 **Troubleshooting**

### **Common Issues**

#### **App Not Running**
```bash
# Start the app
npm run dev

# Check if app is accessible
curl http://localhost:5173
```

#### **Tests Failing**
```bash
# Check test logs
cat tests/reports/automated-tests-[timestamp].log

# Run specific test
npm run test:automated

# Check app status
npm run test:build
```

#### **Performance Issues**
```bash
# Run performance tests
npm run test:performance

# Check Lighthouse report
cat tests/reports/lighthouse-[timestamp].json
```

### **Debug Mode**
```bash
# Run tests with debug output
DEBUG=true npm run test:all

# Verbose test output
VERBOSE=true npm run test:automated
```

---

## 📈 **Continuous Integration**

### **GitHub Actions** (if applicable)
```yaml
name: UCID App Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm run test:all
```

### **Pre-commit Hooks**
```bash
# Install pre-commit hooks
npm install --save-dev husky lint-staged

# Add to package.json
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
}
```

---

## 🎯 **Success Criteria**

### **Test Coverage Goals**
- **Functional Tests**: 100% of user journeys
- **UX/UI Tests**: 100% of design system compliance
- **Performance Tests**: All metrics under limits
- **Security Tests**: 100% compliance validation
- **AI/LLM Tests**: 100% conversation quality

### **Quality Gates**
- ✅ All critical tests must pass
- ✅ Performance metrics within limits
- ✅ Security compliance validated
- ✅ Accessibility standards met
- ✅ Cross-browser compatibility confirmed

---

## 📚 **Additional Resources**

### **Testing Documentation**
- [Test Suite Overview](ucid-app-test-suite.md)
- [Manual Testing Checklist](manual-test-checklist.md)
- [Automated Test Runner](automated-test-runner.js)
- [Test Execution Script](run-tests.sh)

### **External Tools**
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [ESLint](https://eslint.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

*Test Suite v1.0*  
*Last Updated: August 28, 2025*  
*Status: Ready for Execution*

