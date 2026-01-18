@echo off
cls
echo ========================================================
echo    Student Organization Website - Django Server
echo ========================================================
echo.
echo Starting Django server on port 8000...
echo This serves BOTH Frontend and Backend
echo.
echo Website: http://127.0.0.1:8000/
echo API: http://127.0.0.1:8000/api/
echo Admin Panel: http://127.0.0.1:8000/admin/
echo.
echo Admin Login: admin / admin123
echo ========================================================
echo.
echo Press CTRL+C to stop the server
echo.

cd /d "%~dp0"
call .venv\Scripts\activate.bat
python manage.py runserver 8000
