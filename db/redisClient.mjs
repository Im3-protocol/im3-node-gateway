import { createClient } from 'redis';

const client = createClient();

client.on('error', (err) => {
  console.error('Redis client error', err);
});

await client.connect();

export default client;
