#!/usr/bin/env bash
set -e

echo "=================================================="
echo "          🏔️  LEELA HUTS DOCKER RUNNER            "
echo "=================================================="

# 1. Determine Docker command (docker compose vs docker-compose)
if docker compose version >/dev/null 2>&1; then
    DOCKER_CMD="docker compose"
elif command -v docker-compose >/dev/null 2>&1; then
    DOCKER_CMD="docker-compose"
else
    echo "❌ Error: Docker Compose is not installed."
    echo "   Please install Docker Compose or Docker engine first."
    exit 1
fi

# 2. Check if sudo is needed for docker
if ! docker info >/dev/null 2>&1; then
    if sudo -n docker info >/dev/null 2>&1 || [ "$EUID" -eq 0 ]; then
        DOCKER_CMD="sudo $DOCKER_CMD"
    else
        echo "⚠️  Docker permission requires sudo. Using sudo..."
        DOCKER_CMD="sudo $DOCKER_CMD"
    fi
fi

# 3. Detect Host Port (defaults to 3000 or reads from .env)
PORT="${HOST_PORT:-3000}"
if [ -f .env ]; then
    # shellcheck disable=SC1091
    source .env
    PORT="${HOST_PORT:-$PORT}"
fi

echo "⚙️  Docker Command: $DOCKER_CMD"
echo "🔌 Target Port:   $PORT"
echo ""

# 4. Build and start the container
echo "📦 Building and starting Leela Huts container..."
$DOCKER_CMD up -d --build

# 5. Clean up dangling builder images
echo "🧹 Cleaning up temporary build cache..."
if docker image prune -f >/dev/null 2>&1; then
    :
elif sudo docker image prune -f >/dev/null 2>&1; then
    :
fi

# 6. Wait a moment and check health
echo "⏳ Waiting for app to initialize..."
sleep 3

# Detect Public/Server IP if available
SERVER_IP=$(curl -s -m 2 https://api.ipify.org 2>/dev/null || hostname -I 2>/dev/null | awk '{print $1}' || echo "YOUR_SERVER_IP")

echo ""
echo "=================================================="
echo "          ✅ LEELA HUTS IS LIVE & RUNNING!        "
echo "=================================================="
echo "  Container:     leelahuts-web"
echo "  Local URL:     http://localhost:$PORT"
echo "  Server URL:    http://$SERVER_IP:$PORT"
echo "=================================================="
echo ""
echo "Useful Commands:"
echo "  - View live logs:     $DOCKER_CMD logs -f"
echo "  - Stop website:       $DOCKER_CMD down"
echo "  - Restart website:    $DOCKER_CMD restart"
echo "=================================================="

