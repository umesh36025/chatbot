#!/bin/bash

echo "🔍 CropEye AI Chatbot - Connection Debug"
echo "======================================"
echo ""

# Check if we're in the right directory
if [ ! -f "server.js" ]; then
    echo "❌ server.js not found. Make sure you're in the cropeye-agentic-chatbot directory"
    exit 1
fi

echo "📁 Project directory: ✅ Correct"
echo ""

# Check Node.js
echo "🔧 Checking Node.js..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js: $NODE_VERSION"
else
    echo "❌ Node.js not found - please install from https://nodejs.org/"
    exit 1
fi

# Check npm
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "✅ npm: v$NPM_VERSION"
else
    echo "❌ npm not found"
    exit 1
fi

echo ""

# Check dependencies
echo "📦 Checking dependencies..."
if [ -d "node_modules" ]; then
    echo "✅ Backend dependencies installed"
else
    echo "❌ Backend dependencies missing"
    echo "   Run: npm install"
    exit 1
fi

if [ -d "client/node_modules" ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "❌ Frontend dependencies missing"
    echo "   Run: cd client && npm install && cd .."
    exit 1
fi

echo ""

# Check ports
echo "🔌 Checking ports..."
if command -v lsof &> /dev/null; then
    BACKEND_PORT=$(lsof -ti:5000)
    FRONTEND_PORT=$(lsof -ti:3000)
    
    if [ -n "$BACKEND_PORT" ]; then
        echo "✅ Port 5000 in use (PID: $BACKEND_PORT)"
    else
        echo "❌ Port 5000 not in use - backend not running"
    fi
    
    if [ -n "$FRONTEND_PORT" ]; then
        echo "✅ Port 3000 in use (PID: $FRONTEND_PORT)"
    else
        echo "❌ Port 3000 not in use - frontend not running"
    fi
else
    echo "ℹ️  Cannot check ports (lsof not available)"
fi

echo ""

# Test backend connection
echo "🌐 Testing backend connection..."
if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
    echo "✅ Backend server responding"
    echo "   Response:"
    curl -s http://localhost:5000/api/health | head -3
else
    echo "❌ Backend server not responding"
    echo "   Backend server is not running or not accessible"
fi

echo ""

# Test frontend connection
echo "🖥️  Testing frontend connection..."
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Frontend server responding"
else
    echo "❌ Frontend server not responding"
fi

echo ""

# Check for common issues
echo "🔍 Common Issues Check:"

# Check if axios is installed
if [ -f "node_modules/axios/package.json" ]; then
    echo "✅ axios dependency installed"
else
    echo "❌ axios dependency missing"
    echo "   Run: npm install axios"
fi

# Check server.js syntax
echo "🔧 Checking server.js syntax..."
if node -c server.js 2>/dev/null; then
    echo "✅ server.js syntax is valid"
else
    echo "❌ server.js has syntax errors:"
    node -c server.js
fi

echo ""
echo "📋 DIAGNOSIS SUMMARY:"
echo "===================="

# Count issues
ISSUES=0

if [ ! -d "node_modules" ]; then
    echo "❌ Run: npm install"
    ISSUES=$((ISSUES + 1))
fi

if [ ! -d "client/node_modules" ]; then
    echo "❌ Run: cd client && npm install && cd .."
    ISSUES=$((ISSUES + 1))
fi

if ! curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
    echo "❌ Backend server not running"
    echo "   Start with: npm run dev"
    ISSUES=$((ISSUES + 1))
fi

if ! curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "❌ Frontend server not running"
    echo "   Start with: cd client && npm start"
    ISSUES=$((ISSUES + 1))
fi

if [ $ISSUES -eq 0 ]; then
    echo "🎉 Everything looks good!"
    echo "   If you're still having issues, try:"
    echo "   1. Refresh your browser"
    echo "   2. Check browser console (F12)"
    echo "   3. Clear browser cache"
else
    echo ""
    echo "🔧 QUICK FIX:"
    echo "============"
    echo "1. Stop all servers (Ctrl+C)"
    echo "2. Run: npm install"
    echo "3. Run: cd client && npm install && cd .."
    echo "4. Run: ./start.sh"
    echo ""
    echo "If that doesn't work:"
    echo "5. Run: ./fix-connection.sh"
fi