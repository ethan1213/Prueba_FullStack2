#!/usr/bin/env bash
# =======================================================
# E&J Proyectos Web - Script de Clonación Bash
# Repositorio: https://github.com/ethan1213/Prueba_FullStack2.git
# =======================================================

echo "======================================================="
echo "  E&J Proyectos Web - Clonador de Repositorio (Bash)"
echo "======================================================="

REPO_URL="https://github.com/ethan1213/Prueba_FullStack2.git"
TARGET_DIR="Prueba_FullStack2"

if ! command -v git &> /dev/null; then
    echo "[ERROR] Git no está instalado."
    exit 1
fi

if [ -f "index.html" ]; then
    echo "[INFO] Ya estás dentro del proyecto. Actualizando con git pull..."
    git pull origin main
    exit 0
fi

if [ -d "$TARGET_DIR" ]; then
    echo "[INFO] La carpeta $TARGET_DIR ya existe. Actualizando..."
    cd "$TARGET_DIR" || exit 1
    git pull origin main
else
    echo "[1/2] Clonando repositorio desde GitHub..."
    git clone "$REPO_URL" "$TARGET_DIR"
    cd "$TARGET_DIR" || exit 1
fi

echo "[2/2] Repositorio listo. Abre index.html en tu navegador."
