# 🚀 How to Run CropEye Agentic AI Chatbot

## 📋 Prerequisites

Before you start, make sure you have:

1. **Node.js** (version 16 or higher)
   - Download from: https://nodejs.org/
   - Check version: `node --version`

2. **npm** (comes with Node.js)
   - Check version: `npm --version`

3. **Git** (to clone the repository)
   - Download from: https://git-scm.com/

## 🔽 Step 1: Download the Project

### Option A: Clone with Git
```bash
git clone <repository-url>
cd cropeye-agentic-chatbot
```

### Option B: Download ZIP
1. Download the project as ZIP file
2. Extract it to a folder
3. Open terminal/command prompt in that folder

## 📦 Step 2: Install Dependencies

### Install Backend Dependencies
```bash
# In the main project folder
npm install
```

### Install Frontend Dependencies
```bash
# Navigate to client folder and install
cd client
npm install
cd ..
```

## 🎯 Step 3: Run the Application

### Method 1: Automatic Start (Recommended)
```bash
# Make the script executable (Linux/Mac)
chmod +x start.sh

# Run the startup script
./start.sh
```

### Method 2: Manual Start
Open **two separate terminals**:

**Terminal 1 - Backend:**
```bash
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

### Method 3: Production Mode
```bash
# Build frontend first
cd client
npm run build
cd ..

# Start production server
npm start
```

## 🌐 Step 4: Access the Application

Once both servers are running:

- **Frontend (Main App)**: http://localhost:3000
- **Backend API**: http://localhost:5000/api
- **Health Check**: http://localhost:5000/api/health

## 🖥️ What You'll See

### Terminal Output
```
🌱 Starting CropEye Agentic AI Chatbot...
✨ This version works with built-in knowledge - no API keys needed!
📦 Installing backend dependencies...
📦 Installing frontend dependencies...
✅ Setup complete! No API keys required.

🚀 Starting development servers...

Starting backend server on port 5000...
Starting frontend server on port 3000...

🎉 CropEye Agentic AI Chatbot is running!

📱 Frontend: http://localhost:3000
🔧 Backend API: http://localhost:5000/api

🌟 Features available:
   • 5 major crops with complete growing guides
   • 8 Indian cities with weather simulation
   • Comprehensive pest and disease management
   • Soil analysis and fertilizer recommendations
   • Seasonal farming calendar and planning

💡 Try asking: 'How much water does rice need in Delhi?'

Press Ctrl+C to stop both servers
```

### Browser Interface
1. **Chat Interface**: Clean, modern chat layout
2. **Sidebar**: Location input, weather widget, quick action buttons
3. **Main Chat Area**: Conversation with the AI farming assistant

## 🧪 Step 5: Test the Chatbot

Try these example queries:

### Water Management
- "How much water does rice need?"
- "Irrigation schedule for tomatoes"
- "Water requirements for wheat in Delhi"

### Soil & Fertilizers
- "Best soil for potato cultivation"
- "NPK requirements for corn"
- "How to improve clay soil"

### Weather & Location
- "Weather in Mumbai for farming"
- "Seasonal advice for Bangalore"
- "When to plant crops in Delhi"

### Pest Control
- "How to control aphids naturally"
- "Organic pest control methods"
- "Disease prevention in rice"

## 🛑 How to Stop

### If using start.sh script:
Press `Ctrl+C` in the terminal

### If running manually:
Press `Ctrl+C` in both terminal windows

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. "node: command not found"
**Problem**: Node.js is not installed
**Solution**: Download and install Node.js from https://nodejs.org/

#### 2. "npm: command not found"
**Problem**: npm is not installed (usually comes with Node.js)
**Solution**: Reinstall Node.js

#### 3. "Permission denied: ./start.sh"
**Problem**: Script doesn't have execute permissions
**Solution**: 
```bash
chmod +x start.sh
```

#### 4. "Port 3000 is already in use"
**Problem**: Another application is using port 3000
**Solution**: 
- Kill the other application
- Or modify the port in client/package.json

#### 5. "Port 5000 is already in use"
**Problem**: Another application is using port 5000
**Solution**: 
- Kill the other application
- Or set PORT environment variable: `PORT=5001 npm run dev`

#### 6. Frontend shows "Cannot connect to server"
**Problem**: Backend server is not running
**Solution**: Make sure backend is running on port 5000

#### 7. "Module not found" errors
**Problem**: Dependencies not installed properly
**Solution**: 
```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install

# Do the same for client
cd client
rm -rf node_modules
npm install
cd ..
```

## 📱 Mobile Access

To access from mobile devices on the same network:

1. Find your computer's IP address:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig` or `ip addr`

2. Access from mobile browser:
   - `http://YOUR_IP_ADDRESS:3000`
   - Example: `http://192.168.1.100:3000`

## 🔄 Development Mode vs Production

### Development Mode (Recommended for testing)
- Hot reload for code changes
- Detailed error messages
- Separate frontend and backend servers
- Use: `npm run dev` + `npm run client`

### Production Mode
- Optimized build
- Single server serves both frontend and backend
- Better performance
- Use: `npm run build` then `npm start`

## 📊 Monitoring

### Check if servers are running:
```bash
# Check backend
curl http://localhost:5000/api/health

# Check frontend
curl http://localhost:3000
```

### View logs:
- Backend logs appear in Terminal 1
- Frontend logs appear in Terminal 2
- Browser console (F12) shows frontend errors

## 🎯 Next Steps

Once the application is running:

1. **Enter your location** in the sidebar (try: Delhi, Mumbai, Bangalore)
2. **Click quick action buttons** for common queries
3. **Type natural questions** about farming
4. **Explore different crops** and farming topics
5. **Check the weather widget** for location-based info

## 💡 Tips for Best Experience

1. **Use specific locations**: "Delhi", "Mumbai" work better than "North India"
2. **Mention crop names**: "rice", "wheat", "tomato", "potato", "corn"
3. **Ask specific questions**: "How much water does rice need?" vs "Tell me about rice"
4. **Try different topics**: water, soil, pests, diseases, fertilizers, weather
5. **Use the quick action buttons** for inspiration

## 🆘 Still Having Issues?

If you're still having problems:

1. **Check Node.js version**: `node --version` (should be 16+)
2. **Check npm version**: `npm --version`
3. **Try clearing npm cache**: `npm cache clean --force`
4. **Restart your terminal/command prompt**
5. **Try running as administrator** (Windows) or with `sudo` (Mac/Linux)

The application is designed to work out-of-the-box with no configuration needed!