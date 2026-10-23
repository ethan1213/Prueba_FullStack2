@echo off
chcp 65001 > nul
title Clonar y Abrir - Prueba_FullStack2

echo =======================================================
echo   E&J Proyectos Web - Clonador de Repositorio
echo   Repositorio: https://github.com/ethan1213/Prueba_FullStack2.git
echo =======================================================
echo.

:: Verificar si git está instalado
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Git no está instalado o no se encuentra en el PATH.
    echo Por favor instala Git desde https://git-scm.com/
    pause
    exit /b 1
)

set REPO_URL=https://github.com/ethan1213/Prueba_FullStack2.git
set TARGET_DIR=Prueba_FullStack2

:: Si se ejecuta dentro de la carpeta clonada
if exist "index.html" (
    echo [INFO] Ya te encuentras dentro del proyecto.
    echo Actualizando cambios con git pull...
    git pull origin main
    goto abrir
)

:: Si la carpeta ya existe en el directorio actual
if exist "%TARGET_DIR%" (
    echo [INFO] La carpeta %TARGET_DIR% ya existe.
    cd "%TARGET_DIR%"
    echo Actualizando cambios con git pull...
    git pull origin main
    goto abrir
)

:: Clonar repositorio
echo [1/2] Clonando el repositorio desde GitHub...
git clone %REPO_URL% %TARGET_DIR%

if %errorlevel% neq 0 (
    echo [ERROR] Ocurrió un error al clonar el repositorio.
    pause
    exit /b 1
)

cd "%TARGET_DIR%"

:abrir
echo.
echo [2/2] ¡Repositorio listo!
echo Abriendo index.html en tu navegador predeterminado...
start index.html

echo.
echo =======================================================
echo   Proyecto listo y en ejecución local.
echo =======================================================
pause
