import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

import { getConfig } from '../config/config';

const { port } = getConfig();

const app = express();

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
