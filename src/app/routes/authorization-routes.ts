import express from 'express';

import type { Express, Request, Response } from 'express';

import { withErrorHandler } from '../error-handler';
import { assertBodyString } from '../../core/asserts/assert-body-string';
import { generateAccessToken } from '../../core/access-token/generate-access-token';
import { logUserIn } from '../../core/authorization/log-user-in';
import { signUserIn } from '../../core/authorization/sign-user-in';
import { publicLimiter } from '../../core/limiters/public-limiter';

const registerHandler = withErrorHandler(
  async (request: Request, response: Response) => {
    const { username, password } = assertBodyString(request.body, [
      'username',
      'password',
    ]);

    const user = await signUserIn(username, password);
    const accessToken = generateAccessToken(user);

    response.send({ accessToken });
  }
);

const loginHandler = withErrorHandler(
  async (request: Request, response: Response) => {
    const { username, password } = assertBodyString(request.body, [
      'username',
      'password',
    ]);

    const user = await logUserIn(username as string, password as string);
    const accessToken = generateAccessToken(user);

    response.send({ accessToken });
  }
);

const mountAuthorizationRoutes = (app: Express) => {
  const router = express();

  router.post('/register', registerHandler);
  router.post('/login', loginHandler);

  app.use(publicLimiter);
  app.use(router);
};

export { mountAuthorizationRoutes };
