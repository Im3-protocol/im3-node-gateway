import express from 'express';
import db from '../db/db.mjs';
import { LIVEKIT_HOST } from '../config/config.mjs';

const router = express.Router();

router.post('/create-meeting', (req, res) => {
  const roomName = `room-${Date.now()}`;
  const url = `${LIVEKIT_HOST}/join/${roomName}`;
  
  db.run(`INSERT INTO meetings (room_name, url) VALUES (?, ?)`, [roomName, url], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ roomName, url });
  });
});

export default router;
