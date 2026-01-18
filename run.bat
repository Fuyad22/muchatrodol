@echo off
echo Starting Student Organization Website...
echo.

REM Start Django backend in background
start "Django Backend" cmd /c "cd /d %~dp0 && .venv\Scripts\activate.bat && python manage.py runserver"

REM Wait 3 seconds for server to start
timeout /t 3 /nobreak >nul

REM Open the website directly from file
start "" "%~dp0index.html"

echo.
echo ===============================================
echo   Website is now running!
echo ===============================================
echo   Frontend: index.html (opened in browser)
echo   Backend API: http://127.0.0.1:8000/api/
echo   Admin Panel: http://127.0.0.1:8000/admin/
echo.
echo   Admin Login: admin / admin123
echo ===============================================
echo.
echo Keep this window open. Press any key to stop...
pause >nul

REM Stop Django server
taskkill /FI "WINDOWTITLE eq Django Backend*" /T /F >nul 2>&1
