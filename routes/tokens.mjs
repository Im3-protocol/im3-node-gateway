import express from 'express';
import { createToken } from 'livekit-server-sdk'; // Assume using LiveKit SDK
import config from '../config/config.mjs';

const router = express.Router();

router.post('/join-meeting', (req, res) => {
  const { url, username } = req.body;

  try {
    const roomName = new URL(url).pathname.split('/').pop();
    const token = createToken(config.apiKey, config.apiSecret, {
      room: roomName,
      name: username,
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error generating token:', error);
    res.status(500).json({ error: 'Failed to generate token' });
  }
});

export default router;