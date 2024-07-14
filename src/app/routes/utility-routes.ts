import express from 'express';

import type { Express, Request, Response } from 'express';

import { withErrorHandler } from '../error-handler';

const statusHandler = withErrorHandler(
  async (request: Request, response: Response) => {
    response.send({ message: 'Alive' });
  }
);

const mountUtilityRoutes = (app: Express) => {
  const router = express();

  router.get('/status', statusHandler);

  app.use(router);
};

export { mountUtilityRoutes };
