# 🌤️ Live Weather Data Setup Guide

## 🎯 Overview
The CropEye AI Chatbot now supports **live weather data** from OpenWeatherMap API. This provides real-time weather information for accurate farming advice.

---

## 🔑 Getting Your Free Weather API Key

### Step 1: Sign Up for OpenWeatherMap
1. Go to: **https://openweathermap.org/api**
2. Click **"Sign Up"** (top right corner)
3. Fill in your details:
   - Username
   - Email address
   - Password
   - Purpose: "Education" or "Personal"
4. Click **"Create Account"**

### Step 2: Verify Your Email
1. Check your email inbox
2. Click the verification link from OpenWeatherMap
3. Your account will be activated

### Step 3: Get Your API Key
1. Log in to your OpenWeatherMap account
2. Go to: **https://home.openweathermap.org/api_keys**
3. You'll see a default API key already created
4. Copy the API key (it looks like: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`)

### Step 4: Add API Key to Your Project
1. In your project folder, copy the environment file:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` file in a text editor
3. Replace `your_openweathermap_api_key_here` with your actual API key:
   ```env
   WEATHER_API_KEY=a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
   ```

4. Save the file

---

## 🚀 Testing Live Weather Data

### Start the Application:
```bash
# Install axios dependency first
npm install

# Start the application
./start.sh
```

### Test Weather API:
1. Open browser: http://localhost:3000
2. Enter a location (e.g., "New York", "London", "Mumbai")
3. You should see:
   - 🔴 **Live Data** indicator
   - Real temperature, humidity, wind speed
   - Current weather description
   - Sunrise/sunset times
   - Atmospheric pressure

### Verify API is Working:
```bash
# Test the weather endpoint directly
curl "http://localhost:5000/api/weather?location=London"
```

You should get real weather data like:
```json
{
  "temperature": 15,
  "humidity": 78,
  "windSpeed": 12,
  "description": "light rain",
  "source": "live",
  "location": "London",
  "country": "GB"
}
```

---

## 🌍 Supported Locations

The weather API supports:
- **City names**: "London", "New York", "Mumbai", "Tokyo"
- **City, Country**: "London,UK", "New York,US"
- **Coordinates**: "lat=40.7128&lon=-74.0060"
- **ZIP codes**: "10001,US", "SW1A 1AA,UK"

### Examples of Valid Locations:
- Mumbai
- New Delhi, IN
- London, UK
- New York, US
- Tokyo, JP
- Sydney, AU
- Toronto, CA
- Berlin, DE

---

## 🔧 Troubleshooting

### Issue 1: "Weather API key not configured"
**Solution**: Make sure you have:
1. Created `.env` file (not `.env.example`)
2. Added your API key: `WEATHER_API_KEY=your_actual_key`
3. Restarted the server

### Issue 2: "Invalid API key"
**Possible causes**:
- API key is incorrect
- API key hasn't activated yet (can take 10-60 minutes)
- Extra spaces in the API key

**Solution**:
1. Double-check your API key
2. Wait 1 hour after creating account
3. Regenerate API key if needed

### Issue 3: "City not found"
**Solution**:
- Try different location formats
- Use country codes: "Mumbai,IN" instead of just "Mumbai"
- Check spelling of city names

### Issue 4: Shows simulated data instead of live
**Possible causes**:
- API key not configured
- API rate limit exceeded (60 calls/minute for free)
- Network connectivity issues

**Solution**:
1. Check `.env` file has correct API key
2. Wait a minute if you made many requests
3. Check internet connection

---

## 📊 API Limits (Free Plan)

OpenWeatherMap free plan includes:
- **60 calls/minute**
- **1,000,000 calls/month**
- **Current weather data**
- **5-day forecast** (not used in this app yet)

This is more than enough for personal use and testing!

---

## 🌟 Benefits of Live Weather Data

### For Farmers:
- **Real-time conditions** for immediate decisions
- **Accurate temperature** for irrigation planning
- **Humidity levels** for disease prevention
- **Wind speed** for spraying decisions
- **Pressure trends** for weather prediction

### For the Chatbot:
- **Precise recommendations** based on current conditions
- **Location-specific advice** for any city worldwide
- **Dynamic responses** that change with weather
- **Professional credibility** with real data

---

## 🔄 Fallback System

The app is designed to work even without the API key:

1. **With API key**: Shows live weather data with 🔴 Live Data indicator
2. **Without API key**: Shows simulated data with 📊 Simulated Data indicator
3. **API error**: Automatically falls back to simulated data

This ensures the chatbot always works, regardless of API availability!

---

## 🎯 Next Steps

Once you have live weather data working:

1. **Test different cities** to see global weather
2. **Ask weather-specific questions** like:
   - "Current weather in London for farming"
   - "Should I irrigate today in Mumbai?"
   - "Weather conditions for planting in New York"

3. **Explore farming advice** that adapts to real conditions:
   - High temperature warnings
   - Humidity-based disease alerts
   - Wind speed considerations for spraying
   - Rainfall impact on field operations

---

## 💡 Pro Tips

1. **Use specific city names** for better accuracy
2. **Include country codes** for cities with common names
3. **Check the data source indicator** (🔴 Live vs 📊 Simulated)
4. **Weather updates every few minutes** - refresh for latest data
5. **API key is free forever** for reasonable usage

---

**🎉 Congratulations! You now have live weather data powering your farming AI assistant!**