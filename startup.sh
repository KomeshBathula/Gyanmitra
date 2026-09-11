#!/usr/bin/env bash

# GyanMitra Full Stack Startup Script (Linux / macOS)
# Runs Backend (npm start in backend/) and Frontend (npm run dev in frontend/) simultaneously

echo "========================================================"
echo "    Starting GyanMitra (ज्ञानमित्र) Full Stack Platform"
echo "========================================================"
echo ""

# Get absolute path of script directory
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Cleanup function to kill child processes on Ctrl+C / exit
cleanup() {
    echo ""
    echo "Shutting down GyanMitra servers..."
    if [ -n "$BACKEND_PID" ]; then
        kill "$BACKEND_PID" 2>/dev/null
    fi
    if [ -n "$FRONTEND_PID" ]; then
        kill "$FRONTEND_PID" 2>/dev/null
    fi
    wait 2>/dev/null
    echo "All servers stopped."
    exit 0
}

trap cleanup SIGINT SIGTERM

# 1. Start Backend Server (npm start inside backend/)
echo "🚀 [1/2] Starting Backend Server (npm start in backend/)..."
(cd "$ROOT_DIR/backend" && npm start) &
BACKEND_PID=$!

# Wait briefly for backend
sleep 1

# 2. Start Frontend Dev Server (npm run dev inside frontend/)
echo "🌐 [2/2] Starting Frontend Dev Server (npm run dev in frontend/)..."
(cd "$ROOT_DIR/frontend" && npm run dev) &
FRONTEND_PID=$!

echo ""
echo "========================================================"
echo "  ✨ GyanMitra Servers Running:"
echo "  - Backend API: http://localhost:5000"
echo "  - Frontend UI: http://localhost:5173"
echo "  Press Ctrl+C to shut down both servers gracefully"
echo "========================================================"
echo ""

# Keep waiting for background processes
wait $BACKEND_PID $FRONTEND_PID

