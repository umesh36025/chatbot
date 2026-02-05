# 🚀 QUICK FIX - Backend Connection Error

## The Problem
Error: "Sorry, I encountered an error. Please try again. Make sure the backend server is running on port 5000."

## The Solution (30 seconds)

### Step 1: Install Missing Dependency
```bash
npm install axios
```

### Step 2: Start Backend Server
```bash
# Terminal 1
npm run dev
```

### Step 3: Start Frontend Server  
```bash
# Terminal 2 (new terminal)
cd client
npm start
```

### Step 4: Test
- Open: http://localhost:3000
- Enter location: "London"
- Ask: "How much water does rice need?"

## Alternative: One-Command Fix
```bash
./fix-connection.sh
```

## If Still Not Working
```bash
# Kill all processes
npx kill-port 3000 5000

# Restart
npm run dev &
cd client && npm start
```

**That's it! Should work now! 🎉**