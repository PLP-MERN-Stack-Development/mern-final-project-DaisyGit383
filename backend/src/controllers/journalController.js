const Journal = require('../models/Journal');

exports.addEntry = async (req, res) => {
  try {
    const journal = await Journal.create({ entry: req.body.entry, userId: req.user._id });
    res.status(201).json(journal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getJournal = async (req, res) => {
  try {
    const journals = await Journal.find({ userId: req.user._id });
    res.json(journals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEntry = async (req, res) => {
  try {
    const journal = await Journal.findByIdAndUpdate(
      req.params.id,
      { entry: req.body.entry },
      { new: true }
    );
    if (!journal) return res.status(404).json({ error: 'Not found' });
    res.json(journal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteEntry = async (req, res) => {
  try {
    const journal = await Journal.findByIdAndDelete(req.params.id);
    if (!journal) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Journal entry deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};