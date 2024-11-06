// backend/routes/auth.js
import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';

const clientId="148731754095-4acnf9s3tnkakpu08sb3sdarogru6g7b.apps.googleusercontent.com";
const client = new OAuth2Client(clientId);

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user and save to database
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(400).json({ error: 'Registration failed', details: error.message });
  }
});
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare the password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate a JWT token (optional, for session management)
    const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
});
router.post('/google-login', async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: clientId,
    });
    const payload = ticket.getPayload();
    const { email, name } = payload;

    // Check if user exists in DB, if not create a new user
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, name });
      await user.save();
    }

    res.status(200).json({ message: 'Google login successful', user });
  } catch (error) {
    res.status(400).json({ error: 'Google login failed' });
  }
});

export default router;
