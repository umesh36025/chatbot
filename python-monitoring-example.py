#!/usr/bin/env python3
"""
CropEye AI Chatbot - Python Monitoring Example
This is an example of how to add Python-based monitoring services
alongside the Node.js application.
"""

from prometheus_client import Counter, Histogram, Gauge, generate_latest
from flask import Flask, Response
import time
import random

# Create Flask app
app = Flask(__name__)

# Define Prometheus metrics
REQUEST_COUNT = Counter(
    'python_requests_total',
    'Total number of requests',
    ['method', 'endpoint', 'status']
)

REQUEST_DURATION = Histogram(
    'python_request_duration_seconds',
    'Request duration in seconds',
    ['method', 'endpoint']
)

ACTIVE_CONNECTIONS = Gauge(
    'python_active_connections',
    'Number of active connections'
)

FARMING_QUERIES = Counter(
    'farming_queries_total',
    'Total farming-related queries',
    ['query_type']
)

# Middleware to track metrics
@app.before_request
def before_request():
    app.request_start_time = time.time()

@app.after_request
def after_request(response):
    request_duration = time.time() - app.request_start_time
    
    REQUEST_COUNT.labels(
        method=request.method,
        endpoint=request.endpoint or 'unknown',
        status=response.status_code
    ).inc()
    
    REQUEST_DURATION.labels(
        method=request.method,
        endpoint=request.endpoint or 'unknown'
    ).observe(request_duration)
    
    return response

# Metrics endpoint for Prometheus
@app.route('/metrics')
def metrics():
    """Expose metrics for Prometheus scraping"""
    return Response(generate_latest(), mimetype='text/plain')

# Health check endpoint
@app.route('/health')
def health():
    """Health check endpoint"""
    return {'status': 'healthy', 'service': 'python-monitoring'}

# Example farming query endpoint
@app.route('/api/farming-query', methods=['POST'])
def farming_query():
    """Example endpoint that tracks farming queries"""
    # Simulate processing
    time.sleep(random.uniform(0.1, 0.5))
    
    # Track query type
    query_type = request.json.get('type', 'general')
    FARMING_QUERIES.labels(query_type=query_type).inc()
    
    return {
        'status': 'success',
        'message': 'Query processed',
        'type': query_type
    }

# Example endpoint to simulate active connections
@app.route('/api/connect')
def connect():
    """Simulate connection tracking"""
    ACTIVE_CONNECTIONS.inc()
    time.sleep(random.uniform(1, 3))
    ACTIVE_CONNECTIONS.dec()
    return {'status': 'connected'}

if __name__ == '__main__':
    print("🐍 Python Monitoring Service Starting...")
    print("📊 Metrics available at: http://localhost:8000/metrics")
    print("🏥 Health check at: http://localhost:8000/health")
    
    # Run the Flask app
    app.run(host='0.0.0.0', port=8000, debug=False)
