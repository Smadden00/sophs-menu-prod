#!/bin/bash

# Stop and delete all PM2 processes
pm2 stop all
pm2 delete all

# Navigate to the correct directory
cd "/home/ec2-user/sophs-menu-prod"

# Pull latest changes and rebuild
git pull
npm run build

# Restart with pm2
npm run start:pm2