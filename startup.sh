#!/usr/bin/env bash

# ==============================================================================
# GyanMitra (ज्ञानमित्र) Unified Full Stack & MongoDB Lifecycle Orchestrator
# Starts MongoDB, Backend API, and Frontend Dev server together.
# Shuts down ALL processes (including MongoDB) automatically upon exit/Ctrl+C.
# ==============================================================================

echo "========================================================"
echo "    Starting GyanMitra (ज्ञानमित्र) Full Stack Platform"
echo "========================================================"
echo ""

# Get absolute path of script directory
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Ensure database directory exists
mkdir -p "$ROOT_DIR/backend/data/db"

MONGOD_PID=""
BACKEND_PID=""
FRONTEND_PID=""

# Cleanup function: Ensures MongoDB, Backend, and Frontend all terminate together
cleanup() {
    echo ""
    echo "Shutting down GyanMitra services..."

    if [ -n "$FRONTEND_PID" ] && kill -0 "$FRONTEND_PID" 2>/dev/null; then
        echo "  • Stopping Frontend server (PID: $FRONTEND_PID)..."
        kill "$FRONTEND_PID" 2>/dev/null
    fi

    if [ -n "$BACKEND_PID" ] && kill -0 "$BACKEND_PID" 2>/dev/null; then
        echo "  • Stopping Backend server (PID: $BACKEND_PID)..."
        kill "$BACKEND_PID" 2>/dev/null
    fi

    if [ -n "$MONGOD_PID" ] && kill -0 "$MONGOD_PID" 2>/dev/null; then
        echo "  • Stopping MongoDB database (PID: $MONGOD_PID)..."
        kill "$MONGOD_PID" 2>/dev/null
        # Wait up to 3 seconds for clean database flush
        for i in {1..3}; do
            if kill -0 "$MONGOD_PID" 2>/dev/null; then
                sleep 1
            else
                break
            fi
        done
        # Force kill if still holding lock
        if kill -0 "$MONGOD_PID" 2>/dev/null; then
            kill -9 "$MONGOD_PID" 2>/dev/null
        fi
    fi

    # Clean up lock files if process exited
    rm -f "$ROOT_DIR/backend/data/db/mongod.lock" 2>/dev/null

    wait 2>/dev/null
    echo "✓ All GyanMitra services (MongoDB, Backend, Frontend) stopped gracefully."
    exit 0
}

# Trap termination signals to trigger cleanup
trap cleanup SIGINT SIGTERM EXIT

# ------------------------------------------------------------------------------
# 1. Start MongoDB (Managed locally on dedicated port 27018)
# ------------------------------------------------------------------------------
if command -v mongod >/dev/null 2>&1; then
    echo "📦 [1/3] Starting Managed MongoDB Database (port 27018)..."
    mongod --dbpath "$ROOT_DIR/backend/data/db" \
           --logpath "$ROOT_DIR/backend/data/mongod.log" \
           --nounixsocket \
           --bind_ip 127.0.0.1 \
           --port 27018 &
    MONGOD_PID=$!

    # Wait for MongoDB to become ready (up to 5 seconds)
    echo -n "       Waiting for MongoDB to initialize..."
    for i in {1..10}; do
        if nc -z 127.0.0.1 27018 2>/dev/null || (exec 3<>/dev/tcp/127.0.0.1/27018) 2>/dev/null; then
            exec 3>&- 2>/dev/null || true
            echo " Ready."
            break
        fi
        sleep 0.5
    done
else
    echo "⚠️  [1/3] 'mongod' binary not found. Backend will operate in in-memory persistence mode."
fi

# ------------------------------------------------------------------------------
# 2. Start Backend Server (npm start inside backend/)
# ------------------------------------------------------------------------------
echo "🚀 [2/3] Starting Backend API Server (port 5000)..."
(cd "$ROOT_DIR/backend" && npm start) &
BACKEND_PID=$!

# Brief pause before starting frontend
sleep 1.5

# ------------------------------------------------------------------------------
# 3. Start Frontend Dev Server (npm run dev inside frontend/)
# ------------------------------------------------------------------------------
echo "🌐 [3/3] Starting Frontend Dev Server (port 5173)..."
(cd "$ROOT_DIR/frontend" && npm run dev) &
FRONTEND_PID=$!

echo ""
echo "========================================================"
echo "  ✨ GyanMitra (ज्ञानमित्र) All Systems Operational:"
echo "  - MongoDB Database: mongodb://127.0.0.1:27018/gyanmitra"
echo "  - Backend API:      http://localhost:5000"
echo "  - Frontend Portal:  http://localhost:5173"
echo "  - Admin Gateway:    http://localhost:5173/admin"
echo "  ----------------------------------------------------"
echo "  Press Ctrl+C to shut down all servers and database"
echo "========================================================"
echo ""

# Wait on background processes
wait $BACKEND_PID $FRONTEND_PID
