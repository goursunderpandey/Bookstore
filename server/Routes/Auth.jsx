const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const crypto = require('crypto');
const User = require("../Schema/Authschema.jsx");


router.post("/signup", async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const hashpassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashpassword, role });
    await user.save();
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

   const secret = process.env.secretkey 
    const token = jwt.sign({ id: user._id, username: user.username, role: user.role },secret , { expiresIn: '1h' });

    res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
