import crypto from 'crypto';

export function generateRoomName(username) {
  const hash = crypto.createHash('sha256');
  hash.update(username + Date.now().toString());
  return hash.digest('hex').slice(0, 10); // Using the first 10 characters of the hash
}
