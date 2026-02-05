#!/bin/bash
echo "🛑 Stopping CropEye AI Chatbot servers..."

# Stop the background processes
pkill -f "nodemon server.js" 2>/dev/null || true
pkill -f "npm start" 2>/dev/null || true
pkill -f "react-scripts start" 2>/dev/null || true

echo "✅ Servers stopped"
echo "To restart: ./start.sh"