import express from 'express';
import { format } from 'date-fns';
import { AccessToken } from 'livekit-server-sdk';
import redisClient from '../db/redisClient.mjs';
import { LIVEKIT_HOST, API_KEY, API_SECRET } from '../config/config.mjs';
import { generateRoomName } from '../utils/hashRoomName.mjs';

const router = express.Router();

router.post('/create-meeting', async (req, res) => {
  const { username, user_count_limit, time_limit } = req.body;
  const roomName = generateRoomName(username);
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

  try {
    await redisClient.hSet(roomName, {
      url,
      admin: username,
      created_at: new Date().toISOString(),
      user_count_limit,
      time_limit,
      user_count: 0
    });

    res.json({ roomName, url, adminToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
