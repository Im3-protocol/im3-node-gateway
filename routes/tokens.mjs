import express from 'express';
import { AccessToken } from 'livekit-server-sdk';
import redisClient from '../db/redisClient.mjs';
import { API_KEY, API_SECRET } from '../config/config.mjs';

const router = express.Router();

router.post('/join-meeting', async (req, res) => {
  const { url, username } = req.body;

  try {
    const roomName = url.split('/').pop();
    const roomData = await redisClient.hGetAll(roomName);

    if (!roomData) {
      return res.status(404).json({ error: 'Meeting not found' });
    }

    const { user_count_limit, time_limit, created_at, user_count } = roomData;
    const currentTime = new Date();
    const meetingStartTime = new Date(created_at);
    const elapsedTime = (currentTime - meetingStartTime) / 1000 / 60; // Convert milliseconds to minutes

    if (parseInt(user_count) >= parseInt(user_count_limit)) {
      return res.status(403).json({ error: 'User limit reached' });
    }

    if (elapsedTime > parseInt(time_limit)) {
      return res.status(403).json({ error: 'Time limit exceeded' });
    }

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

    await redisClient.hIncrBy(roomName, 'user_count', 1);

    res.json({ token: userToken });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
