import express from 'express';

import type { Express, Request, Response } from 'express';

import { withErrorHandler } from '../error-handler';
import { users } from '../../core/user/types';
import { checkAccessToken } from '../../core/access-token/check-access-token';
import { privateLimiter } from '../../core/limiters/private-limtier';

const statusHandler = withErrorHandler(
  async (request: Request, response: Response) => {
    response.send({ message: 'Alive' });
  }
);

const usersHandler = withErrorHandler(
  async (request: Request, response: Response) => {
    const accessTokenPayload = request.body.accessTokenPayload;
    response.send({ users, accessTokenPayload });
  }
);

const mountUtilityRoutes = (app: Express) => {
  const router = express();

  router.get('/status', statusHandler);
  router.post('/users', privateLimiter, checkAccessToken, usersHandler);

  app.use(router);
};

export { mountUtilityRoutes };
