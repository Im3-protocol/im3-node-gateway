const { v4 } = require('uuid');
const { isAddress } = require('viem');
const livekit = require('../utils/esmHelper');
const config = require('../config/config');

const roomService = async () => {
  const { RoomServiceClient } = await livekit();
  return new RoomServiceClient(config.im3.websocketUrl, config.im3.apiKey, config.im3.apiSecret);
};

const createRoom = async () => {
  // const { roomName } = roomBody;
  // const roomNameToSet = roomName ? roomName : v4();
  const roomName = v4();
  const opts = {
    name: roomName,
    emptyTimeout: 10 * 60, // 10 minutes
    maxParticipants: 20,
  };
  const roomService_ = await roomService();
  return roomService_.createRoom(opts);
};

const createToken = async (roomName, participantName, identity) => {
  const { AccessToken } = await livekit();
  const userName = isAddress(identity)
    ? `${participantName}-${identity.slice(0, 6)}...${identity.slice(-6)}`
    : `${participantName}`;
  const at = new AccessToken(config.im3.apiKey, config.im3.apiSecret, {
    name: userName,
    identity,
    // Token to expire after 10 minutes
    ttl: '10m',
  });
  at.addGrant({ roomJoin: true, room: roomName });

  return at.toJwt();
};

module.exports = {
  createRoom,
  createToken,
};
