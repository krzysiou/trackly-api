import express from 'express';

import type { Express, Request, Response } from 'express';

import { withErrorHandler } from '../error-handler';
import { assertBodyString } from '../../core/asserts/assert-body-string';
import { generateAccessToken } from '../../core/access-token/generate-access-token';
import { logUserIn } from '../../core/authorization/log-user-in';
import { signUserIn } from '../../core/authorization/sign-user-in';
import { publicLimiter } from '../../core/limiters/public-limiter';
import { getConfig } from '../../../config/config';
import { checkAccessToken } from '../../core/access-token/check-access-token';
import { privateLimiter } from '../../core/limiters/private-limtier';

const { sessionCookieName } = getConfig();

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

const loginHandler = withErrorHandler(
  async (request: Request, response: Response) => {
    const { username, password } = assertBodyString(request.body, [
      'username',
      'password',
    ]);

    const user = await logUserIn(username as string, password as string);
    const accessToken = generateAccessToken(user);

    response.cookie(sessionCookieName, accessToken);
    response.send({ accessToken });
  }
);

const logoutHandler = withErrorHandler(
  async (request: Request, response: Response) => {
    response.setHeader('Clear-Site-Data', '"cookies"');
    response.send({ message: 'Signed out' });
  }
);

const mountAuthorizationRoutes = (app: Express) => {
  const router = express();

  router.post('/register', publicLimiter, registerHandler);
  router.post('/login', publicLimiter, loginHandler);
  router.post('/logout', privateLimiter, checkAccessToken, logoutHandler);

  app.use(router);
};

export { mountAuthorizationRoutes };
