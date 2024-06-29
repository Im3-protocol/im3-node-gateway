import crypto from 'crypto';

const hashRoomName = (roomName) => {
  return crypto.createHash('sha256').update(roomName).digest('hex');
};

export default hashRoomName;