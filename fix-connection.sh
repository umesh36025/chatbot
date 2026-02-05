#!/bin/bash

echo "🔧 CropEye AI Chatbot - Connection Fix"
echo "====================================="
echo ""

# Stop any existing processes
echo "🛑 Stopping existing processes..."
if command -v lsof &> /dev/null; then
    # Kill processes on ports 3000 and 5000
    lsof -ti:3000 | xargs kill -9 2>/dev/null || true
    lsof -ti:5000 | xargs kill -9 2>/dev/null || true
    echo "✅ Stopped processes on ports 3000 and 5000"
else
    echo "ℹ️  Cannot check ports, continuing..."
fi

# Wait a moment
sleep 2

echo ""
echo "🧹 Cleaning up dependencies..."

# Clean backend
if [ -d "node_modules" ]; then
    echo "🗑️  Removing backend node_modules..."
    rm -rf node_modules
fi

if [ -f "package-lock.json" ]; then
    rm -f package-lock.json
fi

# Clean frontend
if [ -d "client/node_modules" ]; then
    echo "🗑️  Removing frontend node_modules..."
    rm -rf client/node_modules
fi

if [ -f "client/package-lock.json" ]; then
    rm -f client/package-lock.json
fi

# Clear npm cache
echo "🧽 Clearing npm cache..."
npm cache clean --force

echo ""
echo "📦 Reinstalling dependencies..."

# Install backend dependencies
echo "⬇️  Installing backend dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Backend dependency installation failed"
    exit 1
fi

# Install frontend dependencies
echo "⬇️  Installing frontend dependencies..."
cd client
npm install

if [ $? -ne 0 ]; then
    echo "❌ Frontend dependency installation failed"
    exit 1
fi

cd ..

echo ""
echo "✅ Dependencies reinstalled successfully!"
echo ""

# Create .env if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    cp .env.example .env
    echo "✅ Created .env file"
fi

echo "🚀 Starting servers..."
echo ""

# Start backend in background
echo "Starting backend server..."
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
echo "⏳ Waiting for backend to start..."
sleep 5

# Check if backend is running
if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
    echo "✅ Backend server is running!"
else
    echo "❌ Backend server failed to start"
    echo "   Check the terminal output above for errors"
    kill $BACKEND_PID 2>/dev/null
    exit 1
fi

# Start frontend in background
echo "Starting frontend server..."
cd client
npm start &
FRONTEND_PID=$!
cd ..

# Wait for frontend to start
echo "⏳ Waiting for frontend to start..."
sleep 10

# Check if frontend is running
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Frontend server is running!"
else
    echo "⏳ Frontend still starting... (this can take a minute)"
fi

echo ""
echo "🎉 Connection fix complete!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend: http://localhost:5000/api/health"
echo ""
echo "💡 Test the connection:"
echo "   1. Open http://localhost:3000 in your browser"
echo "   2. Enter a location (e.g., 'London')"
echo "   3. Ask: 'How much water does rice need?'"
echo ""
echo "🛑 To stop servers: Press Ctrl+C"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Set trap to cleanup on script exit
trap cleanup SIGINT SIGTERM

# Wait for user to stop
wait