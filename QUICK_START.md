# ⚡ Quick Start Guide - CropEye AI Chatbot

## 🎯 Super Simple 3-Step Setup

### Step 1: Install Node.js
```
Download from: https://nodejs.org/
Choose: LTS version (recommended)
```

### Step 2: Download & Setup
```bash
# Download the project (or extract ZIP)
git clone <repository-url>
cd cropeye-agentic-chatbot

# Install everything
npm install
cd client && npm install && cd ..
```

### Step 3: Run It!
```bash
# One command to start everything
./start.sh

# Or manually (2 terminals):
# Terminal 1: npm run dev
# Terminal 2: cd client && npm start
```

## 🌐 Open Your Browser
```
Go to: http://localhost:3000
```

## 🎉 You're Done!

### Try These Questions:
- "How much water does rice need?"
- "Best soil for tomatoes"
- "Weather in Delhi for farming"
- "How to control pests naturally"

---

## 🚨 If Something Goes Wrong

### Problem: "node: command not found"
**Fix**: Install Node.js from https://nodejs.org/

### Problem: "Permission denied"
**Fix**: `chmod +x start.sh`

### Problem: "Port already in use"
**Fix**: Close other applications or restart computer

### Problem: Can't connect to server
**Fix**: Make sure both terminals are running

---

## 📱 What You'll See

```
┌─────────────────────────────────────────┐
│  🌱 CropEye AI Assistant                │
├─────────────────┬───────────────────────┤
│ 📍 Location     │ 💬 Chat Messages      │
│ 🌤️ Weather      │                       │
│ 🔘 Quick Actions│ User: How much water  │
│   • Water needs │       does rice need? │
│   • Soil info   │                       │
│   • Weather     │ 🤖 Bot: Here's        │
│   • Crop advice │       comprehensive   │
│                 │       water advice... │
└─────────────────┴───────────────────────┘
```

## 🎯 Pro Tips

1. **Enter location first**: Delhi, Mumbai, Bangalore, etc.
2. **Use crop names**: rice, wheat, tomato, potato, corn
3. **Click quick buttons** for instant answers
4. **Ask specific questions** for better responses

## 🔄 To Stop the App
Press `Ctrl+C` in the terminal

---

**That's it! No API keys, no configuration, just install and run! 🚀**