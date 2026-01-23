@echo off
echo ==================================================
echo   Create Production Admin User (Global Sync)
echo ==================================================
echo.
echo This script will help you create an Admin User that works
echo on your live Vercel website (Global Sync).
echo.
echo You need your MongoDB URI from Vercel Settings.
echo.

set /p MONGODB_URI="Paste your MongoDB URI (mongodb+srv://...): "
echo.

if "%MONGODB_URI%"=="" (
    echo Error: URI cannot be empty.
    pause
    exit /b 1
)

echo.
echo Connecting to Production Database...
echo.

REM Set the URI temporarily for this session (does not save to file)
set MONGODB_URI=%MONGODB_URI%
set MONGODB_NAME=muchatrodol_db

REM Prompt for credentials
set /p DJANGO_SUPERUSER_USERNAME="Enter Username (default: admin): "
if "%DJANGO_SUPERUSER_USERNAME%"=="" set DJANGO_SUPERUSER_USERNAME=admin

set /p DJANGO_SUPERUSER_PASSWORD="Enter New Password: "
if "%DJANGO_SUPERUSER_PASSWORD%"=="" (
    echo Password cannot be empty!
    pause
    exit /b 1
)

REM Run the Python script
.venv\Scripts\python.exe create_admin_direct.py

echo.
echo ==================================================
if %ERRORLEVEL% EQU 0 (
    echo Success! You can now log in at:
    echo https://muchatrodol.vercel.app/admin
) else (
    echo Failed to connect or create user. 
    echo Check your URI and try again.
)
echo ==================================================
pause
