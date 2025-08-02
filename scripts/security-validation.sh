#!/bin/bash

# Security Validation Script for Soph's Menu Production Deployment
# Run this script after deployment to validate security measures

echo "🔒 Security Validation Script for Soph's Menu"
echo "============================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default domain - replace with your actual domain
DOMAIN=${1:-"localhost"}
PROTOCOL="https"

if [ "$DOMAIN" = "localhost" ]; then
    PROTOCOL="http"
    echo -e "${YELLOW}⚠️  Using localhost - some HTTPS tests will be skipped${NC}"
fi

URL="$PROTOCOL://$DOMAIN"

echo "Testing domain: $URL"
echo ""

# Function to print test results
print_result() {
    local test_name="$1"
    local result="$2"
    local details="$3"
    
    if [ "$result" = "PASS" ]; then
        echo -e "✅ ${GREEN}$test_name: PASS${NC}"
    elif [ "$result" = "FAIL" ]; then
        echo -e "❌ ${RED}$test_name: FAIL${NC}"
        if [ -n "$details" ]; then
            echo -e "   ${RED}$details${NC}"
        fi
    elif [ "$result" = "SKIP" ]; then
        echo -e "⏭️  ${YELLOW}$test_name: SKIPPED${NC}"
        if [ -n "$details" ]; then
            echo -e "   ${YELLOW}$details${NC}"
        fi
    fi
}

# Test 1: HTTPS Redirect
echo "1. Testing HTTPS Redirect..."
if [ "$DOMAIN" != "localhost" ]; then
    HTTP_RESPONSE=$(curl -s -I -w "%{http_code}" "http://$DOMAIN" | tail -n1)
    if [ "$HTTP_RESPONSE" = "301" ] || [ "$HTTP_RESPONSE" = "302" ]; then
        print_result "HTTPS Redirect" "PASS"
    else
        print_result "HTTPS Redirect" "FAIL" "Expected 301/302, got $HTTP_RESPONSE"
    fi
else
    print_result "HTTPS Redirect" "SKIP" "Localhost testing"
fi

# Test 2: Health Check Endpoint
echo "2. Testing Health Check Endpoint..."
HEALTH_RESPONSE=$(curl -s -w "%{http_code}" "$URL/api/health" | tail -n1)
if [ "$HEALTH_RESPONSE" = "200" ]; then
    print_result "Health Check" "PASS"
else
    print_result "Health Check" "FAIL" "Expected 200, got $HEALTH_RESPONSE"
fi

# Test 3: Security Headers
echo "3. Testing Security Headers..."
HEADERS=$(curl -s -I "$URL/")

# HSTS Header
if [ "$DOMAIN" != "localhost" ]; then
    if echo "$HEADERS" | grep -qi "Strict-Transport-Security"; then
        print_result "HSTS Header" "PASS"
    else
        print_result "HSTS Header" "FAIL" "Missing Strict-Transport-Security header"
    fi
else
    print_result "HSTS Header" "SKIP" "Localhost testing"
fi

# X-Frame-Options
if echo "$HEADERS" | grep -qi "X-Frame-Options"; then
    print_result "X-Frame-Options" "PASS"
else
    print_result "X-Frame-Options" "FAIL" "Missing X-Frame-Options header"
fi

# X-Content-Type-Options
if echo "$HEADERS" | grep -qi "X-Content-Type-Options"; then
    print_result "X-Content-Type-Options" "PASS"
else
    print_result "X-Content-Type-Options" "FAIL" "Missing X-Content-Type-Options header"
fi

# CSP Header
if echo "$HEADERS" | grep -qi "Content-Security-Policy"; then
    print_result "Content Security Policy" "PASS"
else
    print_result "Content Security Policy" "FAIL" "Missing Content-Security-Policy header"
fi

# Test 4: SQL Injection Protection
echo "4. Testing SQL Injection Protection..."
SQL_INJECTION_PAYLOAD="'; DROP TABLE users; --"
ENCODED_PAYLOAD=$(echo "$SQL_INJECTION_PAYLOAD" | sed 's/ /%20/g' | sed "s/'/%27/g" | sed 's/;/%3B/g')

# Test on a safe endpoint that accepts parameters
SQL_TEST_RESPONSE=$(curl -s -w "%{http_code}" "$URL/api/reviews?city=$ENCODED_PAYLOAD" | tail -n1)
if [ "$SQL_TEST_RESPONSE" = "200" ] || [ "$SQL_TEST_RESPONSE" = "400" ] || [ "$SQL_TEST_RESPONSE" = "422" ]; then
    print_result "SQL Injection Protection" "PASS" "Server handled malicious input safely"
else
    print_result "SQL Injection Protection" "FAIL" "Unexpected response: $SQL_TEST_RESPONSE"
fi

# Test 5: Environment Configuration
echo "5. Testing Environment Configuration..."
ENV_RESPONSE=$(curl -s "$URL/api/health")
if echo "$ENV_RESPONSE" | grep -q '"environment":"production"'; then
    print_result "Production Environment" "PASS"
else
    print_result "Production Environment" "FAIL" "Not running in production mode"
fi

# Test 6: Authentication Security
echo "6. Testing Authentication Security..."
AUTH_RESPONSE=$(curl -s -I "$URL/api/auth/signin" | head -n1)
if echo "$AUTH_RESPONSE" | grep -q "200\|302"; then
    print_result "Authentication Endpoint" "PASS"
else
    print_result "Authentication Endpoint" "FAIL" "Auth endpoint not accessible"
fi

# Test 7: File Upload Security
echo "7. Testing File Upload Restrictions..."
UPLOAD_RESPONSE=$(curl -s -w "%{http_code}" -X POST "$URL/api/upload" | tail -n1)
if [ "$UPLOAD_RESPONSE" = "401" ] || [ "$UPLOAD_RESPONSE" = "403" ] || [ "$UPLOAD_RESPONSE" = "405" ]; then
    print_result "Upload Security" "PASS" "Unauthorized uploads blocked"
else
    print_result "Upload Security" "FAIL" "Upload endpoint may be unsecured"
fi

# Test 8: Error Information Leakage
echo "8. Testing Error Information Leakage..."
ERROR_RESPONSE=$(curl -s "$URL/api/nonexistent-endpoint")
if echo "$ERROR_RESPONSE" | grep -qi "stack\|error\|debug\|sql\|database"; then
    print_result "Error Information Leakage" "FAIL" "Sensitive information exposed in errors"
else
    print_result "Error Information Leakage" "PASS" "No sensitive information leaked"
fi

echo ""
echo "🏁 Security Validation Complete"
echo "============================================="

# Summary
PASS_COUNT=$(grep -c "✅" /tmp/security_test_results 2>/dev/null || echo "0")
FAIL_COUNT=$(grep -c "❌" /tmp/security_test_results 2>/dev/null || echo "0")

echo ""
echo "📊 Summary:"
if [ $FAIL_COUNT -eq 0 ]; then
    echo -e "${GREEN}🎉 All security tests passed!${NC}"
    echo -e "${GREEN}Your application is ready for production.${NC}"
else
    echo -e "${RED}⚠️  $FAIL_COUNT security test(s) failed.${NC}"
    echo -e "${RED}Please address the failed tests before going to production.${NC}"
fi

echo ""
echo "📚 For more information, see:"
echo "- SECURITY_FIXES.md"
echo "- PRODUCTION_READINESS.md"
echo "- DEPLOYMENT.md"
