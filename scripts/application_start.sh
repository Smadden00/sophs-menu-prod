#!/bin/bash
set -e

cd /home/ec2-user/app-frontend

# Build the application
npm run build

# Start with PM2
pm2 start npm --name "sophsmenu" -- start

# Configure PM2 to start on system boot
pm2 startup systemd -u ec2-user --hp /home/ec2-user
pm2 save

# Reload all processes
pm2 reload all