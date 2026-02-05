#!/bin/bash

# CropEye AI Chatbot - Docker Run Script

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_header() {
    echo -e "${BLUE}================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}================================${NC}"
}

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Function to show usage
show_usage() {
    echo "Usage: $0 [COMMAND] [OPTIONS]"
    echo ""
    echo "Commands:"
    echo "  dev         Start development environment"
    echo "  prod        Start production environment"
    echo "  build       Build Docker images"
    echo "  stop        Stop all services"
    echo "  clean       Clean up containers and images"
    echo "  logs        Show logs"
    echo "  health      Check service health"
    echo "  shell       Open shell in container"
    echo ""
    echo "Options:"
    echo "  --with-nginx    Include Nginx reverse proxy"
    echo "  --detach       Run in background"
    echo "  --rebuild      Force rebuild images"
    echo ""
    echo "Examples:"
    echo "  $0 dev                    # Start development environment"
    echo "  $0 prod --with-nginx      # Start production with Nginx"
    echo "  $0 build --rebuild        # Force rebuild all images"
    echo "  $0 logs cropeye-chatbot   # Show logs for specific service"
}

# Parse command line arguments
COMMAND=${1:-help}
WITH_NGINX=false
DETACH=false
REBUILD=false

shift || true
while [[ $# -gt 0 ]]; do
    case $1 in
        --with-nginx)
            WITH_NGINX=true
            shift
            ;;
        --detach)
            DETACH=true
            shift
            ;;
        --rebuild)
            REBUILD=true
            shift
            ;;
        *)
            SERVICE_NAME=$1
            shift
            ;;
    esac
done

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    print_warning ".env file not found. Creating from template..."
    cp .env.example .env
    print_status "Created .env file. Please edit it with your API keys if needed."
fi

case $COMMAND in
    dev)
        print_header "Starting Development Environment"
        
        COMPOSE_PROFILES="dev"
        if [ "$WITH_NGINX" = true ]; then
            COMPOSE_PROFILES="$COMPOSE_PROFILES,nginx"
        fi
        
        DOCKER_ARGS=""
        if [ "$DETACH" = true ]; then
            DOCKER_ARGS="$DOCKER_ARGS -d"
        fi
        
        if [ "$REBUILD" = true ]; then
            print_status "Rebuilding images..."
            DOCKER_COMPOSE_PROFILES=$COMPOSE_PROFILES docker-compose build --no-cache
        fi
        
        print_status "Starting development services..."
        DOCKER_COMPOSE_PROFILES=$COMPOSE_PROFILES docker-compose up $DOCKER_ARGS
        
        if [ "$DETACH" = true ]; then
            print_status "Services started in background"
            print_status "Frontend: http://localhost:3000"
            print_status "Backend: http://localhost:5001"
            if [ "$WITH_NGINX" = true ]; then
                print_status "Nginx: http://localhost:80"
            fi
        fi
        ;;
        
    prod)
        print_header "Starting Production Environment"
        
        COMPOSE_PROFILES=""
        if [ "$WITH_NGINX" = true ]; then
            COMPOSE_PROFILES="nginx"
        fi
        
        DOCKER_ARGS="-d"
        if [ "$DETACH" = false ]; then
            DOCKER_ARGS=""
        fi
        
        if [ "$REBUILD" = true ]; then
            print_status "Rebuilding production image..."
            docker-compose build --no-cache cropeye-chatbot
        fi
        
        print_status "Starting production services..."
        if [ -n "$COMPOSE_PROFILES" ]; then
            DOCKER_COMPOSE_PROFILES=$COMPOSE_PROFILES docker-compose up $DOCKER_ARGS cropeye-chatbot nginx
        else
            docker-compose up $DOCKER_ARGS cropeye-chatbot
        fi
        
        print_status "Production services started"
        print_status "Application: http://localhost:5000"
        if [ "$WITH_NGINX" = true ]; then
            print_status "Nginx: http://localhost:80"
        fi
        ;;
        
    build)
        print_header "Building Docker Images"
        
        if [ "$REBUILD" = true ]; then
            print_status "Force rebuilding all images..."
            docker-compose build --no-cache
        else
            print_status "Building images..."
            docker-compose build
        fi
        
        print_status "Build completed"
        ;;
        
    stop)
        print_header "Stopping All Services"
        
        docker-compose down
        print_status "All services stopped"
        ;;
        
    clean)
        print_header "Cleaning Up"
        
        print_status "Stopping and removing containers..."
        docker-compose down --remove-orphans
        
        print_status "Removing unused images..."
        docker image prune -f
        
        print_status "Removing unused volumes..."
        docker volume prune -f
        
        print_status "Cleanup completed"
        ;;
        
    logs)
        if [ -n "$SERVICE_NAME" ]; then
            print_header "Showing Logs for $SERVICE_NAME"
            docker-compose logs -f $SERVICE_NAME
        else
            print_header "Showing All Logs"
            docker-compose logs -f
        fi
        ;;
        
    health)
        print_header "Checking Service Health"
        
        # Check if containers are running
        if docker-compose ps | grep -q "Up"; then
            print_status "Containers are running"
            
            # Check backend health
            if curl -s http://localhost:5000/api/health > /dev/null 2>&1; then
                print_status "Backend health check: OK"
            else
                print_warning "Backend health check: FAILED"
            fi
            
            # Check frontend (if dev mode)
            if curl -s http://localhost:3000 > /dev/null 2>&1; then
                print_status "Frontend health check: OK"
            else
                print_warning "Frontend not accessible (normal in production mode)"
            fi
            
        else
            print_error "No containers are running"
        fi
        ;;
        
    shell)
        SERVICE_NAME=${SERVICE_NAME:-cropeye-chatbot}
        print_header "Opening Shell in $SERVICE_NAME"
        
        if docker-compose ps $SERVICE_NAME | grep -q "Up"; then
            docker-compose exec $SERVICE_NAME /bin/sh
        else
            print_error "Service $SERVICE_NAME is not running"
        fi
        ;;
        
    help|*)
        show_usage
        ;;
esac