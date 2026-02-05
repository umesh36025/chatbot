#!/bin/bash

echo "🔧 Fixing styled-components keyframe error..."
echo "============================================="

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "client" ]; then
    echo "❌ Please run this script from the cropeye-agentic-chatbot directory"
    exit 1
fi

echo "📦 Reinstalling frontend dependencies to fix styled-components..."

# Navigate to client directory
cd client

# Remove node_modules and package-lock.json
echo "🗑️  Removing old dependencies..."
rm -rf node_modules
rm -f package-lock.json

# Clear npm cache
echo "🧹 Clearing npm cache..."
npm cache clean --force

# Reinstall dependencies
echo "📥 Installing fresh dependencies..."
npm install

# Go back to root
cd ..

echo ""
echo "✅ Fixed! The styled-components keyframe error should be resolved."
echo ""
echo "🚀 Now restart the application:"
echo "   1. Stop the current servers (Ctrl+C)"
echo "   2. Run: ./start.sh"
echo "   3. Or manually: npm run dev (Terminal 1) + cd client && npm start (Terminal 2)"
echo ""
echo "🌐 Then open: http://localhost:3000"