import express from 'express';

import type { Express, Request, Response } from 'express';

import { withErrorHandler } from '../error-handler';
import { assertBodyString } from '../../core/asserts/assert-body-string';
import { generateAccessToken } from '../../core/access-token/generate-access-token';
import { logUserIn } from '../../core/authorization/log-user-in';
import { signUserIn } from '../../core/authorization/sign-user-in';
import { publicLimiter } from '../../core/limiters/public-limiter';
import { getConfig } from '../../../config/config';

const { sessionCookieName } = getConfig();

const loginHandler = withErrorHandler(
  async (request: Request, response: Response) => {
    const { username, password } = assertBodyString(request.body, [
      'username',
      'password',
    ]);

    const user = await logUserIn(username, password);
    const accessToken = generateAccessToken(user);

    response.cookie(sessionCookieName, accessToken);
    response.send({ accessToken });
  }
);

const registerHandler = withErrorHandler(
  async (request: Request, response: Response) => {
    const { username, password } = assertBodyString(request.body, [
      'username',
      'password',
    ]);

    const user = await signUserIn(username, password);
    const accessToken = generateAccessToken(user);

    response.cookie(sessionCookieName, accessToken);
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
