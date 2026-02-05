# 🐳 Docker Guide - CropEye AI Chatbot

## 🎯 Overview
Complete Docker setup for the CropEye AI Chatbot with development and production configurations, including Nginx reverse proxy support.

---

## 📋 Prerequisites

### Install Docker & Docker Compose
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install docker.io docker-compose

# CentOS/RHEL
sudo yum install docker docker-compose

# macOS (using Homebrew)
brew install docker docker-compose

# Or download Docker Desktop from: https://www.docker.com/products/docker-desktop
```

### Verify Installation
```bash
docker --version
docker-compose --version
```

---

## 🚀 Quick Start

### 1. Development Environment
```bash
# Start development environment (frontend + backend)
./docker-run.sh dev

# Or with Docker Compose directly
docker-compose --profile dev up
```

**Access:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5001

### 2. Production Environment
```bash
# Start production environment
./docker-run.sh prod

# With Nginx reverse proxy
./docker-run.sh prod --with-nginx
```

**Access:**
- Application: http://localhost:5000
- With Nginx: http://localhost:80

---

## 🛠️ Docker Run Script Commands

### Basic Commands
```bash
# Development environment
./docker-run.sh dev                    # Interactive mode
./docker-run.sh dev --detach          # Background mode

# Production environment
./docker-run.sh prod                   # Production mode
./docker-run.sh prod --with-nginx     # With reverse proxy

# Build images
./docker-run.sh build                 # Build all images
./docker-run.sh build --rebuild       # Force rebuild

# Management
./docker-run.sh stop                  # Stop all services
./docker-run.sh clean                 # Clean up containers/images
./docker-run.sh logs                  # Show all logs
./docker-run.sh logs cropeye-chatbot  # Show specific service logs
./docker-run.sh health                # Check service health
./docker-run.sh shell                 # Open shell in container
```

---

## 📁 Docker Files Overview

### 1. `Dockerfile` (Production)
- Multi-stage build for optimized production image
- Node.js 18 Alpine base
- Non-root user for security
- Health checks included
- Frontend built and served by backend

### 2. `Dockerfile.dev` (Development)
- Development environment with hot reload
- Both frontend and backend servers
- Volume mounts for live code changes
- Development tools included

### 3. `docker-compose.yml`
- Complete orchestration setup
- Development and production profiles
- Nginx reverse proxy (optional)
- Health checks and restart policies
- Network isolation

### 4. `.dockerignore`
- Optimized for smaller build context
- Excludes unnecessary files
- Keeps essential documentation

---

## 🔧 Configuration

### Environment Variables
Create `.env` file (copied from `.env.example`):
```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Weather API (Optional)
WEATHER_API_KEY=your_openweathermap_api_key_here
```

### Docker Compose Profiles
- **Default**: Production service only
- **dev**: Development environment
- **nginx**: Nginx reverse proxy

---

## 🌐 Network Architecture

### Development Mode
```
Browser → Frontend (3000) → Backend (5001)
```

### Production Mode
```
Browser → Application (5000)
```

### Production with Nginx
```
Browser → Nginx (80) → Application (5000)
```

---

## 📊 Service Details

### CropEye Chatbot (Production)
- **Image**: Custom built from Dockerfile
- **Port**: 5000
- **Health Check**: `/api/health` endpoint
- **Restart Policy**: unless-stopped
- **User**: Non-root (cropeye:1001)

### CropEye Chatbot Dev
- **Image**: Custom built from Dockerfile.dev
- **Ports**: 3000 (frontend), 5001 (backend)
- **Volumes**: Live code mounting
- **Environment**: Development optimized

### Nginx (Optional)
- **Image**: nginx:alpine
- **Port**: 80, 443 (HTTPS ready)
- **Features**: Rate limiting, gzip, security headers
- **SSL**: Ready for certificate mounting

---

## 🔍 Monitoring & Debugging

### Check Service Status
```bash
# List running containers
docker-compose ps

# Check logs
docker-compose logs -f cropeye-chatbot

# Health check
./docker-run.sh health

# Container stats
docker stats
```

### Debug Container
```bash
# Open shell in running container
./docker-run.sh shell

# Or directly
docker-compose exec cropeye-chatbot /bin/sh

# Check processes
docker-compose exec cropeye-chatbot ps aux

# Check network
docker-compose exec cropeye-chatbot netstat -tlnp
```

---

## 🚀 Deployment Scenarios

### 1. Local Development
```bash
# Start development environment
./docker-run.sh dev

# Make changes to code (auto-reload enabled)
# Test at http://localhost:3000
```

### 2. Production Server
```bash
# Build and start production
./docker-run.sh prod --detach

# Check health
./docker-run.sh health

# View logs
./docker-run.sh logs
```

### 3. Load Balanced Setup
```bash
# Start with Nginx
./docker-run.sh prod --with-nginx --detach

# Scale backend (if needed)
docker-compose up -d --scale cropeye-chatbot=3
```

---

## 🔒 Security Features

### Container Security
- Non-root user execution
- Minimal Alpine Linux base
- Security headers via Nginx
- Rate limiting on API endpoints

### Network Security
- Isolated Docker network
- Internal service communication
- Configurable SSL/TLS support

---

## 📈 Performance Optimization

### Production Optimizations
- Multi-stage build reduces image size
- Gzip compression via Nginx
- Static asset caching
- Health checks for reliability

### Development Optimizations
- Hot reload for faster development
- Volume mounts for instant changes
- Polling enabled for file watching

---

## 🛠️ Maintenance

### Update Application
```bash
# Pull latest code
git pull

# Rebuild and restart
./docker-run.sh build --rebuild
./docker-run.sh prod --detach
```

### Clean Up
```bash
# Remove unused containers/images
./docker-run.sh clean

# Complete cleanup
docker system prune -a
```

### Backup Data
```bash
# Export container
docker export cropeye-chatbot > cropeye-backup.tar

# Save image
docker save cropeye-agentic-chatbot > cropeye-image.tar
```

---

## 🐛 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Check what's using the port
sudo lsof -i :5000

# Kill process
sudo kill -9 <PID>

# Or use different port
PORT=5001 ./docker-run.sh prod
```

#### 2. Build Failures
```bash
# Clean build cache
docker builder prune

# Rebuild from scratch
./docker-run.sh build --rebuild
```

#### 3. Container Won't Start
```bash
# Check logs
./docker-run.sh logs

# Check container status
docker-compose ps

# Restart services
./docker-run.sh stop
./docker-run.sh prod
```

#### 4. API Connection Issues
```bash
# Check backend health
curl http://localhost:5000/api/health

# Check container network
docker network ls
docker network inspect cropeye-agentic-chatbot_cropeye-network
```

---

## 📚 Additional Resources

### Docker Commands Reference
```bash
# View images
docker images

# View containers
docker ps -a

# Remove container
docker rm <container_id>

# Remove image
docker rmi <image_id>

# View logs
docker logs <container_id>

# Execute command in container
docker exec -it <container_id> /bin/sh
```

### Docker Compose Commands
```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# Scale services
docker-compose up -d --scale cropeye-chatbot=3

# Update services
docker-compose pull && docker-compose up -d
```

---

## 🎉 Success Indicators

### Development Environment Working
- ✅ Frontend accessible at http://localhost:3000
- ✅ Backend API responding at http://localhost:5001/api/health
- ✅ Hot reload working when code changes
- ✅ Chat functionality working

### Production Environment Working
- ✅ Application accessible at http://localhost:5000
- ✅ Health check passing
- ✅ Chat responses working
- ✅ Weather widget functioning

### With Nginx Working
- ✅ Application accessible at http://localhost:80
- ✅ Rate limiting active
- ✅ Gzip compression enabled
- ✅ Security headers present

**Your CropEye AI Chatbot is now fully containerized and ready for deployment! 🐳🌱**