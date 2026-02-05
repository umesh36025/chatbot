#!/bin/bash

echo "🔧 Fixing Docker Build Issues"
echo "============================="
echo ""

# Clean up any existing lock files that might be causing issues
echo "🧹 Cleaning up lock files..."
rm -f package-lock.json
rm -f client/package-lock.json

# Regenerate lock files
echo "📦 Regenerating package-lock.json files..."
npm install
cd client && npm install && cd ..

echo "✅ Lock files regenerated"
echo ""

# Clean Docker build cache
echo "🐳 Cleaning Docker build cache..."
docker builder prune -f

# Remove any existing images
echo "🗑️  Removing existing images..."
docker rmi cropeye-agentic-chatbot_cropeye-chatbot 2>/dev/null || true
docker rmi cropeye-agentic-chatbot_cropeye-chatbot-dev 2>/dev/null || true

echo ""
echo "🚀 Ready to build! Try one of these:"
echo ""
echo "Option 1 - Simple build:"
echo "  docker build -f Dockerfile.simple -t cropeye-chatbot ."
echo ""
echo "Option 2 - Docker Compose:"
echo "  ./docker-run.sh build --rebuild"
echo ""
echo "Option 3 - Development:"
echo "  ./docker-run.sh dev --rebuild"
echo ""

# Test simple build
echo "🧪 Testing simple Docker build..."
if docker build -f Dockerfile.simple -t cropeye-chatbot-test . --quiet; then
    echo "✅ Simple Docker build successful!"
    echo ""
    echo "🎉 You can now run:"
    echo "  docker run -p 5000:5000 cropeye-chatbot-test"
    echo "  Then open: http://localhost:5000"
else
    echo "❌ Docker build failed. Check the error messages above."
fi