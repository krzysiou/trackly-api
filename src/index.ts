import 'dotenv/config';

import { getConfig } from '../config/config';
import { app } from './app/app';

const { port } = getConfig();

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

export default app;
