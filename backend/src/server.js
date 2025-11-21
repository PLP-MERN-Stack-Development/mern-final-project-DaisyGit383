const http = require('http');
const app = require('./app');
const { initSocket } = require('./socket');
const dbConnect = require('./config/db');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
dbConnect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mern_final');

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
initSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});