@echo off
title Xmotion Marketplace
echo 🌟 Iniciando Xmotion Marketplace...
echo.

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js no está instalado. Por favor instala Node.js primero.
    pause
    exit /b 1
)

REM Instalar dependencias del backend si no existen
if not exist "backend\node_modules" (
    echo 📦 Instalando dependencias del backend...
    cd backend
    npm install
    cd ..
)

REM Instalar dependencias del frontend si no existen
if not exist "frontend\node_modules" (
    echo 📦 Instalando dependencias del frontend...
    cd frontend
    npm install
    cd ..
)

echo.
echo 🚀 Iniciando servidores...
echo.
echo 🔧 Backend: http://localhost:5000
echo 🌐 Frontend: http://localhost:3000
echo.

REM Iniciar backend en una nueva ventana
start "Xmotion Backend" cmd /k "cd backend && npm run dev"

REM Esperar 3 segundos
timeout /t 3 /nobreak >nul

REM Iniciar frontend en una nueva ventana
start "Xmotion Frontend" cmd /k "cd frontend && npm start"

echo ✅ Xmotion iniciado exitosamente!
echo.
echo 📋 Credenciales:
echo 👑 Admin: admin123@gmail.com / password
echo 👤 Usuario: user@test.com / password
echo.
echo 🌐 La aplicación se abrirá automáticamente en tu navegador
echo.
pause