const mongoose = require('mongoose');

const BadgeSchema = new mongoose.Schema({
  name: String,
  description: String,
  criteria: Object,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Badge', BadgeSchema);