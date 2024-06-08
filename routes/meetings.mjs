import express from 'express';
import db from '../db/db.mjs';
import { LIVEKIT_HOST } from '../config/config.mjs';
import { AccessToken } from 'livekit-server-sdk';
import { API_KEY, API_SECRET } from '../config/config.mjs';
import { format } from 'date-fns';

const router = express.Router();

router.post('/create-meeting', (req, res) => {
  const { username } = req.body;
  const dateTime = format(new Date(), 'yyyy-MM-dd_HH:mm:ss');
  const roomName = `meeting_${dateTime}`;
  const url = `${LIVEKIT_HOST}/join/${roomName}`;

  const token = new AccessToken(API_KEY, API_SECRET, {
    identity: username,
  });

  token.addGrant({
    roomJoin: true,
    room: roomName,
    canPublish: true,
    canSubscribe: true,
  });

  const adminToken = token.toJwt();

  db.run(`INSERT INTO meetings (room_name, url, admin, created_at) VALUES (?, ?, ?, ?)`, [roomName, url, username, dateTime], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ roomName, url, adminToken });
  });
});

export default router;
