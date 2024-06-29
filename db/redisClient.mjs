import { createClient } from 'redis';
import config from '../config/config.mjs';

const client = createClient({
  url: config.redisUrl
});

client.on('error', (err) => console.error('Redis Client Error', err));

await client.connect();

export default client;