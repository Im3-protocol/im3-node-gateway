import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import redisClient from '../db/redisClient.mjs';
import hashRoomName from '../utils/hashRoomName.mjs';

const router = express.Router();

router.post('/create-meeting', async (req, res) => {
  const { username, user_count_limit, time_limit, roomName } = req.body;

  try {
    // Use provided roomName or generate a new one
    const finalRoomName = roomName ? roomName : uuidv4();

    const hashedRoomName = hashRoomName(finalRoomName);
    const meeting = {
      username,
      user_count_limit,
      time_limit,
      roomName: finalRoomName,
      url: `wss://livekit.im3.live/join/${finalRoomName}`,
      adminToken: 'GENERATE_YOUR_TOKEN_HERE'  // Replace with actual token generation logic
    };

    await redisClient.set(hashedRoomName, JSON.stringify(meeting));
    res.status(200).json(meeting);
  } catch (error) {
    console.error('Error creating meeting:', error);
    res.status(500).json({ error: 'Failed to create meeting' });
  }
});

export default router;