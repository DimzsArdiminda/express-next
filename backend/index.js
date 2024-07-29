// index.js
import express from 'express';
import cors from 'cors';
import UserRoute from './routes/UserRoute.js';

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', // Update ini dengan domain frontend Anda
  methods: 'GET,POST,PATCH,DELETE',
  credentials: true,
}));
app.use(express.json());
app.use(UserRoute);

app.listen(5000, () => console.log('Server running on port 5000'));
