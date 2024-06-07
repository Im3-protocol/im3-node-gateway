import express from 'express';
import meetingsRouter from './routes/meetings.mjs';
import tokensRouter from './routes/tokens.mjs';

const app = express();

app.use(express.json());

app.use('/api', meetingsRouter);
app.use('/api', tokensRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
