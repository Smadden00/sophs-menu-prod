#!/bin/bash
# Health check script for load balancer

set -e

# Check if the application is running
if pm2 describe sophsmenu > /dev/null 2>&1; then
    # Check if the app is actually responding
    if curl -f http://localhost:80 > /dev/null 2>&1; then
        exit 0
    else
        exit 1
    fi
else
    exit 1
fi
