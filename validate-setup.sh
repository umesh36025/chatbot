#!/bin/bash

# CropEye AI Chatbot - Setup Validation Script
# This script checks if all components are properly configured

echo "🔍 CropEye AI Chatbot - Setup Validation"
echo "=========================================="
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Counters
PASSED=0
FAILED=0
WARNINGS=0

# Function to check file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1 exists"
        ((PASSED++))
        return 0
    else
        echo -e "${RED}✗${NC} $1 missing"
        ((FAILED++))
        return 1
    fi
}

# Function to check directory exists
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✓${NC} $1 directory exists"
        ((PASSED++))
        return 0
    else
        echo -e "${RED}✗${NC} $1 directory missing"
        ((FAILED++))
        return 1
    fi
}

# Function to check command exists
check_command() {
    if command -v "$1" &> /dev/null; then
        echo -e "${GREEN}✓${NC} $1 is installed"
        ((PASSED++))
        return 0
    else
        echo -e "${YELLOW}⚠${NC} $1 is not installed (optional)"
        ((WARNINGS++))
        return 1
    fi
}

# Function to check port availability
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null 2>&1; then
        echo -e "${YELLOW}⚠${NC} Port $1 is in use"
        ((WARNINGS++))
        return 1
    else
        echo -e "${GREEN}✓${NC} Port $1 is available"
        ((PASSED++))
        return 0
    fi
}

echo "📦 Checking Core Files..."
echo "-------------------------"
check_file "package.json"
check_file "server.js"
check_file "requirements.txt"
check_file ".env.example"
echo ""

echo "📁 Checking Directories..."
echo "-------------------------"
check_dir "client"
check_dir "client/src"
check_dir "client/src/components"
check_dir "utils"
check_dir "prometheus"
check_dir "grafana"
echo ""

echo "🐳 Checking Docker Files..."
echo "-------------------------"
check_file "Dockerfile"
check_file "Dockerfile.dev"
check_file "Dockerfile.simple"
check_file "docker-compose.yml"
check_file ".dockerignore"
check_file "nginx.conf"
echo ""

echo "📊 Checking Monitoring Files..."
echo "-------------------------"
check_file "prometheus/prometheus.yml"
check_file "prometheus/Dockerfile"
check_file "grafana/Dockerfile"
check_file "python-monitoring-example.py"
echo ""

echo "📚 Checking Documentation..."
echo "-------------------------"
check_file "README.md"
check_file "INSTALLATION_GUIDE.md"
check_file "HOW_TO_RUN.md"
check_file "DOCKER_GUIDE.md"
check_file "RAILWAY_DEPLOYMENT.md"
check_file "MONITORING_SETUP_COMPLETE.md"
check_file "FINAL_SETUP_SUMMARY.md"
check_file "QUICK_COMMANDS.md"
check_file "STATUS.md"
echo ""

echo "🔧 Checking Helper Scripts..."
echo "-------------------------"
check_file "start.sh"
check_file "stop-servers.sh"
check_file "docker-run.sh"
check_file "setup-weather-api.sh"
check_file "fix-connection.sh"
echo ""

echo "⚙️ Checking System Requirements..."
echo "-------------------------"
check_command "node"
check_command "npm"
check_command "docker"
check_command "docker-compose"
check_command "python3"
check_command "pip"
echo ""

echo "🔌 Checking Port Availability..."
echo "-------------------------"
check_port 3000
check_port 5000
check_port 8000
check_port 9090
check_port 3001
echo ""

echo "📦 Checking Node.js Dependencies..."
echo "-------------------------"
if [ -d "node_modules" ]; then
    echo -e "${GREEN}✓${NC} Root node_modules exists"
    ((PASSED++))
    
    # Check for key dependencies
    if [ -d "node_modules/express" ]; then
        echo -e "${GREEN}✓${NC} express installed"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} express not installed"
        ((FAILED++))
    fi
    
    if [ -d "node_modules/prom-client" ]; then
        echo -e "${GREEN}✓${NC} prom-client installed"
        ((PASSED++))
    else
        echo -e "${RED}✗${NC} prom-client not installed"
        ((FAILED++))
    fi
else
    echo -e "${RED}✗${NC} Root node_modules missing - run 'npm install'"
    ((FAILED++))
fi

if [ -d "client/node_modules" ]; then
    echo -e "${GREEN}✓${NC} Client node_modules exists"
    ((PASSED++))
else
    echo -e "${RED}✗${NC} Client node_modules missing - run 'cd client && npm install'"
    ((FAILED++))
fi
echo ""

echo "🔍 Checking Configuration..."
echo "-------------------------"
if [ -f ".env" ]; then
    echo -e "${GREEN}✓${NC} .env file exists"
    ((PASSED++))
    
    if grep -q "OPENWEATHER_API_KEY" .env; then
        if grep -q "OPENWEATHER_API_KEY=your_api_key_here" .env; then
            echo -e "${YELLOW}⚠${NC} Weather API key not configured (using simulated data)"
            ((WARNINGS++))
        else
            echo -e "${GREEN}✓${NC} Weather API key configured"
            ((PASSED++))
        fi
    fi
else
    echo -e "${YELLOW}⚠${NC} .env file not found (using defaults)"
    ((WARNINGS++))
fi
echo ""

echo "=========================================="
echo "📊 Validation Summary"
echo "=========================================="
echo -e "${GREEN}Passed:${NC} $PASSED"
echo -e "${RED}Failed:${NC} $FAILED"
echo -e "${YELLOW}Warnings:${NC} $WARNINGS"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All critical checks passed!${NC}"
    echo ""
    echo "✅ Your CropEye AI Chatbot is ready to run!"
    echo ""
    echo "Quick start commands:"
    echo "  ./start.sh              - Start local development"
    echo "  ./docker-run.sh prod    - Start with Docker"
    echo "  docker-compose up -d    - Start full stack"
    echo ""
    exit 0
else
    echo -e "${RED}❌ Some critical checks failed!${NC}"
    echo ""
    echo "Please fix the issues above before running the application."
    echo ""
    echo "Common fixes:"
    echo "  npm install                    - Install root dependencies"
    echo "  cd client && npm install       - Install client dependencies"
    echo "  cp .env.example .env           - Create environment file"
    echo "  ./setup-weather-api.sh         - Configure weather API"
    echo ""
    exit 1
fi
