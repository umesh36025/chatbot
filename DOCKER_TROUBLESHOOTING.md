# 🐳 Docker Build Troubleshooting Guide

## 🚨 Common Docker Build Issues

### Issue 1: npm ci Lock File Sync Error
```
npm error `npm ci` can only install packages when your package.json and package-lock.json are in sync
```

**Cause**: Package lock files are out of sync or have version conflicts.

**Quick Fix**:
```bash
./fix-docker-build.sh
```

**Manual Fix**:
```bash
# Remove lock files
rm -f package-lock.json client/package-lock.json

# Regenerate lock files
npm install
cd client && npm install && cd ..

# Clean Docker cache
docker builder prune -f

# Build with simple Dockerfile
docker build -f Dockerfile.simple -t cropeye-chatbot .
```

---

### Issue 2: TypeScript Version Conflicts
```
npm error Invalid: lock file's typescript@5.9.3 does not satisfy typescript@4.9.5
```

**Solution**: Use the simple Dockerfile that avoids lock file issues:
```bash
docker build -f Dockerfile.simple -t cropeye-chatbot .
```

---

### Issue 3: Build Context Too Large
```
ERROR: failed to build: failed to solve: failed to read dockerfile
```

**Solution**: Check .dockerignore excludes unnecessary files:
```bash
# Verify .dockerignore excludes:
# - node_modules/
# - client/node_modules/
# - *.log
# - .git/
```

---

## 🛠️ Docker Build Solutions

### Solution 1: Simple Dockerfile (Recommended)
```bash
# Use the simple, reliable Dockerfile
docker build -f Dockerfile.simple -t cropeye-chatbot .

# Run the container
docker run -p 5000:5000 cropeye-chatbot
```

### Solution 2: Docker Compose with Fixed Config
```bash
# Use the updated docker-compose.yml
./docker-run.sh prod --rebuild
```

### Solution 3: Development Container
```bash
# For development with hot reload
./docker-run.sh dev --rebuild
```

---

## 🧪 Testing Docker Builds

### Quick Test
```bash
# Test the Docker build and run
./docker-quick-test.sh
```

### Manual Test
```bash
# Build
docker build -f Dockerfile.simple -t cropeye-test .

# Run
docker run -d -p 5001:5000 cropeye-test

# Test
curl http://localhost:5001/api/health
```

---

## 🔧 Docker Build Strategies

### Strategy 1: No Lock Files (Simplest)
- Exclude package-lock.json from Docker context
- Use `npm install` instead of `npm ci`
- More flexible but potentially less reproducible

### Strategy 2: Fresh Lock Files
- Generate new lock files before build
- Ensure consistency across environments
- More reproducible but requires sync

### Strategy 3: Multi-stage Build
- Separate build and runtime stages
- Smaller final image size
- More complex but optimized

---

## 📊 Dockerfile Comparison

### Dockerfile.simple (Recommended for Quick Start)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json ./
COPY client/package.json ./client/
RUN npm install --only=production
COPY client/ ./client/
RUN cd client && npm install && npm run build
COPY server.js utils/ ./
EXPOSE 5000
CMD ["node", "server.js"]
```

**Pros**: Simple, reliable, handles lock file issues
**Cons**: Larger image size, rebuilds everything on changes

### Dockerfile (Multi-stage)
```dockerfile
FROM node:18-alpine AS build
# Build stage with all dependencies
FROM node:18-alpine AS production  
# Production stage with only runtime files
```

**Pros**: Smaller final image, optimized for production
**Cons**: More complex, sensitive to lock file issues

---

## 🚀 Quick Commands

### Build Commands
```bash
# Simple build
docker build -f Dockerfile.simple -t cropeye-chatbot .

# Multi-stage build
docker build -t cropeye-chatbot .

# Development build
docker build -f Dockerfile.dev -t cropeye-chatbot-dev .

# Force rebuild (no cache)
docker build --no-cache -f Dockerfile.simple -t cropeye-chatbot .
```

### Run Commands
```bash
# Production run
docker run -p 5000:5000 cropeye-chatbot

# Development run with volume mount
docker run -p 3000:3000 -p 5000:5000 -v $(pwd):/app cropeye-chatbot-dev

# Background run
docker run -d -p 5000:5000 --name cropeye cropeye-chatbot
```

### Debug Commands
```bash
# View build logs
docker build -f Dockerfile.simple -t cropeye-chatbot . --progress=plain

# Run with shell access
docker run -it cropeye-chatbot /bin/sh

# Check running containers
docker ps

# View container logs
docker logs <container_id>
```

---

## 🔍 Debugging Build Issues

### Check Build Context
```bash
# See what files are being sent to Docker
docker build -f Dockerfile.simple -t cropeye-test . --progress=plain 2>&1 | grep "COPY"
```

### Verify Dependencies
```bash
# Check package.json files
cat package.json | grep -A 10 -B 10 "dependencies"
cat client/package.json | grep -A 10 -B 10 "dependencies"
```

### Test Local Build
```bash
# Test if local build works
npm install
cd client && npm install && npm run build && cd ..
node server.js
```

---

## 🎯 Success Indicators

### Build Success
- ✅ No error messages during build
- ✅ Image created successfully
- ✅ Image size reasonable (< 500MB for simple build)

### Runtime Success
- ✅ Container starts without errors
- ✅ Health check passes: `curl http://localhost:5000/api/health`
- ✅ Weather API works: `curl http://localhost:5000/api/weather?location=London`
- ✅ Frontend accessible (if included)

---

## 🆘 Emergency Solutions

### If Nothing Works
1. **Use the simple Dockerfile**:
   ```bash
   docker build -f Dockerfile.simple -t cropeye-chatbot .
   ```

2. **Run without Docker**:
   ```bash
   npm install
   cd client && npm install && npm run build && cd ..
   npm start
   ```

3. **Use Docker Compose**:
   ```bash
   ./docker-run.sh prod
   ```

### Clean Slate Approach
```bash
# Remove everything Docker-related
docker system prune -a

# Remove lock files
rm -f package-lock.json client/package-lock.json

# Fresh install
npm install
cd client && npm install && cd ..

# Simple build
docker build -f Dockerfile.simple -t cropeye-chatbot .
```

---

## 💡 Pro Tips

1. **Always use .dockerignore** to exclude unnecessary files
2. **Test locally first** before building Docker image
3. **Use simple Dockerfile** for quick prototyping
4. **Use multi-stage builds** for production optimization
5. **Keep images small** by using Alpine Linux base
6. **Version your images** with tags for better management

---

**Remember**: The simple Dockerfile (`Dockerfile.simple`) is designed to work reliably even with lock file issues. Use it when you need a quick, working Docker build! 🐳✅