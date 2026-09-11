@echo off
TITLE GyanMitra Full Stack Platform
echo ========================================================
echo    Starting GyanMitra (ज्ञानमित्र) Full Stack Platform
echo ========================================================
echo.

set ROOT_DIR=%~dp0

echo [1/2] Starting Backend Server (npm start in backend)...
start "GyanMitra Backend Server" cmd /k "cd /d "%ROOT_DIR%backend" && npm start"

echo [2/2] Starting Frontend Dev Server (npm run dev in frontend)...
start "GyanMitra Frontend Dev" cmd /k "cd /d "%ROOT_DIR%frontend" && npm run dev"

echo.
echo ========================================================
echo   ✨ GyanMitra Servers Started in Separate Windows:
echo   - Backend API: http://localhost:5000
echo   - Frontend UI: http://localhost:5173
echo ========================================================
echo.
pause

