const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/users
router.post('/', async (req, res) => {
  const { name, email, phone, remarks } = req.body;

  try {
    const newUser = new User({ name, email, phone, remarks });
    await newUser.save();
    res.status(201).json({ message: 'User added successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add user', details: error.message });
  }
});

module.exports = router;
