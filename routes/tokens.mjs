import express from 'express';
import { AccessToken } from 'livekit-server-sdk';
import db from '../db/db.mjs';
import { API_KEY, API_SECRET } from '../config/config.mjs';

const router = express.Router();

router.post('/join-meeting', (req, res) => {
  const { url, username } = req.body;

  db.get(`SELECT room_name FROM meetings WHERE url = ?`, [url], (err, row) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!row) {
      return res.status(404).json({ error: 'Meeting not found' });
    }

    const roomName = row.room_name;

    const token = new AccessToken(API_KEY, API_SECRET, {
      identity: username,
    });

    token.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
    });

    const userToken = token.toJwt();

    db.run(`INSERT INTO tokens (token, room_name, username) VALUES (?, ?, ?)`, [userToken, roomName, username], function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ token: userToken });
    });
  });
});

export default router;
