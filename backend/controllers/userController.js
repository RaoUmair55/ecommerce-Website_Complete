exports.getProfile = (req, res) => {
  if (!req.user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json({ user: req.user });
};

exports.updateProfile = async (req, res) => {
  try {
    const user = req.user;
    const { name, email, password } = req.body;
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password; // Should be hashed in User model pre-save
    await user.save();
    res.json({ user });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}; 