import express from 'express';
import { AccessToken } from 'livekit-server-sdk';
import { LIVEKIT_API_KEY, LIVEKIT_SECRET_KEY } from '../config.mjs';

const router = express.Router();

router.post('/join-demo', (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }

  const roomName = 'im3DemoRoom';

  const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_SECRET_KEY, {
    identity: username,
  });

  at.addGrant({ roomJoin: true, room: roomName });

  const token = at.toJwt();

  res.json({ roomName, token });
});

export default router;
