import express from 'express';
import cors from 'cors';
import meetingsRouter from './routes/meetings.mjs';
import tokensRouter from './routes/tokens.mjs';

const app = express();

const allowedOrigins = ['*', 'http://localhost:8080', 'https://meet.im3.live'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api', meetingsRouter);
app.use('/api', tokensRouter);

const PORT = process.env.PORT || 7883;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
