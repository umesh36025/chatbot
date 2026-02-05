#!/bin/bash

echo "🐳 Quick Docker Test - CropEye AI Chatbot"
echo "========================================="
echo ""

# Check if Docker is available
if ! command -v docker &> /dev/null; then
    echo "❌ Docker not found. Please install Docker first."
    exit 1
fi

echo "🧪 Testing simple Docker build..."
echo ""

# Build using the simple Dockerfile
if docker build -f Dockerfile.simple -t cropeye-test . --no-cache; then
    echo ""
    echo "✅ Docker build successful!"
    echo ""
    
    # Test run the container
    echo "🚀 Testing container startup..."
    
    # Run container in background
    CONTAINER_ID=$(docker run -d -p 5001:5000 cropeye-test)
    
    if [ $? -eq 0 ]; then
        echo "✅ Container started with ID: $CONTAINER_ID"
        
        # Wait for container to be ready
        echo "⏳ Waiting for container to be ready..."
        sleep 10
        
        # Test health endpoint
        if curl -s http://localhost:5001/api/health > /dev/null; then
            echo "✅ Health check passed!"
            echo ""
            echo "🎉 Docker container is working!"
            echo "📱 Test URL: http://localhost:5001"
            echo "🔧 API Health: http://localhost:5001/api/health"
            echo "🌤️ Weather Test: http://localhost:5001/api/weather?location=London"
            echo ""
            echo "🛑 To stop the test container:"
            echo "   docker stop $CONTAINER_ID"
            echo "   docker rm $CONTAINER_ID"
        else
            echo "❌ Health check failed"
            docker logs $CONTAINER_ID
            docker stop $CONTAINER_ID
            docker rm $CONTAINER_ID
        fi
    else
        echo "❌ Failed to start container"
    fi
else
    echo ""
    echo "❌ Docker build failed!"
    echo ""
    echo "🔧 Try fixing with:"
    echo "   ./fix-docker-build.sh"
fi