#!/bin/zsh
# Start the Damn Aluminium Fabrication Backend
echo "🚀 Starting backend server..."
set -a
source backend/.env
set +a
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
