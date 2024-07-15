import express from 'express';

import type { Express, Request, Response } from 'express';
import type { AccessTokenPayload } from '../../core/access-token/types';

import { withErrorHandler } from '../error-handler';
import { checkAccessToken } from '../../core/access-token/check-access-token';
import { privateLimiter } from '../../core/limiters/private-limtier';
import { getfromUsers } from '../../core/database/collections/users/get-from-users';

const statusHandler = withErrorHandler(
  async (request: Request, response: Response) => {
    response.send({ message: 'Alive' });
  }
);

const usersHandler = withErrorHandler(
  async (request: Request, response: Response) => {
    const accessTokenPayload = request.body
      .accessTokenPayload as AccessTokenPayload;

    const users = await getfromUsers({});

    response.send({ accessTokenPayload, users });
  }
);

const mountUtilityRoutes = (app: Express) => {
  const router = express();

  router.get('/status', statusHandler);
  router.post('/users', privateLimiter, checkAccessToken, usersHandler);

  app.use(router);
};

export { mountUtilityRoutes };
