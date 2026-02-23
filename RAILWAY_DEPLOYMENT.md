# 🚂 Railway Deployment Guide - CropEye AI Chatbot with Monitoring

## 📊 Architecture Overview

```
Your App (Railway Service 1)
    ↓ /metrics
Prometheus (Railway Service 2)
    ↓ scrapes metrics
Grafana (Railway Service 3)
    ↓ visualizes data
```

**One GitHub Repo → Three Railway Services**

---

## 🎯 Prerequisites

1. **GitHub Account** with your code pushed
2. **Railway Account** (free tier works!)
3. **Your app must expose `/metrics` endpoint** ✅ (Already done!)

---

## 🚀 STEP-BY-STEP DEPLOYMENT

### STEP 1: Deploy Main Application

1. **Go to Railway**: https://railway.app/
2. **Click "New Project"**
3. **Select "Deploy from GitHub repo"**
4. **Choose your `cropeye-agentic-chatbot` repository**
5. **Configure the service**:
   - **Name**: `cropeye-chatbot`
   - **Root Directory**: `/` (leave empty or set to root)
   - **Build Command**: `npm install && cd client && npm install && npm run build`
   - **Start Command**: `node server.js`
   - **Port**: `5000`

6. **Add Environment Variables**:
   ```
   PORT=5000
   NODE_ENV=production
   WEATHER_API_KEY=your_openweathermap_key (optional)
   ```

7. **Deploy** and wait for build to complete

8. **Get your app URL**: 
   - Example: `cropeye-chatbot-production.up.railway.app`
   - **SAVE THIS URL** - you'll need it!

9. **Test the metrics endpoint**:
   ```
   https://cropeye-chatbot-production.up.railway.app/metrics
   ```
   You should see Prometheus metrics!

---

### STEP 2: Deploy Prometheus

1. **In the same Railway project**, click **"New Service"**
2. **Select "Deploy from GitHub repo"**
3. **Choose the SAME repository**
4. **Configure**:
   - **Name**: `prometheus`
   - **Root Directory**: `prometheus`
   - **Dockerfile Path**: `prometheus/Dockerfile`
   - **Port**: `9090`

5. **IMPORTANT**: Update `prometheus/prometheus.yml` in your GitHub repo:
   ```yaml
   scrape_configs:
     - job_name: 'cropeye-chatbot'
       static_configs:
         - targets:
             - 'cropeye-chatbot-production.up.railway.app'  # YOUR ACTUAL URL
   ```

6. **Commit and push** the change
7. **Railway will auto-redeploy** Prometheus

8. **Test Prometheus**:
   - Open: `https://your-prometheus.up.railway.app`
   - Go to Status → Targets
   - Your app should show as "UP"

---

### STEP 3: Deploy Grafana

1. **In the same Railway project**, click **"New Service"**
2. **Select "Deploy from GitHub repo"**
3. **Choose the SAME repository**
4. **Configure**:
   - **Name**: `grafana`
   - **Root Directory**: `grafana`
   - **Dockerfile Path**: `grafana/Dockerfile`
   - **Port**: `3000`

5. **Deploy** and wait

6. **Access Grafana**:
   - URL: `https://your-grafana.up.railway.app`
   - **Username**: `admin`
   - **Password**: `admin`
   - (Change password on first login)

---

### STEP 4: Connect Grafana to Prometheus

1. **Login to Grafana**
2. **Go to**: Configuration → Data Sources
3. **Click**: "Add data source"
4. **Select**: "Prometheus"
5. **Configure**:
   - **Name**: `Prometheus`
   - **URL**: `https://your-prometheus.up.railway.app`
   - **Access**: `Server (default)`
6. **Click**: "Save & Test"
7. **Should show**: "Data source is working"

---

### STEP 5: Create Grafana Dashboard

1. **Go to**: Dashboards → New Dashboard
2. **Add Panel**
3. **Example Queries**:

#### Total HTTP Requests
```promql
rate(http_requests_total[5m])
```

#### Request Duration (95th percentile)
```promql
histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m]))
```

#### Chat Messages by Intent
```promql
rate(chat_messages_total[5m])
```

#### Weather API Calls
```promql
rate(weather_api_calls_total[5m])
```

#### Memory Usage
```promql
process_resident_memory_bytes / 1024 / 1024
```

#### CPU Usage
```promql
rate(process_cpu_seconds_total[5m])
```

4. **Save Dashboard** as "CropEye AI Chatbot Monitoring"

---

## 📁 Project Structure for Railway

```
cropeye-agentic-chatbot/
├── server.js              ← Main app with /metrics
├── package.json
├── client/
│   ├── package.json
│   └── src/
├── prometheus/
│   ├── Dockerfile         ← Prometheus service
│   └── prometheus.yml     ← Config with your app URL
├── grafana/
│   └── Dockerfile         ← Grafana service
└── RAILWAY_DEPLOYMENT.md  ← This file
```

---

## 🔧 Railway Service Configuration

### Service 1: CropEye Chatbot
```yaml
Name: cropeye-chatbot
Root Directory: /
Build Command: npm install && cd client && npm install && npm run build
Start Command: node server.js
Port: 5000
Environment Variables:
  - PORT=5000
  - NODE_ENV=production
  - WEATHER_API_KEY=your_key
```

### Service 2: Prometheus
```yaml
Name: prometheus
Root Directory: prometheus
Dockerfile Path: prometheus/Dockerfile
Port: 9090
```

### Service 3: Grafana
```yaml
Name: grafana
Root Directory: grafana
Dockerfile Path: grafana/Dockerfile
Port: 3000
Environment Variables:
  - GF_SECURITY_ADMIN_PASSWORD=your_secure_password
```

---

## ✅ Verification Checklist

### Main App
- [ ] App deployed successfully
- [ ] `/metrics` endpoint accessible
- [ ] Shows Prometheus metrics format
- [ ] Chat functionality works
- [ ] Weather widget works

### Prometheus
- [ ] Prometheus UI accessible
- [ ] Status → Targets shows app as "UP"
- [ ] Can query metrics
- [ ] Scraping interval working (15s)

### Grafana
- [ ] Grafana UI accessible
- [ ] Can login with admin credentials
- [ ] Prometheus data source connected
- [ ] Can create dashboards
- [ ] Queries return data

---

## 🐛 Troubleshooting

### Issue 1: Metrics endpoint not working
```bash
# Test locally first
curl http://localhost:5000/metrics

# Should show:
# HELP http_requests_total Total number of HTTP requests
# TYPE http_requests_total counter
# http_requests_total{method="GET",route="/",status_code="200"} 5
```

**Fix**: Make sure `prom-client` is installed and metrics are exposed

### Issue 2: Prometheus can't scrape app
**Symptoms**: Target shows as "DOWN" in Prometheus

**Fixes**:
1. Check `prometheus.yml` has correct app URL
2. Ensure app URL is accessible (no auth required for /metrics)
3. Check Railway logs for errors
4. Verify port configuration

### Issue 3: Grafana can't connect to Prometheus
**Symptoms**: "Data source is not working"

**Fixes**:
1. Use full Railway URL for Prometheus
2. Check Prometheus is running
3. Verify network connectivity
4. Try "Browser" access mode instead of "Server"

### Issue 4: Build fails on Railway
**Symptoms**: Deployment fails during build

**Fixes**:
1. Check Railway build logs
2. Verify Dockerfile syntax
3. Ensure all files are committed to GitHub
4. Check root directory configuration

---

## 📊 Metrics Available

### HTTP Metrics
- `http_requests_total` - Total requests by method, route, status
- `http_request_duration_seconds` - Request duration histogram

### Application Metrics
- `chat_messages_total` - Chat messages by intent type
- `weather_api_calls_total` - Weather API calls by source and status
- `active_users` - Current active users (gauge)

### System Metrics (Default)
- `process_cpu_seconds_total` - CPU usage
- `process_resident_memory_bytes` - Memory usage
- `nodejs_heap_size_total_bytes` - Node.js heap size
- `nodejs_heap_size_used_bytes` - Node.js heap used
- `nodejs_eventloop_lag_seconds` - Event loop lag

---

## 🎨 Sample Grafana Dashboard JSON

Create a file `grafana/dashboard.json`:

```json
{
  "dashboard": {
    "title": "CropEye AI Chatbot Monitoring",
    "panels": [
      {
        "title": "HTTP Requests Rate",
        "targets": [
          {
            "expr": "rate(http_requests_total[5m])"
          }
        ]
      },
      {
        "title": "Chat Messages by Intent",
        "targets": [
          {
            "expr": "rate(chat_messages_total[5m])"
          }
        ]
      },
      {
        "title": "Memory Usage",
        "targets": [
          {
            "expr": "process_resident_memory_bytes / 1024 / 1024"
          }
        ]
      }
    ]
  }
}
```

---

## 🔐 Security Best Practices

1. **Change Grafana admin password** immediately
2. **Use environment variables** for sensitive data
3. **Enable HTTPS** (Railway provides this automatically)
4. **Restrict Grafana access** if needed
5. **Monitor your metrics** for unusual patterns

---

## 💰 Railway Pricing

### Free Tier Includes:
- $5 credit per month
- Enough for 3 small services
- Auto-sleep after inactivity
- Perfect for development/testing

### If You Need More:
- Hobby Plan: $5/month
- Pro Plan: $20/month
- Prevents auto-sleep
- More resources

---

## 🎉 Success!

Once everything is deployed, you'll have:

✅ **Main App**: Serving your CropEye AI Chatbot
✅ **Prometheus**: Collecting metrics every 15 seconds
✅ **Grafana**: Beautiful dashboards showing:
   - Request rates and latency
   - Chat message patterns
   - Weather API usage
   - System resources (CPU, memory)
   - Custom business metrics

**Access URLs**:
- App: `https://cropeye-chatbot-production.up.railway.app`
- Prometheus: `https://prometheus-production.up.railway.app`
- Grafana: `https://grafana-production.up.railway.app`

---

## 📚 Additional Resources

- [Railway Documentation](https://docs.railway.app/)
- [Prometheus Documentation](https://prometheus.io/docs/)
- [Grafana Documentation](https://grafana.com/docs/)
- [prom-client (Node.js)](https://github.com/siimon/prom-client)

**Your CropEye AI Chatbot is now production-ready with full monitoring! 🚂📊🌱**