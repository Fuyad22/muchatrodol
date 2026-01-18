@echo off
echo ========================================================
echo    Student Organization Website - Django Server
echo ========================================================
echo.
echo Starting Django on port 8000...
echo.

REM Start Django server (serves both frontend and API)
start "Django Server" cmd /c "cd /d %~dp0 && .venv\Scripts\activate.bat && python manage.py runserver 8000"

REM Wait 3 seconds for server to start
timeout /t 3 /nobreak >nul

REM Open the website
start "" "http://localhost:8000"

echo.
echo ========================================================
echo   WEBSITE IS NOW RUNNING!
echo ========================================================
echo   Website: http://localhost:8000
echo   API: http://localhost:8000/api/
echo   Admin Panel: http://localhost:8000/admin/
echo.
echo   Admin Login: admin / admin123
echo ========================================================
echo.
echo Press any key to STOP the server...
pause >nul

REM Kill the server
taskkill /FI "WINDOWTITLE eq Django Server*" /F >nul 2>&1

echo Server stopped.

