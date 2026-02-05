# 📖 Complete Installation Guide - CropEye AI Chatbot

## 🎯 Overview
This guide will help you install and run the CropEye Agentic AI Chatbot on your computer. The chatbot works completely offline with built-in farming knowledge - no API keys required!

---

## 🖥️ System Requirements

### Minimum Requirements:
- **Operating System**: Windows 10+, macOS 10.14+, or Linux
- **RAM**: 4GB minimum, 8GB recommended
- **Storage**: 500MB free space
- **Internet**: Required only for initial download and setup

### Software Requirements:
- **Node.js** version 16 or higher
- **npm** (comes with Node.js)
- **Git** (optional, for cloning)

---

## 📥 Step 1: Install Node.js

### Windows:
1. Go to https://nodejs.org/
2. Click "Download for Windows" (LTS version)
3. Run the downloaded `.msi` file
4. Follow the installation wizard (keep default settings)
5. Restart your computer

### macOS:
1. Go to https://nodejs.org/
2. Click "Download for macOS" (LTS version)
3. Run the downloaded `.pkg` file
4. Follow the installation wizard
5. Open Terminal to verify

### Linux (Ubuntu/Debian):
```bash
# Update package index
sudo apt update

# Install Node.js and npm
sudo apt install nodejs npm

# Verify installation
node --version
npm --version
```

### Verify Installation:
Open terminal/command prompt and run:
```bash
node --version
npm --version
```
You should see version numbers like:
```
v18.17.0
9.6.7
```

---

## 📁 Step 2: Download the Project

### Option A: Using Git (Recommended)
```bash
# Clone the repository
git clone <repository-url>

# Navigate to project folder
cd cropeye-agentic-chatbot
```

### Option B: Download ZIP
1. Download the project ZIP file
2. Extract it to a folder (e.g., `C:\cropeye-chatbot` or `~/cropeye-chatbot`)
3. Open terminal/command prompt
4. Navigate to the folder:
   ```bash
   cd path/to/cropeye-agentic-chatbot
   ```

---

## 🔧 Step 3: Install Dependencies

### Run System Check (Optional but Recommended):
```bash
# Make script executable (Mac/Linux)
chmod +x check-system.sh

# Run system check
./check-system.sh
```

### Install Backend Dependencies:
```bash
# In the main project folder
npm install
```

### Install Frontend Dependencies:
```bash
# Navigate to client folder
cd client

# Install frontend dependencies
npm install

# Go back to main folder
cd ..
```

---

## 🚀 Step 4: Run the Application

### Method 1: Automatic Start (Easiest)
```bash
# Make script executable (Mac/Linux only)
chmod +x start.sh

# Start the application
./start.sh
```

### Method 2: Manual Start
**Open TWO separate terminals/command prompts:**

**Terminal 1 (Backend):**
```bash
# In main project folder
npm run dev
```

**Terminal 2 (Frontend):**
```bash
# In main project folder
cd client
npm start
```

### Method 3: Windows Batch File
Create a file called `start.bat` with:
```batch
@echo off
echo Starting CropEye AI Chatbot...
start cmd /k "npm run dev"
timeout /t 3
start cmd /k "cd client && npm start"
echo Both servers are starting...
pause
```

---

## 🌐 Step 5: Access the Application

### Open Your Browser:
1. Wait for both servers to start (you'll see messages in terminal)
2. Open your web browser
3. Go to: **http://localhost:3000**

### You Should See:
- A beautiful chat interface
- Sidebar with location input and weather widget
- Quick action buttons for common farming questions
- Welcome message from the AI assistant

---

## 🧪 Step 6: Test the Chatbot

### Try These Example Queries:

#### Basic Questions:
- "How much water does rice need?"
- "Best soil for tomatoes"
- "When to plant wheat?"

#### Location-Specific:
- "Weather in Delhi for farming"
- "Crop advice for Mumbai"
- "Seasonal planning for Bangalore"

#### Advanced Topics:
- "How to control aphids naturally"
- "NPK requirements for corn"
- "Organic farming practices"

### Expected Response:
The chatbot should provide detailed, helpful farming advice with:
- Specific recommendations
- Location-based insights (if you enter a location)
- Practical tips and best practices
- Additional data when relevant

---

## 🛑 How to Stop the Application

### If using start.sh:
- Press `Ctrl+C` in the terminal

### If running manually:
- Press `Ctrl+C` in both terminal windows

### Force stop (if needed):
```bash
# Kill processes using ports
npx kill-port 3000
npx kill-port 5000
```

---

## 🔧 Troubleshooting Common Issues

### Issue 1: "node: command not found"
**Cause**: Node.js not installed or not in PATH
**Solution**: 
1. Install Node.js from https://nodejs.org/
2. Restart terminal/computer
3. Verify with `node --version`

### Issue 2: "npm: command not found"
**Cause**: npm not installed (should come with Node.js)
**Solution**: Reinstall Node.js

### Issue 3: "Permission denied: ./start.sh"
**Cause**: Script not executable (Mac/Linux)
**Solution**: 
```bash
chmod +x start.sh
chmod +x check-system.sh
```

### Issue 4: "Port 3000 is already in use"
**Cause**: Another application using port 3000
**Solution**: 
```bash
# Find and kill process
npx kill-port 3000

# Or change port
PORT=3001 npm start
```

### Issue 5: "Cannot connect to server"
**Cause**: Backend not running
**Solution**: Make sure backend is running on port 5000

### Issue 6: "Module not found" errors
**Cause**: Dependencies not installed properly
**Solution**: 
```bash
# Delete and reinstall
rm -rf node_modules
npm install

# Same for client
cd client
rm -rf node_modules
npm install
cd ..
```

### Issue 7: Blank page in browser
**Cause**: Frontend build issues
**Solution**: 
```bash
cd client
npm run build
cd ..
npm start
```

---

## 📱 Mobile and Network Access

### Access from Mobile Devices:
1. Find your computer's IP address:
   - **Windows**: `ipconfig`
   - **Mac**: `ifconfig en0`
   - **Linux**: `ip addr show`

2. On mobile browser, go to:
   `http://YOUR_IP_ADDRESS:3000`
   
   Example: `http://192.168.1.100:3000`

### Network Troubleshooting:
- Make sure devices are on same WiFi network
- Check firewall settings
- Try disabling antivirus temporarily

---

## 🔄 Development vs Production

### Development Mode (Default):
- **Use for**: Testing, development, learning
- **Features**: Hot reload, detailed errors, separate servers
- **Command**: `npm run dev` + `npm run client`

### Production Mode:
- **Use for**: Deployment, better performance
- **Features**: Optimized build, single server
- **Commands**: 
  ```bash
  cd client && npm run build && cd ..
  npm start
  ```

---

## 📊 Monitoring and Logs

### Check Server Status:
```bash
# Backend health check
curl http://localhost:5000/api/health

# Or open in browser
http://localhost:5000/api/health
```

### View Logs:
- **Backend logs**: Appear in Terminal 1
- **Frontend logs**: Appear in Terminal 2
- **Browser logs**: Press F12 → Console tab

### Common Log Messages:
```
✅ Good:
- "Server running on port 5000"
- "Compiled successfully"
- "webpack compiled"

❌ Problems:
- "EADDRINUSE" (port in use)
- "Module not found" (missing dependencies)
- "Cannot GET /" (server not running)
```

---

## 🎯 Performance Tips

### For Better Performance:
1. **Close unnecessary applications**
2. **Use production mode** for deployment
3. **Clear browser cache** if issues occur
4. **Restart servers** periodically during development

### System Resources:
- **RAM Usage**: ~200-500MB
- **CPU Usage**: Low (mostly idle)
- **Network**: Only for initial download

---

## 🆘 Getting Help

### Self-Diagnosis:
1. Run `./check-system.sh` for automated checks
2. Check `HOW_TO_RUN.md` for quick reference
3. Review `QUICK_START.md` for simplified steps

### Common Solutions:
1. **Restart everything**: Close terminals, restart application
2. **Clear cache**: `npm cache clean --force`
3. **Reinstall dependencies**: Delete `node_modules`, run `npm install`
4. **Update Node.js**: Download latest LTS from nodejs.org
5. **Check permissions**: Ensure you can read/write in project folder

### Still Having Issues?
- Check that you're in the correct directory
- Verify all files are present (package.json, server.js, client folder)
- Try running as administrator (Windows) or with sudo (Mac/Linux)
- Disable antivirus/firewall temporarily
- Try a different port: `PORT=5001 npm run dev`

---

## 🎉 Success Indicators

### You'll Know It's Working When:
1. **Terminal shows**: "Server running on port 5000" and "Compiled successfully"
2. **Browser loads**: Chat interface at http://localhost:3000
3. **Chatbot responds**: Try "Hello" - should get farming-related welcome message
4. **Weather widget**: Shows data when you enter a location
5. **Quick actions**: Buttons work and generate responses

### Congratulations! 🎊
You now have a fully functional AI farming assistant running on your computer!

---

**💡 Pro Tip**: Bookmark http://localhost:3000 for easy access, and keep the terminal windows open while using the chatbot.