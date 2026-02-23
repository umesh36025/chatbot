# 🚀 Quick Reference - CropEye AI Chatbot

## 📊 Monitoring Architecture

```
┌─────────────────────────────────────────────────┐
│  CropEye AI Chatbot (Railway Service 1)        │
│  Port: 5000                                     │
│  Exposes: /metrics                              │
└──────────────────┬──────────────────────────────┘
                   │
                   ↓ scrapes every 15s
┌──────────────────────────────────────────────────┐
│  Prometheus (Railway Service 2)                  │
│  Port: 9090                                      │
│  Stores: Time-series metrics data                │
└──────────────────┬───────────────────────────────┘
                   │
                   ↓ queries
┌──────────────────────────────────────────────────┐
│  Grafana (Railway Service 3)                     │
│  Port: 3000                                      │
│  Shows: Beautiful dashboards                     │
└──────────────────────────────────────────────────┘
```

---

## 🔗 URLs (After Railway Deployment)

| Service | URL | Purpose |
|---------|-----|---------|
| **Main App** | `https://cropeye-chatbot.up.railway.app` | Your chatbot |
| **Metrics** | `https://cropeye-chatbot.up.railway.app/metrics` | Prometheus metrics |
| **Prometheus** | `https://prometheus.up.railway.app` | Metrics database |
| **Grafana** | `https://grafana.up.railway.app` | Dashboards |

---

## 📁 Project Structure

```
cropeye-agentic-chatbot/
├── server.js              ← Main app with /metrics endpoint
├── package.json           ← Dependencies (includes prom-client)
├── client/                ← React frontend
├── utils/                 ← Backend utilities
├── prometheus/
│   ├── Dockerfile         ← Prometheus container
│   └── prometheus.yml     ← Scraping config (UPDATE WITH YOUR URL!)
├── grafana/
│   └── Dockerfile         ← Grafana container
└── RAILWAY_DEPLOYMENT.md  ← Full deployment guide
```

---

## 🚂 Railway Deployment Commands

```bash
# 1. Commit and push
git add .
git commit -m "Add monitoring"
git push

# 2. Deploy on Railway
# Go to: https://railway.app/new
# Deploy from GitHub repo (3 times for 3 services)

# 3. Configure each service:

# Service 1: Main App
Root Directory: /
Build: npm install && cd client && npm install && npm run build
Start: node server.js
Port: 5000

# Service 2: Prometheus
Root Directory: prometheus
Dockerfile: prometheus/Dockerfile
Port: 9090

# Service 3: Grafana
Root Directory: grafana
Dockerfile: grafana/Dockerfile
Port: 3000
```

---

## 📊 Key Metrics

### HTTP Metrics
```promql
rate(http_requests_total[5m])                    # Requests per second
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))  # 95th percentile latency
```

### Application Metrics
```promql
rate(chat_messages_total[5m])                    # Chat messages per second
rate(weather_api_calls_total{status="success"}[5m])  # Successful weather API calls
```

### System Metrics
```promql
process_resident_memory_bytes / 1024 / 1024      # Memory usage (MB)
rate(process_cpu_seconds_total[5m])              # CPU usage
```

---

## 🔧 Local Testing

```bash
# Start server
npm run dev

# Test metrics endpoint
curl http://localhost:5000/metrics

# Should see:
# HELP http_requests_total Total number of HTTP requests
# TYPE http_requests_total counter
# http_requests_total{method="GET",route="/",status_code="200"} 5
```

---

## 🎨 Grafana Quick Setup

1. **Login**: `admin` / `admin`
2. **Add Data Source**: Prometheus → `https://your-prometheus.up.railway.app`
3. **Create Dashboard**: Add panels with queries above
4. **Save**: Name it "CropEye Monitoring"

---

## ⚠️ Important: Update Prometheus Config

After deploying main app, edit `prometheus/prometheus.yml`:

```yaml
scrape_configs:
  - job_name: 'cropeye-chatbot'
    static_configs:
      - targets:
          - 'YOUR-ACTUAL-APP-URL.up.railway.app'  # ← CHANGE THIS!
```

Then commit and push → Railway auto-redeploys!

---

## ✅ Verification Steps

1. ✅ Main app accessible
2. ✅ `/metrics` endpoint returns data
3. ✅ Prometheus UI shows target as "UP"
4. ✅ Grafana connects to Prometheus
5. ✅ Dashboard shows live metrics

---

## 🐛 Quick Fixes

### Metrics not working?
```bash
npm install prom-client
npm run dev
curl http://localhost:5000/metrics
```

### Prometheus can't scrape?
- Check `prometheus.yml` has correct URL
- Verify `/metrics` is publicly accessible
- Look at Prometheus logs in Railway

### Grafana no data?
- Verify Prometheus URL in data source
- Test connection
- Check Prometheus is scraping

---

## 📚 Full Guides

- **Complete Deployment**: `RAILWAY_DEPLOYMENT.md`
- **Setup Complete**: `MONITORING_SETUP_COMPLETE.md`
- **Docker Guide**: `DOCKER_GUIDE.md`
- **Troubleshooting**: `TROUBLESHOOTING.md`

---

**One Repo → Three Services → Full Monitoring! 🚂📊✅**