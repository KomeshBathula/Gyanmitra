@echo off
TITLE GyanMitra Full Stack Platform
echo ========================================================
echo    Starting GyanMitra (ज्ञानमित्र) Full Stack Platform
echo ========================================================
echo.

set ROOT_DIR=%~dp0

echo [1/2] Starting Backend Server (npm start in backend)...
if not exist "%ROOT_DIR%backend\data\db" mkdir "%ROOT_DIR%backend\data\db"

echo [1/3] Starting MongoDB Database (port 27018)...
start "GyanMitra MongoDB" cmd /k "mongod --dbpath "%ROOT_DIR%backend\data\db" --bind_ip 127.0.0.1 --port 27018"

timeout /t 2 /nobreak >nul

echo [2/3] Starting Backend Server (npm start in backend)...
start "GyanMitra Backend Server" cmd /k "cd /d "%ROOT_DIR%backend" && npm start"

echo [2/2] Starting Frontend Dev Server (npm run dev in frontend)...
timeout /t 2 /nobreak >nul

echo [3/3] Starting Frontend Dev Server (npm run dev in frontend)...
start "GyanMitra Frontend Dev" cmd /k "cd /d "%ROOT_DIR%frontend" && npm run dev"

echo.
echo ========================================================
echo   ✨ GyanMitra Servers Started in Separate Windows:
echo   - Backend API: http://localhost:5000
echo   - Frontend UI: http://localhost:5173
echo   ✨ GyanMitra Servers Started:
echo   - MongoDB Database: mongodb://127.0.0.1:27018/gyanmitra
echo   - Backend API:      http://localhost:5000
echo   - Frontend UI:      http://localhost:5173
echo   - Admin Gateway:    http://localhost:5173/admin
echo ========================================================
echo.
pause

