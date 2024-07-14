import express from 'express';

import type { Express, Request, Response } from 'express';

import { withErrorHandler } from '../error-handler';
import { assertBody } from '../../core/asserts/assert-body';
import { generateAccessToken } from '../../core/access-token/generate-access-token';
import { logUserIn } from '../../core/user/log-user-in';
import { signUserIn } from '../../core/user/sign-user-in';
import { publicLimiter } from '../../core/limiters/public-limiter';

const loginHandler = withErrorHandler(
  async (request: Request, response: Response) => {
    const { username, password } = assertBody(request.body, [
      'username',
      'password',
    ]);

    const user = await logUserIn(username, password);
    const accessToken = generateAccessToken(user);

    response.send({ accessToken });
  }
);

const registerHandler = withErrorHandler(
  async (request: Request, response: Response) => {
    const { username, password } = assertBody(request.body, [
      'username',
      'password',
    ]);

    const user = await signUserIn(username, password);
    const accessToken = generateAccessToken(user);

    response.send({ accessToken });
  }
);

const mountAuthorizationRoutes = (app: Express) => {
  const router = express();

  router.post('/login', loginHandler);
  router.post('/register', registerHandler);

  app.use(publicLimiter);
  app.use(router);
};

export { mountAuthorizationRoutes };
