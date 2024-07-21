import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { mountUtilityRoutes } from './routes/utility-routes';
import { mountAuthorizationRoutes } from './routes/authorization-routes';
import { mountEngagementRoutes } from './routes/engagement-routes';
import { mountImpressionRoutes } from './routes/impression-routes';
import { mountApplicationRoutes } from './routes/application-routes';
import { getConfig } from '../../config/config';

const { origin } = getConfig();

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  cors({
    origin,
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

mountUtilityRoutes(app);
mountAuthorizationRoutes(app);
mountApplicationRoutes(app);
mountEngagementRoutes(app);
mountImpressionRoutes(app);

export { app };
