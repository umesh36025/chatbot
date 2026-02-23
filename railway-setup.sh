#!/bin/bash

echo "🚂 Railway Deployment Setup - CropEye AI Chatbot"
echo "================================================"
echo ""

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "📦 Railway CLI not found. Installing..."
    npm install -g @railway/cli
fi

echo "✅ Railway CLI ready"
echo ""

# Login to Railway
echo "🔐 Please login to Railway..."
railway login

echo ""
echo "📋 Setup Checklist:"
echo ""
echo "1. ✅ Metrics endpoint added to server.js"
echo "2. ✅ Prometheus configuration created"
echo "3. ✅ Grafana configuration created"
echo "4. ✅ All files committed to GitHub"
echo ""

read -p "Have you pushed all changes to GitHub? (y/n): " pushed

if [ "$pushed" != "y" ] && [ "$pushed" != "Y" ]; then
    echo ""
    echo "⚠️  Please commit and push your changes first:"
    echo "   git add ."
    echo "   git commit -m 'Add monitoring with Prometheus and Grafana'"
    echo "   git push"
    echo ""
    exit 1
fi

echo ""
echo "🎯 Next Steps:"
echo ""
echo "1. Go to: https://railway.app/new"
echo "2. Click 'Deploy from GitHub repo'"
echo "3. Select your repository"
echo ""
echo "📝 Service Configuration:"
echo ""
echo "SERVICE 1 - Main App:"
echo "  Name: cropeye-chatbot"
echo "  Root Directory: /"
echo "  Build Command: npm install && cd client && npm install && npm run build"
echo "  Start Command: node server.js"
echo "  Port: 5000"
echo ""
echo "SERVICE 2 - Prometheus:"
echo "  Name: prometheus"
echo "  Root Directory: prometheus"
echo "  Dockerfile Path: prometheus/Dockerfile"
echo "  Port: 9090"
echo ""
echo "SERVICE 3 - Grafana:"
echo "  Name: grafana"
echo "  Root Directory: grafana"
echo "  Dockerfile Path: grafana/Dockerfile"
echo "  Port: 3000"
echo ""
echo "🔗 After deploying Service 1, update prometheus/prometheus.yml with your app URL!"
echo ""
echo "📖 Full guide: See RAILWAY_DEPLOYMENT.md"