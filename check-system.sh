#!/bin/bash

# System Check Script for CropEye AI Chatbot

echo "🔍 CropEye AI Chatbot - System Check"
echo "===================================="
echo ""

# Check Node.js
echo "📦 Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js found: $NODE_VERSION"
    
    # Check if version is 16 or higher
    NODE_MAJOR=$(echo $NODE_VERSION | cut -d'.' -f1 | sed 's/v//')
    if [ "$NODE_MAJOR" -ge 16 ]; then
        echo "✅ Node.js version is compatible (16+)"
    else
        echo "⚠️  Node.js version is too old. Please upgrade to v16 or higher"
        echo "   Download from: https://nodejs.org/"
    fi
else
    echo "❌ Node.js not found"
    echo "   Please install Node.js from: https://nodejs.org/"
    echo "   Choose the LTS version"
fi

echo ""

# Check npm
echo "📦 Checking npm..."
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "✅ npm found: v$NPM_VERSION"
else
    echo "❌ npm not found (usually comes with Node.js)"
    echo "   Please reinstall Node.js from: https://nodejs.org/"
fi

echo ""

# Check if we're in the right directory
echo "📁 Checking project structure..."
if [ -f "package.json" ]; then
    echo "✅ Found package.json"
else
    echo "❌ package.json not found"
    echo "   Make sure you're in the cropeye-agentic-chatbot directory"
fi

if [ -f "server.js" ]; then
    echo "✅ Found server.js"
else
    echo "❌ server.js not found"
    echo "   Make sure you're in the cropeye-agentic-chatbot directory"
fi

if [ -d "client" ]; then
    echo "✅ Found client directory"
else
    echo "❌ client directory not found"
    echo "   Make sure you have the complete project files"
fi

echo ""

# Check dependencies
echo "📦 Checking dependencies..."
if [ -d "node_modules" ]; then
    echo "✅ Backend dependencies installed"
else
    echo "⚠️  Backend dependencies not installed"
    echo "   Run: npm install"
fi

if [ -d "client/node_modules" ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "⚠️  Frontend dependencies not installed"
    echo "   Run: cd client && npm install && cd .."
fi

echo ""

# Check ports
echo "🔌 Checking ports..."
if command -v lsof &> /dev/null; then
    if lsof -i :3000 &> /dev/null; then
        echo "⚠️  Port 3000 is already in use"
        echo "   Stop other applications using port 3000"
    else
        echo "✅ Port 3000 is available"
    fi
    
    if lsof -i :5000 &> /dev/null; then
        echo "⚠️  Port 5000 is already in use"
        echo "   Stop other applications using port 5000"
    else
        echo "✅ Port 5000 is available"
    fi
else
    echo "ℹ️  Cannot check ports (lsof not available)"
fi

echo ""

# Check permissions
echo "🔐 Checking permissions..."
if [ -f "start.sh" ]; then
    if [ -x "start.sh" ]; then
        echo "✅ start.sh is executable"
    else
        echo "⚠️  start.sh is not executable"
        echo "   Run: chmod +x start.sh"
    fi
else
    echo "❌ start.sh not found"
fi

echo ""

# Summary
echo "📋 Summary & Next Steps:"
echo "========================"

# Count issues
ISSUES=0

if ! command -v node &> /dev/null; then
    echo "❌ Install Node.js from https://nodejs.org/"
    ISSUES=$((ISSUES + 1))
fi

if ! command -v npm &> /dev/null; then
    echo "❌ Install npm (comes with Node.js)"
    ISSUES=$((ISSUES + 1))
fi

if [ ! -f "package.json" ] || [ ! -f "server.js" ] || [ ! -d "client" ]; then
    echo "❌ Make sure you're in the correct project directory"
    ISSUES=$((ISSUES + 1))
fi

if [ ! -d "node_modules" ]; then
    echo "⚠️  Run: npm install"
    ISSUES=$((ISSUES + 1))
fi

if [ ! -d "client/node_modules" ]; then
    echo "⚠️  Run: cd client && npm install && cd .."
    ISSUES=$((ISSUES + 1))
fi

if [ -f "start.sh" ] && [ ! -x "start.sh" ]; then
    echo "⚠️  Run: chmod +x start.sh"
    ISSUES=$((ISSUES + 1))
fi

if [ $ISSUES -eq 0 ]; then
    echo "🎉 Everything looks good! You can run the application:"
    echo ""
    echo "   ./start.sh"
    echo ""
    echo "   Then open: http://localhost:3000"
else
    echo ""
    echo "🔧 Please fix the issues above, then run this check again:"
    echo "   ./check-system.sh"
fi

echo ""
echo "💡 Need help? Check HOW_TO_RUN.md or QUICK_START.md"