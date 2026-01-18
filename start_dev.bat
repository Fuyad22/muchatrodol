@echo off
echo ========================================
echo   Student Organization Website
echo   Starting Development Servers
echo ========================================
echo.

REM Check if virtual environment exists
if not exist ".venv\Scripts\python.exe" (
    echo ERROR: Virtual environment not found!
    echo Please run: python -m venv .venv
    echo Then: .venv\Scripts\pip install -r requirements.txt
    pause
    exit /b 1
)

echo [1/3] Activating virtual environment...
call .venv\Scripts\activate.bat

echo [2/3] Starting Django backend on port 8000...
start "Django Backend" cmd /k ".venv\Scripts\python.exe manage.py runserver 8000"
timeout /t 3 /nobreak > nul

echo [3/3] Starting frontend server on port 3000...
start "Frontend Server" cmd /k "python -m http.server 3000"
timeout /t 2 /nobreak > nul

echo.
echo ========================================
echo   Servers Started Successfully!
echo ========================================
echo.
echo   Frontend: http://localhost:3000
echo   Backend API: http://localhost:8000/api/
echo   Admin Panel: http://localhost:8000/admin/
echo.
echo   Admin Credentials:
echo   Username: admin
echo   Password: admin123
echo.
echo ========================================
echo.
echo Opening website in browser...
timeout /t 2 /nobreak > nul
start http://localhost:3000

echo.
echo Press any key to stop all servers...
pause > nul

echo.
echo Stopping servers...
taskkill /FI "WINDOWTITLE eq Django Backend*" /T /F > nul 2>&1
taskkill /FI "WINDOWTITLE eq Frontend Server*" /T /F > nul 2>&1

echo Servers stopped.
pause
