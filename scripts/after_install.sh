#!/bin/bash
set -e

cd /home/ec2-user/app-frontend

# Set proper ownership
sudo chown -R ec2-user:ec2-user /home/ec2-user/app-frontend

# Install dependencies
npm ci --production

# Install PM2 globally
sudo npm install pm2 -g

# Create environment file from template (you'll need to populate this)
if [ ! -f .env ]; then
    cp .env.production.example .env
    echo "WARNING: Please update .env file with production values"
fi