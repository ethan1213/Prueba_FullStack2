@echo off
chcp 65001 > nul
title Iniciar React - E&J Proyectos Web

echo =======================================================
echo   Iniciando Servidor de Desarrollo React + Vite
echo   E&J Proyectos Web - Despliegue en Vercel
echo =======================================================
echo.

cd web-react

if not exist "node_modules" (
    echo [INFO] Instalando dependencias de Node...
    call cmd /c npm install
)

echo [INFO] Levantando servidor local en http://localhost:3000...
call cmd /c npm run dev
pause
