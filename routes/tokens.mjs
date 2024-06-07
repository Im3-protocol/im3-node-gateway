import express from 'express';
import { AccessToken } from 'livekit-server-sdk';
import db from '../db/db.mjs';
import { API_KEY, API_SECRET } from '../config/config.mjs';

const router = express.Router();

router.post('/create-token', (req, res) => {
  const { roomName, userName } = req.body;

  const token = new AccessToken(API_KEY, API_SECRET, {
    identity: userName,
  });

  token.addGrant({
    roomJoin: true,
    room: roomName,
    canPublish: true,
    canSubscribe: true,
  });

  const tokenValue = token.toJwt();

  db.run(`INSERT INTO tokens (token, room_name) VALUES (?, ?)`, [tokenValue, roomName], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ token: tokenValue });
  });
});

export default router;
