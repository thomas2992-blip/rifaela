# Rifa Solidaria Thomas Diniz

Sitio web para rifa benéfica para recaudar fondos para los tratamientos de Thomas Diniz contra el ELA (Esclerosis Lateral Amiotrófica).

## ✨ Características

- **Página informativa** sobre el ELA y la historia de Thomas
- **Sistema de rifa** con 800 números
- **Grid interactivo** para seleccionar números
- **Reserva de números** con nombre y teléfono
- **Sincronización en tiempo real** - todos los usuarios ven los cambios instantáneamente
- **Persistencia en JSON** - los datos se guardan en un archivo
- **Panel de administración** para gestionar los números
- **Información de pago** con datos bancarios (México) y PIX (Brasil)
- **Diseño responsive** para móviles y desktop

## 💰 Precios

| Paquete | Precio MXN | Precio BRL | Números |
|---------|-----------|-----------|---------|
| Individual | $100 | R$ 30 | 1 |
| Promo 3x2 | $200 | R$ 60 | 3 |
| Promo 10x | $500 | R$ 150 | 10 |

## 🏆 Premio

**DJI Mini 4 Pro** con controlador DJI RC 2
- Valor: $15,000+ MXN
- Cámara 4K HDR
- 34 minutos de vuelo
- Sensores omnidireccionales

## 📱 Información de Pago

### México - Transferencia Bancaria
- **Banco:** Banco Klar
- **Cuenta/CLABE:** 661610002848494304
- **Titular:** Thomas Diniz Antas

### Brasil - PIX
- **Chave PIX (CPF):** 349.683.688-10
- **Titular:** Thomas Diniz Antas

### Contacto
- **WhatsApp:** +52 55 1980 8217

## 🚀 Instalación y Uso

### Requisitos
- Node.js 18+ 
- npm o yarn

### Instalación

1. Clona o descarga el proyecto
2. Instala las dependencias:

```bash
npm install
```

### Modo Desarrollo

Para ejecutar tanto el servidor backend como el frontend en modo desarrollo:

```bash
# Terminal 1 - Iniciar servidor backend
npm run server

# Terminal 2 - Iniciar frontend
npm run dev
```

El servidor backend estará en `http://localhost:3000`
El frontend estará en `http://localhost:5173`

### Modo Producción

1. Construye el frontend:

```bash
npm run build
```

2. Inicia el servidor en modo producción:

```bash
npm start
```

El servidor servirá tanto el backend como el frontend estático en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
app/
├── data/                  # Datos persistentes (JSON)
│   └── raffle-data.json   # Base de datos de números
├── src/
│   ├── sections/          # Componentes de secciones
│   ├── hooks/             # Custom hooks
│   ├── types/             # Tipos TypeScript
│   ├── App.tsx            # Componente principal
│   └── index.css          # Estilos globales
├── public/images/         # Imágenes
├── server.js              # Servidor Express + Socket.IO
├── package.json
└── README.md
```

## 🔐 Panel de Administración

Para acceder al panel de administración:

1. Ve al final de la página
2. Ingresa la contraseña: `thomas2024`
3. Desde allí puedes:
   - Ver estadísticas de números vendidos/reservados
   - Marcar números como "vendidos" después de confirmar pago
   - Exportar/importar datos de respaldo
   - Ver información de contacto de los participantes

## 🛠️ Tecnologías

### Frontend
- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- Socket.IO Client

### Backend
- Node.js
- Express
- Socket.IO (WebSockets para tiempo real)
- CORS

## 📝 API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/numbers` | Obtener todos los números |
| GET | `/api/stats` | Obtener estadísticas |
| POST | `/api/reserve` | Reservar números |
| POST | `/api/mark-sold` | Marcar como vendido (admin) |
| POST | `/api/mark-available` | Marcar como disponible (admin) |
| GET | `/api/export` | Exportar datos (admin) |
| POST | `/api/import` | Importar datos (admin) |

## 🌐 Sincronización en Tiempo Real

El sistema utiliza Socket.IO para sincronizar los cambios en tiempo real:

- Cuando un usuario reserva un número, todos los demás usuarios ven el cambio inmediatamente
- Los números reservados aparecen en amarillo
- Los números vendidos aparecen en rojo
- No es necesario recargar la página para ver actualizaciones

## 💾 Persistencia de Datos

Los datos se almacenan en el archivo `data/raffle-data.json`:

- Se crea automáticamente si no existe
- Se actualiza en cada operación
- Puede respaldarse copiando el archivo
- Puede restaurarse mediante la función Importar en el panel de admin

## 🚀 Despliegue

### Opción 1: Servidor VPS/Dedicado

1. Sube los archivos al servidor
2. Instala Node.js y npm
3. Ejecuta `npm install`
4. Ejecuta `npm run build`
5. Ejecuta `npm start`
6. Configura un proxy inverso (nginx) si es necesario

### Opción 2: Railway/Render/Heroku

1. Sube el código a GitHub
2. Conecta tu cuenta de Railway/Render/Heroku
3. Configura las variables de entorno
4. Despliega

### Opción 3: Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## ⚙️ Variables de Entorno

Crea un archivo `.env` en la raíz:

```env
# Puerto del servidor
PORT=3000

# Entorno
NODE_ENV=production

# URL del API (para desarrollo)
VITE_API_URL=http://localhost:3000
```

## 🤝 Soporte

Para cualquier duda o problema con el sitio, contacta al desarrollador.

---

**¡Mucha fuerza Thomas! 💪❤️**
