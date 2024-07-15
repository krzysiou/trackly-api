import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { mountUtilityRoutes } from './routes/utility-routes';
import { mountAuthorizationRoutes } from './routes/authorization-routes';
import { mountEngagementRoutes } from './routes/engagement-routes';
import { mountImpressionRoutes } from './routes/impression-routes';

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors({ origin: true, methods: ['GET', 'POST'] }));

mountUtilityRoutes(app);
mountAuthorizationRoutes(app);
mountEngagementRoutes(app);
mountImpressionRoutes(app);

export { app };
