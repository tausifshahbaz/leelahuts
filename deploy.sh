#!/usr/bin/env bash
set -e

echo "========================================="
echo "   🚀 Deploying Leela Huts Website       "
echo "========================================="

# Pull latest code from GitHub
echo "📥 1/3 Pulling latest code from master..."
git pull origin master

# Build and start container in detached mode
echo "📦 2/3 Building and starting Docker container..."
docker compose up -d --build

# Remove unused/dangling build images to free up disk space
echo "🧹 3/3 Cleaning up dangling Docker images..."
docker image prune -f

echo "========================================="
echo "   ✅ Deployment Successful!             "
echo "   Site is live on port 3000             "
echo "========================================="
