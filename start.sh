#!/bin/bash

# CropEye Agentic AI Chatbot Startup Script with Live Weather Data

echo "🌱 Starting CropEye Agentic AI Chatbot..."
echo "✨ Now with live weather data support!"

# Check if .env file exists
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from template..."
    cp .env.example .env
    echo ""
    echo "📝 IMPORTANT: For live weather data, you need a free API key:"
    echo "   1. Visit: https://openweathermap.org/api"
    echo "   2. Sign up for free account"
    echo "   3. Copy your API key"
    echo "   4. Edit .env file and add your key"
    echo "   5. See WEATHER_API_SETUP.md for detailed instructions"
    echo ""
    echo "   The app will work with simulated weather data without the API key."
    echo ""
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing backend dependencies..."
    npm install
fi

# Check if client node_modules exists
if [ ! -d "client/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd client
    npm install
    cd ..
fi

# Check for weather API key
if [ -f .env ]; then
    source .env
    if [ -n "$WEATHER_API_KEY" ] && [ "$WEATHER_API_KEY" != "your_openweathermap_api_key_here" ]; then
        echo "✅ Weather API key configured - live weather data enabled!"
    else
        echo "ℹ️  Weather API key not configured - using simulated weather data"
        echo "   For live weather: see WEATHER_API_SETUP.md"
    fi
fi

echo "✅ Setup complete!"
echo ""
echo "🚀 Starting development servers..."
echo ""

# Start backend server in background
echo "Starting backend server on port ${PORT:-5000}..."
npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend server
echo "Starting frontend server on port 3000..."
cd client
npm start &
FRONTEND_PID=$!

echo ""
echo "🎉 CropEye Agentic AI Chatbot is running!"
echo ""
echo "📱 Frontend: http://localhost:3000"
echo "🔧 Backend API: http://localhost:${PORT:-5000}/api"
echo ""
echo "🌟 Features available:"
echo "   • 5 major crops with complete growing guides"
echo "   • Live weather data for any city worldwide"
echo "   • Comprehensive pest and disease management"
echo "   • Soil analysis and fertilizer recommendations"
echo "   • Seasonal farming calendar and planning"
echo ""
echo "💡 Try asking: 'Current weather in London for farming'"
echo "🌤️  Enter any city name to see live weather data"
echo ""
echo "Press Ctrl+C to stop both servers"

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