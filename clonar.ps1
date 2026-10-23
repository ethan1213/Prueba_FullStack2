# =======================================================
# E&J Proyectos Web - Script PowerShell de Clonación
# Repositorio: https://github.com/ethan1213/Prueba_FullStack2.git
# =======================================================

Write-Host "=======================================================" -ForegroundColor Cyan
Write-Host "  E&J Proyectos Web - Clonador de Repositorio (PS)" -ForegroundColor Cyan
Write-Host "=======================================================" -ForegroundColor Cyan

$repoUrl = "https://github.com/ethan1213/Prueba_FullStack2.git"
$targetDir = "Prueba_FullStack2"

# Verificar git
if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "[ERROR] Git no está instalado o no se encuentra en el PATH." -ForegroundColor Red
    Write-Host "Descárgalo en: https://git-scm.com/" -ForegroundColor Yellow
    exit 1
}

# Si ya está dentro de la carpeta
if (Test-Path "index.html") {
    Write-Host "[INFO] Ya estás dentro del proyecto. Actualizando con git pull..." -ForegroundColor Green
    git pull origin main
    Start-Process "index.html"
    exit 0
}

# Si la carpeta existe
if (Test-Path $targetDir) {
    Write-Host "[INFO] La carpeta $targetDir ya existe. Actualizando..." -ForegroundColor Yellow
    Set-Location $targetDir
    git pull origin main
} else {
    Write-Host "[1/2] Clonando repositorio desde GitHub..." -ForegroundColor Green
    git clone $repoUrl $targetDir
    if ($LASTEXITCODE -ne 0) {
        Write-Host "[ERROR] Error al clonar el repositorio." -ForegroundColor Red
        exit 1
    }
    Set-Location $targetDir
}

Write-Host "[2/2] Repositorio listo. Abriendo index.html en el navegador..." -ForegroundColor Green
Start-Process "index.html"
Write-Host "¡Listo!" -ForegroundColor Cyan
