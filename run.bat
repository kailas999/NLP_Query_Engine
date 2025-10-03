@echo off
echo Starting NLP Query Engine for Employee Data...

echo.
echo Starting backend server...
start "Backend" /D "backend" python main.py

timeout /t 5 /nobreak >nul

echo.
echo Starting frontend development server...
start "Frontend" /D "frontend" npm run dev

echo.
echo Both servers are starting up...
echo Frontend will be available at http://localhost:3000
echo Backend API will be available at http://localhost:8000
echo.
echo Press any key to exit...
pause >nul