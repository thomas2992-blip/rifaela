#!/bin/bash

echo "🚀 Iniciando Rifa Solidaria Thomas Diniz..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

# Create data directory if not exists
mkdir -p data

# Build frontend if dist doesn't exist
if [ ! -d "dist" ]; then
    echo "🔨 Construyendo frontend..."
    npm run build
fi

echo "🌐 Iniciando servidor..."
echo ""
echo "📍 El sitio estará disponible en: http://localhost:3000"
echo "📊 Panel de administración: http://localhost:3000 (scroll al final)"
echo "🔑 Contraseña admin: thomas2024"
echo ""
echo "Presiona Ctrl+C para detener"
echo ""

npm start
