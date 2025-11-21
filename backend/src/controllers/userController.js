const User = require('../models/User');

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-passwordHash');
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

exports.updateImpact = async (req, res) => {
  try {
    const { userId, delta } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    user.impactScore = (user.impactScore || 0) + Number(delta || 0);
    await user.save();
    return res.json({ impactScore: user.impactScore });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};