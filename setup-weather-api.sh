#!/bin/bash

echo "🌤️ Weather API Setup - CropEye AI Chatbot"
echo "=========================================="
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📝 Creating .env file from template..."
    cp .env.example .env
fi

echo "🔑 To get live weather data, you need a free API key from OpenWeatherMap:"
echo ""
echo "1. Visit: https://openweathermap.org/api"
echo "2. Click 'Sign Up' (it's free!)"
echo "3. Verify your email"
echo "4. Go to: https://home.openweathermap.org/api_keys"
echo "5. Copy your API key"
echo ""

read -p "Do you have an OpenWeatherMap API key? (y/n): " has_key

if [ "$has_key" = "y" ] || [ "$has_key" = "Y" ]; then
    echo ""
    read -p "Enter your OpenWeatherMap API key: " api_key
    
    if [ -n "$api_key" ]; then
        # Update .env file
        if grep -q "WEATHER_API_KEY=" .env; then
            # Replace existing key
            sed -i "s/WEATHER_API_KEY=.*/WEATHER_API_KEY=$api_key/" .env
        else
            # Add new key
            echo "WEATHER_API_KEY=$api_key" >> .env
        fi
        
        echo ""
        echo "✅ Weather API key saved to .env file!"
        echo "🔄 Please restart the application to use live weather data:"
        echo "   1. Stop current servers (Ctrl+C)"
        echo "   2. Run: ./start.sh"
        echo ""
        echo "🌍 You can now get live weather for any city worldwide!"
    else
        echo "❌ No API key entered. Using simulated weather data."
    fi
else
    echo ""
    echo "ℹ️  No problem! The chatbot works great with simulated weather data."
    echo "   You can add the API key later by editing the .env file."
    echo ""
    echo "📊 Current setup: Using simulated weather data"
fi

echo ""
echo "🚀 Your weather setup is complete!"