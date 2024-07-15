import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { mountUtilityRoutes } from './routes/utility-routes';
import { mountAuthorizationRoutes } from './routes/authorization-routes';
import { mountEngagementRoutes } from './routes/engagement-routes';

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: true, methods: ['GET', 'POST'] }));

mountUtilityRoutes(app);
mountAuthorizationRoutes(app);
mountEngagementRoutes(app);

export { app };
