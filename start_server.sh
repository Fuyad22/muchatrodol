#!/bin/bash

echo "==============================================="
echo "   Student Organization Website - Django"
echo "==============================================="
echo ""

# Activate virtual environment
echo "[1/3] Activating virtual environment..."
source .venv/Scripts/activate

# Run migrations
echo "[2/3] Checking database migrations..."
python manage.py migrate --noinput

# Start server
echo "[3/3] Starting Django server..."
echo ""
echo "==============================================="
echo "   Server will start at: http://127.0.0.1:8000"
echo "   Admin Panel: http://127.0.0.1:8000/admin"
echo "   "
echo "   Admin Credentials:"
echo "   Username: admin"
echo "   Password: admin123"
echo "==============================================="
echo ""
echo "Press CTRL+C to stop the server"
echo ""

python manage.py runserver
