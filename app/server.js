const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Data file path
const DATA_FILE = path.join(__dirname, 'data', 'raffle-data.json');
const DATA_DIR = path.join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initialize data if not exists
const initializeData = () => {
  if (!fs.existsSync(DATA_FILE)) {
    const initialData = {
      numbers: Array.from({ length: 800 }, (_, i) => ({
        number: i + 1,
        status: 'available',
        reservedBy: null,
        reservedAt: null
      })),
      totalNumbers: 800,
      lastUpdated: new Date().toISOString()
    };
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
    return initialData;
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
};

// Read data from file
const readData = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading data:', error);
    return initializeData();
  }
};

// Write data to file
const writeData = (data) => {
  try {
    data.lastUpdated = new Date().toISOString();
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing data:', error);
    return false;
  }
};

// Initialize data
let raffleData = initializeData();

// API Routes

// Get all numbers
app.get('/api/numbers', (req, res) => {
  const data = readData();
  res.json(data);
});

// Get stats
app.get('/api/stats', (req, res) => {
  const data = readData();
  const stats = {
    available: data.numbers.filter(n => n.status === 'available').length,
    reserved: data.numbers.filter(n => n.status === 'reserved').length,
    sold: data.numbers.filter(n => n.status === 'sold').length,
    total: data.totalNumbers
  };
  res.json(stats);
});

// Reserve numbers
app.post('/api/reserve', (req, res) => {
  const { numbers, name, phone } = req.body;
  
  if (!numbers || !Array.isArray(numbers) || numbers.length === 0) {
    return res.status(400).json({ error: 'Numbers array is required' });
  }
  
  if (!name || !phone) {
    return res.status(400).json({ error: 'Name and phone are required' });
  }
  
  const data = readData();
  
  // Check if all numbers are available
  const unavailable = numbers.filter(num => {
    const numberData = data.numbers.find(n => n.number === num);
    return !numberData || numberData.status !== 'available';
  });
  
  if (unavailable.length > 0) {
    return res.status(400).json({ 
      error: 'Some numbers are not available',
      unavailable 
    });
  }
  
  // Reserve numbers
  numbers.forEach(num => {
    const numberData = data.numbers.find(n => n.number === num);
    if (numberData) {
      numberData.status = 'reserved';
      numberData.reservedBy = { name, phone };
      numberData.reservedAt = new Date().toISOString();
    }
  });
  
  if (writeData(data)) {
    // Emit update to all connected clients
    io.emit('numbersUpdated', data);
    res.json({ success: true, message: 'Numbers reserved successfully' });
  } else {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// Mark as sold (admin only)
app.post('/api/mark-sold', (req, res) => {
  const { numbers, adminKey } = req.body;
  
  if (adminKey !== 'thomas_admin_2024') {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  
  if (!numbers || !Array.isArray(numbers)) {
    return res.status(400).json({ error: 'Numbers array is required' });
  }
  
  const data = readData();
  
  numbers.forEach(num => {
    const numberData = data.numbers.find(n => n.number === num);
    if (numberData && numberData.status === 'reserved') {
      numberData.status = 'sold';
    }
  });
  
  if (writeData(data)) {
    io.emit('numbersUpdated', data);
    res.json({ success: true, message: 'Numbers marked as sold' });
  } else {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// Mark as available (admin only)
app.post('/api/mark-available', (req, res) => {
  const { numbers, adminKey } = req.body;
  
  if (adminKey !== 'thomas_admin_2024') {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  
  if (!numbers || !Array.isArray(numbers)) {
    return res.status(400).json({ error: 'Numbers array is required' });
  }
  
  const data = readData();
  
  numbers.forEach(num => {
    const numberData = data.numbers.find(n => n.number === num);
    if (numberData) {
      numberData.status = 'available';
      numberData.reservedBy = null;
      numberData.reservedAt = null;
    }
  });
  
  if (writeData(data)) {
    io.emit('numbersUpdated', data);
    res.json({ success: true, message: 'Numbers marked as available' });
  } else {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// Export data (admin only)
app.get('/api/export', (req, res) => {
  const adminKey = req.headers['x-admin-key'];
  
  if (adminKey !== 'thomas_admin_2024') {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  
  const data = readData();
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', `attachment; filename=raffle-data-${new Date().toISOString().split('T')[0]}.json`);
  res.json(data);
});

// Import data (admin only)
app.post('/api/import', (req, res) => {
  const adminKey = req.headers['x-admin-key'];
  
  if (adminKey !== 'thomas_admin_2024') {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  
  const { data } = req.body;
  
  if (!data || !data.numbers || !Array.isArray(data.numbers)) {
    return res.status(400).json({ error: 'Invalid data format' });
  }
  
  if (writeData(data)) {
    io.emit('numbersUpdated', data);
    res.json({ success: true, message: 'Data imported successfully' });
  } else {
    res.status(500).json({ error: 'Failed to save data' });
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  
  // Send current data to new client
  socket.emit('numbersUpdated', readData());
  
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  });
}

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Data file: ${DATA_FILE}`);
});
