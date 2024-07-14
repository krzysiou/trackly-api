import express from 'express';

import type { Express, Request, Response } from 'express';

import { withErrorHandler } from '../error-handler';

const loginHandler = withErrorHandler(
  async (request: Request, response: Response) => {
    response.send({ message: 'Login page' });
  }
);

const registerHandler = withErrorHandler(
  async (request: Request, response: Response) => {
    response.send({ message: 'Register page' });
  }
);

const mountAuthorizationRoutes = (app: Express) => {
  const router = express();

  router.get('/login', loginHandler);
  router.get('/register', registerHandler);

  app.use(router);
};

export { mountAuthorizationRoutes };
