import express from 'express';
import cors from 'cors';
import meetingsRouter from './routes/meetings.mjs';
import tokensRouter from './routes/tokens.mjs';
import demoRouter from './routes/demo.mjs'; // Add this line

const app = express();

// Enable CORS for specific origins
const allowedOrigins = ['http://localhost:8080', 'https://meet.im3.live'];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());

// Use your routes
app.use('/api', meetingsRouter);
app.use('/api', tokensRouter);

const PORT = process.env.PORT || 7883;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});