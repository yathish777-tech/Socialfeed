#!/bin/bash

# ─────────────────────────────────────────────────────────────
#  SocialFeed — Install & Run Script
#  Usage: bash run.sh
# ─────────────────────────────────────────────────────────────

echo ""
echo "======================================"
echo "  SocialFeed - Full Stack App Setup"
echo "======================================"
echo ""

# ── STEP 1: Install Backend Dependencies ──
echo "📦 Installing backend dependencies..."
cd backend
npm install
echo "✅ Backend dependencies installed."
echo ""

# ── STEP 2: Install Frontend Dependencies ──
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install
echo "✅ Frontend dependencies installed."
echo ""

# ── STEP 3: Start Backend in background ──
echo "🚀 Starting backend server on http://localhost:5000 ..."
cd ../backend
npm run dev &
BACKEND_PID=$!
echo "✅ Backend running (PID: $BACKEND_PID)"
echo ""

# Wait a moment for backend to boot
sleep 2

# ── STEP 4: Start Frontend ──
echo "🚀 Starting frontend on http://localhost:5173 ..."
cd ../frontend
npm run dev

# ── Cleanup on exit ──
echo ""
echo "🛑 Stopping backend..."
kill $BACKEND_PID
