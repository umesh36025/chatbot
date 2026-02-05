#!/bin/bash
echo "🚀 INSTANT FIX - Starting servers now..."

# Kill any existing processes
pkill -f "node.*server.js" 2>/dev/null || true
pkill -f "npm.*dev" 2>/dev/null || true

# Start backend immediately
echo "Starting backend..."
npm run dev &

# Wait 3 seconds
sleep 3

echo "✅ Backend should be running on port 5000"
echo "🌐 Test: http://localhost:5000/api/health"
echo ""
echo "Now start frontend in another terminal:"
echo "cd client && npm start"