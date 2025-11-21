const Session = require('../models/Session');

// Create session
exports.createSession = async (req, res) => {
  try {
    const { tutor, student, notes } = req.body;
    const session = await Session.create({ tutor, student, notes });
    res.status(201).json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// End session
exports.endSession = async (req, res) => {
  try {
    const { sessionId, endTime } = req.body;
    const session = await Session.findByIdAndUpdate(sessionId, { endTime }, { new: true });
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get session
exports.getSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    res.json(session);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};