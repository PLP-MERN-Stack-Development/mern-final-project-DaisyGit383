const express = require('express');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'supersecret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 } // 1 hour
}));

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/journal', require('./routes/journal'));
app.use('/resources', require('./routes/resources'));
app.use('/sessions', require('./routes/sessions'));

app.get('/', (req, res) => {
  res.json({ ok: true, message: 'API is running' });
});

module.exports = app;