# ⚡ Quick Commands Reference

## 🚀 Start Application

```bash
# Local development (recommended)
./start.sh

# Docker production
./docker-run.sh prod

# Docker with monitoring
docker-compose --profile monitoring up -d
```

## 🌐 Access URLs

| Service | URL | Credentials |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | - |
| Backend | http://localhost:5000 | - |
| Metrics | http://localhost:5000/metrics | - |
| Prometheus | http://localhost:9090 | - |
| Grafana | http://localhost:3001 | admin/admin123 |
| Python Monitor | http://localhost:8000/metrics | - |

## 🧪 Test Commands

```bash
# Test backend health
curl http://localhost:5000/

# Test weather API
curl "http://localhost:5000/api/weather?location=Mumbai"

# Test metrics
curl http://localhost:5000/metrics

# Test chat API
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"How much water does rice need?"}'
```

## 🛑 Stop Services

```bash
# Stop local servers
./stop-servers.sh

# Stop Docker
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

## 🔧 Fix Common Issues

```bash
# Fix backend connection
./fix-connection.sh

# Fix Docker build
./fix-docker-build.sh

# Setup weather API
./setup-weather-api.sh

# Check system requirements
./check-system.sh
```

## 📦 Install Dependencies

```bash
# Node.js dependencies
npm install
cd client && npm install && cd ..

# Python dependencies (optional)
pip install -r requirements.txt
```

## 🐳 Docker Commands

```bash
# Build and start
docker-compose up --build -d

# View logs
docker-compose logs -f

# Restart service
docker-compose restart app

# Check status
docker-compose ps

# Clean rebuild
docker-compose down -v
docker-compose build --no-cache
docker-compose up -d
```

## 📊 Monitoring Commands

```bash
# Start Python monitoring
python3 python-monitoring-example.py

# View Prometheus targets
open http://localhost:9090/targets

# View Grafana dashboards
open http://localhost:3001

# Check metrics format
curl http://localhost:5000/metrics | head -20
```

## 🔍 Debug Commands

```bash
# Check if ports are in use
lsof -i :3000
lsof -i :5000
lsof -i :9090

# View Node.js processes
ps aux | grep node

# Check Docker containers
docker ps -a

# View container logs
docker logs cropeye-app
docker logs cropeye-prometheus
docker logs cropeye-grafana
```

## 📝 Sample Queries

Try these in the chat interface:

```
How much water does rice need?
Best soil for tomatoes
Current weather in Mumbai
Pest control for corn
When to plant wheat?
Fertilizer for potato
Disease prevention for rice
Seasonal calendar for farming
```

## 🌍 Weather Locations

Supported cities with detailed data:
- Mumbai, Delhi, Bangalore, Chennai
- Kolkata, Hyderabad, Pune, Nashik
- Any global city (with API key)

## 📚 Documentation

| Topic | File |
|-------|------|
| Overview | README.md |
| Installation | INSTALLATION_GUIDE.md |
| Running | HOW_TO_RUN.md |
| Docker | DOCKER_GUIDE.md |
| Railway | RAILWAY_DEPLOYMENT.md |
| Monitoring | MONITORING_SETUP_COMPLETE.md |
| Status | STATUS.md |
| Troubleshooting | TROUBLESHOOTING.md |
| Complete Summary | FINAL_SETUP_SUMMARY.md |

## 🎯 One-Line Starters

```bash
# Fastest start
./start.sh

# Production Docker
./docker-run.sh prod

# Full monitoring stack
docker-compose --profile monitoring up -d

# Python monitoring
pip install -r requirements.txt && python3 python-monitoring-example.py
```

---

**Need help?** Check `TROUBLESHOOTING.md` or `FINAL_SETUP_SUMMARY.md`
