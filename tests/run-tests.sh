#!/bin/bash
# UCID App Test Execution Script
# Runs comprehensive tests for the UCID Industrial Design Career Explorer

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_URL="http://localhost:5173"
TEST_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$TEST_DIR")"
REPORT_DIR="$TEST_DIR/reports"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Create reports directory
mkdir -p "$REPORT_DIR"

# Function to print colored output
print_status() {
    local status=$1
    local message=$2
    case $status in
        "INFO")
            echo -e "${BLUE}ℹ️  $message${NC}"
            ;;
        "SUCCESS")
            echo -e "${GREEN}✅ $message${NC}"
            ;;
        "WARNING")
            echo -e "${YELLOW}⚠️  $message${NC}"
            ;;
        "ERROR")
            echo -e "${RED}❌ $message${NC}"
            ;;
    esac
}

# Function to check if app is running
check_app_running() {
    print_status "INFO" "Checking if app is running at $APP_URL..."
    
    if curl -s -f "$APP_URL" > /dev/null 2>&1; then
        print_status "SUCCESS" "App is running at $APP_URL"
        return 0
    else
        print_status "ERROR" "App is not running at $APP_URL"
        print_status "INFO" "Please start the app with: npm run dev"
        return 1
    fi
}

# Function to run automated tests
run_automated_tests() {
    print_status "INFO" "Running automated tests..."
    
    cd "$PROJECT_ROOT"
    
    # Check if Node.js is available
    if ! command -v node &> /dev/null; then
        print_status "ERROR" "Node.js is not installed"
        return 1
    fi
    
    # Run the automated test runner
    if [ -f "$TEST_DIR/automated-test-runner.js" ]; then
        node "$TEST_DIR/automated-test-runner.js" 2>&1 | tee "$REPORT_DIR/automated-tests-$TIMESTAMP.log"
        
        if [ ${PIPESTATUS[0]} -eq 0 ]; then
            print_status "SUCCESS" "Automated tests completed"
        else
            print_status "ERROR" "Automated tests failed"
            return 1
        fi
    else
        print_status "ERROR" "Automated test runner not found"
        return 1
    fi
}

# Function to run build tests
run_build_tests() {
    print_status "INFO" "Running build tests..."
    
    cd "$PROJECT_ROOT"
    
    # Test build process
    print_status "INFO" "Testing build process..."
    if npm run build; then
        print_status "SUCCESS" "Build completed successfully"
    else
        print_status "ERROR" "Build failed"
        return 1
    fi
    
    # Check build output
    if [ -d "dist" ]; then
        print_status "SUCCESS" "Build output directory created"
        
        # Check for critical files
        local critical_files=("index.html" "assets")
        for file in "${critical_files[@]}"; do
            if [ -e "dist/$file" ]; then
                print_status "SUCCESS" "Critical file $file found in build"
            else
                print_status "WARNING" "Critical file $file not found in build"
            fi
        done
    else
        print_status "ERROR" "Build output directory not found"
        return 1
    fi
}

# Function to run linting tests
run_lint_tests() {
    print_status "INFO" "Running linting tests..."
    
    cd "$PROJECT_ROOT"
    
    # Run ESLint
    if npm run lint 2>&1 | tee "$REPORT_DIR/lint-tests-$TIMESTAMP.log"; then
        print_status "SUCCESS" "Linting passed"
    else
        print_status "WARNING" "Linting issues found (check report)"
    fi
}

# Function to run type checking
run_type_tests() {
    print_status "INFO" "Running TypeScript type checking..."
    
    cd "$PROJECT_ROOT"
    
    # Run TypeScript compiler
    if npx tsc --noEmit 2>&1 | tee "$REPORT_DIR/type-tests-$TIMESTAMP.log"; then
        print_status "SUCCESS" "Type checking passed"
    else
        print_status "WARNING" "Type checking issues found (check report)"
    fi
}

# Function to run performance tests
run_performance_tests() {
    print_status "INFO" "Running performance tests..."
    
    # Check if app is running
    if ! check_app_running; then
        return 1
    fi
    
    # Run Lighthouse CI if available
    if command -v lighthouse &> /dev/null; then
        print_status "INFO" "Running Lighthouse performance audit..."
        lighthouse "$APP_URL" --output=json --output-path="$REPORT_DIR/lighthouse-$TIMESTAMP.json" --chrome-flags="--headless"
        print_status "SUCCESS" "Lighthouse audit completed"
    else
        print_status "WARNING" "Lighthouse not installed, skipping performance audit"
    fi
    
    # Basic performance checks
    print_status "INFO" "Running basic performance checks..."
    
    # Test load time
    local start_time=$(date +%s%3N)
    curl -s "$APP_URL" > /dev/null
    local end_time=$(date +%s%3N)
    local load_time=$((end_time - start_time))
    
    if [ $load_time -lt 3000 ]; then
        print_status "SUCCESS" "Load time: ${load_time}ms (under 3s limit)"
    else
        print_status "WARNING" "Load time: ${load_time}ms (over 3s limit)"
    fi
}

# Function to run security tests
run_security_tests() {
    print_status "INFO" "Running security tests..."
    
    # Check for common security issues
    print_status "INFO" "Checking for security vulnerabilities..."
    
    # Check for exposed sensitive files
    local sensitive_files=(".env" "package-lock.json" "yarn.lock")
    for file in "${sensitive_files[@]}"; do
        if [ -f "$PROJECT_ROOT/$file" ]; then
            if curl -s -f "$APP_URL/$file" > /dev/null 2>&1; then
                print_status "ERROR" "Sensitive file $file is exposed"
            else
                print_status "SUCCESS" "Sensitive file $file is not exposed"
            fi
        fi
    done
    
    # Check for HTTPS (if applicable)
    if [[ "$APP_URL" == https://* ]]; then
        print_status "SUCCESS" "App is using HTTPS"
    else
        print_status "WARNING" "App is not using HTTPS (development only)"
    fi
}

# Function to generate test report
generate_report() {
    print_status "INFO" "Generating test report..."
    
    local report_file="$REPORT_DIR/test-report-$TIMESTAMP.md"
    
    cat > "$report_file" << EOF
# UCID App Test Report
*Generated on $(date)*

## Test Summary
- **Timestamp**: $TIMESTAMP
- **App URL**: $APP_URL
- **Test Environment**: $(uname -s) $(uname -m)

## Test Results

### Automated Tests
- **Status**: $(if [ -f "$REPORT_DIR/automated-tests-$TIMESTAMP.log" ]; then echo "Completed"; else echo "Not Run"; fi)
- **Log**: automated-tests-$TIMESTAMP.log

### Build Tests
- **Status**: $(if [ -f "$REPORT_DIR/build-tests-$TIMESTAMP.log" ]; then echo "Completed"; else echo "Not Run"; fi)
- **Log**: build-tests-$TIMESTAMP.log

### Linting Tests
- **Status**: $(if [ -f "$REPORT_DIR/lint-tests-$TIMESTAMP.log" ]; then echo "Completed"; else echo "Not Run"; fi)
- **Log**: lint-tests-$TIMESTAMP.log

### Type Checking
- **Status**: $(if [ -f "$REPORT_DIR/type-tests-$TIMESTAMP.log" ]; then echo "Completed"; else echo "Not Run"; fi)
- **Log**: type-tests-$TIMESTAMP.log

### Performance Tests
- **Status**: $(if [ -f "$REPORT_DIR/lighthouse-$TIMESTAMP.json" ]; then echo "Completed"; else echo "Not Run"; fi)
- **Log**: lighthouse-$TIMESTAMP.json

## Recommendations
1. Review all test logs for issues
2. Address any critical failures
3. Run manual tests using the checklist
4. Update test suite based on findings

## Next Steps
1. Fix any critical issues found
2. Run manual testing checklist
3. Deploy to staging environment
4. Run production tests
EOF

    print_status "SUCCESS" "Test report generated: $report_file"
}

# Function to show help
show_help() {
    echo "UCID App Test Runner"
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -a, --automated    Run automated tests only"
    echo "  -b, --build        Run build tests only"
    echo "  -l, --lint         Run linting tests only"
    echo "  -t, --types        Run type checking only"
    echo "  -p, --performance  Run performance tests only"
    echo "  -s, --security     Run security tests only"
    echo "  -m, --manual       Show manual testing checklist"
    echo "  -h, --help         Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0                 # Run all tests"
    echo "  $0 -a              # Run automated tests only"
    echo "  $0 -b -l           # Run build and lint tests"
    echo "  $0 -m              # Show manual testing checklist"
}

# Function to show manual testing checklist
show_manual_checklist() {
    if [ -f "$TEST_DIR/manual-test-checklist.md" ]; then
        print_status "INFO" "Opening manual testing checklist..."
        if command -v code &> /dev/null; then
            code "$TEST_DIR/manual-test-checklist.md"
        elif command -v open &> /dev/null; then
            open "$TEST_DIR/manual-test-checklist.md"
        else
            cat "$TEST_DIR/manual-test-checklist.md"
        fi
    else
        print_status "ERROR" "Manual testing checklist not found"
    fi
}

# Main execution
main() {
    print_status "INFO" "Starting UCID App Test Suite"
    print_status "INFO" "Test Directory: $TEST_DIR"
    print_status "INFO" "Project Root: $PROJECT_ROOT"
    print_status "INFO" "Report Directory: $REPORT_DIR"
    echo ""
    
    # Parse command line arguments
    local run_automated=false
    local run_build=false
    local run_lint=false
    local run_types=false
    local run_performance=false
    local run_security=false
    local show_manual=false
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            -a|--automated)
                run_automated=true
                shift
                ;;
            -b|--build)
                run_build=true
                shift
                ;;
            -l|--lint)
                run_lint=true
                shift
                ;;
            -t|--types)
                run_types=true
                shift
                ;;
            -p|--performance)
                run_performance=true
                shift
                ;;
            -s|--security)
                run_security=true
                shift
                ;;
            -m|--manual)
                show_manual=true
                shift
                ;;
            -h|--help)
                show_help
                exit 0
                ;;
            *)
                print_status "ERROR" "Unknown option: $1"
                show_help
                exit 1
                ;;
        esac
    done
    
    # If no specific tests are requested, run all
    if [ "$run_automated" = false ] && [ "$run_build" = false ] && [ "$run_lint" = false ] && [ "$run_types" = false ] && [ "$run_performance" = false ] && [ "$run_security" = false ] && [ "$show_manual" = false ]; then
        run_automated=true
        run_build=true
        run_lint=true
        run_types=true
        run_performance=true
        run_security=true
    fi
    
    # Show manual checklist if requested
    if [ "$show_manual" = true ]; then
        show_manual_checklist
        exit 0
    fi
    
    # Run requested tests
    local test_failed=false
    
    if [ "$run_build" = true ]; then
        if ! run_build_tests; then
            test_failed=true
        fi
        echo ""
    fi
    
    if [ "$run_lint" = true ]; then
        if ! run_lint_tests; then
            test_failed=true
        fi
        echo ""
    fi
    
    if [ "$run_types" = true ]; then
        if ! run_type_tests; then
            test_failed=true
        fi
        echo ""
    fi
    
    if [ "$run_security" = true ]; then
        if ! run_security_tests; then
            test_failed=true
        fi
        echo ""
    fi
    
    if [ "$run_performance" = true ]; then
        if ! run_performance_tests; then
            test_failed=true
        fi
        echo ""
    fi
    
    if [ "$run_automated" = true ]; then
        if ! run_automated_tests; then
            test_failed=true
        fi
        echo ""
    fi
    
    # Generate report
    generate_report
    
    # Final status
    echo ""
    if [ "$test_failed" = true ]; then
        print_status "ERROR" "Some tests failed. Check the reports for details."
        exit 1
    else
        print_status "SUCCESS" "All tests completed successfully!"
        print_status "INFO" "Check the reports directory for detailed results."
        exit 0
    fi
}

# Run main function
main "$@"

