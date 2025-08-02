#!/bin/bash
set -e

# Stop existing application
pm2 stop sophsmenu || true
pm2 delete sophsmenu || true

# Clean up old deployment
rm -rf /home/ec2-user/app-frontend

# Install Node.js 18 (update from 14)
curl -sL https://rpm.nodesource.com/setup_18.x | sudo -E bash -
sudo yum -y install nodejs npm

# Update npm to latest version
sudo npm install -g npm@latest