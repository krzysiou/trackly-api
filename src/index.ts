import express from 'express'
import dotenv from 'dotenv'

dotenv.config();

const { PORT } = process.env;

const app = express();

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});