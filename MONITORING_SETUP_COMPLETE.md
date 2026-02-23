# ✅ Monitoring Setup Complete - CropEye AI Chatbot

## 🎉 What's Been Added

### 1. Prometheus Metrics in Main App
- ✅ `/metrics` endpoint exposed
- ✅ HTTP request tracking (total, duration)
- ✅ Chat message metrics by intent
- ✅ Weather API call tracking
- ✅ System metrics (CPU, memory, Node.js stats)

### 2. Prometheus Service
- ✅ `prometheus/Dockerfile` created
- ✅ `prometheus/prometheus.yml` configured
- ✅ Ready to scrape metrics from main app

### 3. Grafana Service
- ✅ `grafana/Dockerfile` created
- ✅ Pre-configured with admin credentials
- ✅ Ready to visualize Prometheus data

---

## 📁 New Files Created

```
cropeye-agentic-chatbot/
├── server.js (UPDATED)           ← Added Prometheus metrics
├── package.json (UPDATED)        ← Added prom-client dependency
├── prometheus/
│   ├── Dockerfile                ← Prometheus container
│   └── prometheus.yml            ← Scraping configuration
├── grafana/
│   └── Dockerfile                ← Grafana container
├── RAILWAY_DEPLOYMENT.md         ← Complete deployment guide
├── railway-setup.sh              ← Setup helper script
└── MONITORING_SETUP_COMPLETE.md  ← This file
```

---

## 🚀 Quick Start

### Test Locally

1. **Restart the server**:
   ```bash
   # Stop current server (Ctrl+C)
   npm run dev
   ```

2. **Test metrics endpoint**:
   ```bash
   curl http://localhost:5000/metrics
   ```

   You should see output like:
   ```
   # HELP http_requests_total Total number of HTTP requests
   # TYPE http_requests_total counter
   http_requests_total{method="GET",route="/",status_code="200"} 5
   
   # HELP chat_messages_total Total number of chat messages processed
   # TYPE chat_messages_total counter
   chat_messages_total{intent="water_requirements"} 3
   ```

3. **Test with Docker** (optional):
   ```bash
   # Build and run Prometheus
   cd prometheus
   docker build -t cropeye-prometheus .
   docker run -p 9090:9090 cropeye-prometheus
   
   # Access: http://localhost:9090
   ```

---

## 🚂 Deploy to Railway

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add Prometheus and Grafana monitoring"
git push
```

### Step 2: Deploy Services

1. **Go to Railway**: https://railway.app/new
2. **Deploy 3 services from the same repo**:

#### Service 1: Main App
```
Name: cropeye-chatbot
Root Directory: /
Build: npm install && cd client && npm install && npm run build
Start: node server.js
Port: 5000
```

#### Service 2: Prometheus
```
Name: prometheus
Root Directory: prometheus
Dockerfile: prometheus/Dockerfile
Port: 9090
```

#### Service 3: Grafana
```
Name: grafana
Root Directory: grafana
Dockerfile: grafana/Dockerfile
Port: 3000
```

### Step 3: Update Prometheus Config

After deploying the main app, get its URL (e.g., `cropeye-chatbot.up.railway.app`)

Update `prometheus/prometheus.yml`:
```yaml
scrape_configs:
  - job_name: 'cropeye-chatbot'
    static_configs:
      - targets:
          - 'cropeye-chatbot.up.railway.app'  # YOUR ACTUAL URL
```

Commit and push → Railway auto-redeploys!

---

## 📊 Available Metrics

### HTTP Metrics
```promql
# Request rate
rate(http_requests_total[5m])

# Request duration (95th percentile)
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))

# Requests by status code
sum by (status_code) (rate(http_requests_total[5m]))
```

### Application Metrics
```promql
# Chat messages by intent
rate(chat_messages_total[5m])

# Weather API calls
rate(weather_api_calls_total[5m])

# Weather API success rate
rate(weather_api_calls_total{status="success"}[5m]) / rate(weather_api_calls_total[5m])
```

### System Metrics
```promql
# Memory usage (MB)
process_resident_memory_bytes / 1024 / 1024

# CPU usage
rate(process_cpu_seconds_total[5m])

# Node.js heap usage
nodejs_heap_size_used_bytes / nodejs_heap_size_total_bytes
```

---

## 🎨 Grafana Dashboard Setup

1. **Login to Grafana**:
   - URL: `https://your-grafana.up.railway.app`
   - Username: `admin`
   - Password: `admin`

2. **Add Prometheus Data Source**:
   - Configuration → Data Sources → Add
   - Type: Prometheus
   - URL: `https://your-prometheus.up.railway.app`
   - Save & Test

3. **Create Dashboard**:
   - Dashboards → New Dashboard
   - Add panels with the queries above
   - Save as "CropEye AI Chatbot Monitoring"

---

## 🔍 Monitoring What Matters

### Key Metrics to Watch

1. **Performance**:
   - Request latency (p95, p99)
   - Requests per second
   - Error rate

2. **Business Metrics**:
   - Chat messages by intent type
   - Weather API usage and success rate
   - Active users

3. **System Health**:
   - Memory usage trends
   - CPU utilization
   - Event loop lag

4. **Alerts** (set up in Prometheus):
   - High error rate (>5%)
   - High latency (p95 > 1s)
   - Memory usage >80%
   - Weather API failures

---

## ✅ Verification Checklist

### Local Testing
- [ ] Server starts without errors
- [ ] `/metrics` endpoint returns data
- [ ] Metrics update when using the app
- [ ] Chat messages increment counters
- [ ] Weather API calls tracked

### Railway Deployment
- [ ] Main app deployed and accessible
- [ ] `/metrics` endpoint works on Railway
- [ ] Prometheus deployed and scraping
- [ ] Grafana deployed and accessible
- [ ] Grafana connected to Prometheus
- [ ] Dashboard showing live data

---

## 🐛 Troubleshooting

### Metrics not showing
```bash
# Check if prom-client is installed
npm list prom-client

# Test metrics endpoint
curl http://localhost:5000/metrics

# Check server logs
npm run dev
```

### Prometheus can't scrape
1. Verify app URL in `prometheus.yml`
2. Check `/metrics` is publicly accessible
3. Look at Prometheus logs
4. Check Status → Targets in Prometheus UI

### Grafana no data
1. Verify Prometheus data source URL
2. Test connection in Grafana
3. Check Prometheus is scraping successfully
4. Verify query syntax

---

## 📚 Resources

- **Railway Deployment**: See `RAILWAY_DEPLOYMENT.md`
- **Prometheus Docs**: https://prometheus.io/docs/
- **Grafana Docs**: https://grafana.com/docs/
- **prom-client**: https://github.com/siimon/prom-client

---

## 🎯 Next Steps

1. **Test locally** to ensure metrics work
2. **Push to GitHub** with all changes
3. **Deploy to Railway** following the guide
4. **Set up Grafana dashboards** for visualization
5. **Configure alerts** for critical metrics
6. **Monitor and optimize** based on data

---

**Your CropEye AI Chatbot now has enterprise-grade monitoring! 🚂📊🌱**

**Architecture**: App → Prometheus → Grafana
**One Repo**: Three Railway Services
**Full Observability**: Metrics, Dashboards, Alerts