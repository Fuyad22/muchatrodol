#!/bin/bash

clear
echo "========================================================"
echo "   Student Organization Website - Full Stack"
echo "========================================================"
echo ""
echo "Starting Django server..."
echo "This will serve both Frontend and Backend"
echo ""
echo "Frontend: http://127.0.0.1:8000/"
echo "Backend API: http://127.0.0.1:8000/api/"
echo "Admin Panel: http://127.0.0.1:8000/admin/"
echo ""
echo "Admin Login: admin / admin123"
echo "========================================================"
echo ""
echo "Press CTRL+C to stop the server"
echo ""

cd "$(dirname "$0")"
source .venv/Scripts/activate
python manage.py runserver
