FROM grafana/grafana:latest

# Set environment variables
ENV GF_SECURITY_ADMIN_USER=admin
ENV GF_SECURITY_ADMIN_PASSWORD=admin
ENV GF_USERS_ALLOW_SIGN_UP=false
ENV GF_SERVER_ROOT_URL=%(protocol)s://%(domain)s/
ENV GF_ANALYTICS_REPORTING_ENABLED=false

# Expose Grafana port
EXPOSE 3000

# Grafana will start automatically with the base image CMD