# 🔧 Troubleshooting Guide - CropEye AI Chatbot

## 🚨 Common Errors and Solutions

### Error 1: Styled-Components Keyframe Error
```
ERROR: It seems you are interpolating a keyframe declaration into an untagged string. 
This was supported in styled-components v3, but is not longer supported in v4...
```

**What it means**: There's a compatibility issue with styled-components and keyframe animations.

**Quick Fix**:
```bash
# Run the fix script
./fix-styling-error.sh

# Or manually:
cd client
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
cd ..
```

**Then restart the application**:
```bash
# Stop current servers (Ctrl+C)
./start.sh
```

---

### Error 2: "Cannot connect to server" or API errors

**Symptoms**: 
- Chat messages don't get responses
- Weather widget doesn't load
- Browser console shows network errors

**Solutions**:

1. **Check if backend is running**:
   ```bash
   # Should show server status
   curl http://localhost:5000/api/health
   ```

2. **Restart backend server**:
   ```bash
   # In Terminal 1
   npm run dev
   ```

3. **Check ports**:
   ```bash
   # Kill processes on ports if needed
   npx kill-port 5000
   npx kill-port 3000
   ```

---

### Error 3: "Port already in use"

**Error messages**:
- `EADDRINUSE: address already in use :::3000`
- `EADDRINUSE: address already in use :::5000`

**Solutions**:

1. **Kill processes using the ports**:
   ```bash
   npx kill-port 3000
   npx kill-port 5000
   ```

2. **Find and kill manually** (if above doesn't work):
   ```bash
   # Find process using port
   lsof -i :3000
   lsof -i :5000
   
   # Kill by PID
   kill -9 <PID>
   ```

3. **Use different ports**:
   ```bash
   # Backend on different port
   PORT=5001 npm run dev
   
   # Update client proxy in client/package.json
   "proxy": "http://localhost:5001"
   ```

---

### Error 4: "Module not found" errors

**Common messages**:
- `Module not found: Can't resolve 'axios'`
- `Module not found: Can't resolve 'styled-components'`

**Solutions**:

1. **Reinstall dependencies**:
   ```bash
   # Backend
   rm -rf node_modules package-lock.json
   npm install
   
   # Frontend
   cd client
   rm -rf node_modules package-lock.json
   npm install
   cd ..
   ```

2. **Clear npm cache**:
   ```bash
   npm cache clean --force
   ```

---

### Error 5: Blank page or "Loading..." forever

**Possible causes**:
- Frontend build issues
- Backend not responding
- Proxy configuration problems

**Solutions**:

1. **Check browser console** (F12 → Console):
   - Look for error messages
   - Check Network tab for failed requests

2. **Verify backend is running**:
   ```bash
   curl http://localhost:5000/api/health
   ```

3. **Rebuild frontend**:
   ```bash
   cd client
   npm run build
   cd ..
   npm start
   ```

4. **Check proxy configuration** in `client/package.json`:
   ```json
   "proxy": "http://localhost:5000"
   ```

---

### Error 6: "node: command not found"

**Cause**: Node.js not installed or not in PATH

**Solutions**:

1. **Install Node.js**:
   - Download from https://nodejs.org/
   - Choose LTS version
   - Restart terminal after installation

2. **Verify installation**:
   ```bash
   node --version
   npm --version
   ```

3. **Add to PATH** (if needed):
   ```bash
   # Add to ~/.bashrc or ~/.zshrc
   export PATH="/usr/local/bin:$PATH"
   ```

---

### Error 7: Permission denied errors

**Common on Mac/Linux**:
- `Permission denied: ./start.sh`
- `Permission denied: ./fix-styling-error.sh`

**Solutions**:

1. **Make scripts executable**:
   ```bash
   chmod +x start.sh
   chmod +x fix-styling-error.sh
   chmod +x check-system.sh
   ```

2. **Run with explicit bash**:
   ```bash
   bash start.sh
   ```

---

## 🔍 Diagnostic Commands

### Check System Status:
```bash
# Run comprehensive system check
./check-system.sh

# Check Node.js and npm
node --version
npm --version

# Check if servers are running
curl http://localhost:5000/api/health
curl http://localhost:3000
```

### Check Processes:
```bash
# See what's running on ports
lsof -i :3000
lsof -i :5000

# Check all node processes
ps aux | grep node
```

### Check Logs:
- **Backend logs**: Appear in Terminal 1 where you ran `npm run dev`
- **Frontend logs**: Appear in Terminal 2 where you ran `npm start`
- **Browser logs**: Press F12 → Console tab

---

## 🚀 Quick Recovery Steps

### If everything is broken:

1. **Stop all servers**:
   ```bash
   # Press Ctrl+C in all terminals
   # Or force kill
   npx kill-port 3000 5000
   ```

2. **Clean everything**:
   ```bash
   # Backend
   rm -rf node_modules package-lock.json
   npm cache clean --force
   npm install
   
   # Frontend
   cd client
   rm -rf node_modules package-lock.json
   npm cache clean --force
   npm install
   cd ..
   ```

3. **Restart**:
   ```bash
   ./start.sh
   ```

### If scripts don't work:

1. **Manual start**:
   ```bash
   # Terminal 1
   npm run dev
   
   # Terminal 2
   cd client
   npm start
   ```

2. **Check each step**:
   - Backend should show "Server running on port 5000"
   - Frontend should show "Compiled successfully"
   - Browser should load at http://localhost:3000

---

## 🆘 Still Having Issues?

### Check these common causes:

1. **Wrong directory**: Make sure you're in `cropeye-agentic-chatbot` folder
2. **Incomplete download**: Re-download/clone the project
3. **Antivirus interference**: Temporarily disable antivirus
4. **Firewall blocking**: Allow Node.js through firewall
5. **Old Node.js version**: Update to Node.js 16+

### Get more help:

1. **Run system check**: `./check-system.sh`
2. **Check all files are present**:
   ```bash
   ls -la
   # Should see: server.js, package.json, client/, utils/, etc.
   ```

3. **Verify project structure**:
   ```bash
   tree -L 2
   # Or
   find . -name "*.js" -o -name "*.json" | head -20
   ```

### Last resort - Fresh install:

1. **Delete everything and start over**:
   ```bash
   cd ..
   rm -rf cropeye-agentic-chatbot
   git clone <repository-url>
   cd cropeye-agentic-chatbot
   npm install
   cd client && npm install && cd ..
   ./start.sh
   ```

---

## 💡 Prevention Tips

1. **Always use LTS Node.js version**
2. **Don't modify package.json unless you know what you're doing**
3. **Keep terminals open while using the app**
4. **Don't run multiple instances simultaneously**
5. **Use `./start.sh` for consistent startup**
6. **Run `./check-system.sh` before reporting issues**

---

**Remember**: The chatbot works completely offline with built-in knowledge. Most issues are related to the development environment, not the core functionality!