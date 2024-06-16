const express = require('express');
const User = require('./db/user');
const logger = require('./logger');
const bcrypt = require('bcryptjs');

module.exports = app = express();

app.use(express.json());

app.post('/users', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: 'Please enter all fields', success: false });
  }

  if (password.length < 8) {
    return res.status(400).json({ msg: 'The password should contain at least 8 characters', success: false });
  }

  try {
    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists', success: false });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      password: hashedPassword
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ msg: 'Please enter all fields', success: false });
  }

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ msg: 'User does not exist', success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials', success: false });
    }

    res.json({ msg: 'Login successful', success: true });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ msg: 'Server error', success: false });
  }
});
