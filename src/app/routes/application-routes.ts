import express from 'express';

import type { Express, Request, Response } from 'express';
import type { AccessTokenPayload } from '../../core/access-token/types';

import { withErrorHandler } from '../error-handler';
import { checkAccessToken } from '../../core/access-token/check-access-token';
import { privateLimiter } from '../../core/limiters/private-limtier';
import { assertBodyString } from '../../core/asserts/assert-body-string';
import { createApplication } from '../../core/application/create-application';
import { getSingleApplication } from '../../core/application/get-single-application';
import { getAllApplications } from '../../core/application/get-all-applications.1';

const createHandler = withErrorHandler(
  async (request: Request, response: Response) => {
    const { applicationName } = assertBodyString(request.body, [
      'applicationName',
    ]);

    const accessTokenPayload = request.body
      .accessTokenPayload as AccessTokenPayload;

    await createApplication(accessTokenPayload, applicationName);

    response.send({ message: 'Application created successfully' });
  }
);

const allHandler = withErrorHandler(
  async (request: Request, response: Response) => {
    const accessTokenPayload = request.body
      .accessTokenPayload as AccessTokenPayload;

    const applications = await getAllApplications(accessTokenPayload);

    response.send([...applications]);
  }
);

const getHandler = withErrorHandler(
  async (request: Request, response: Response) => {
    const { id } = request.params;

    const accessTokenPayload = request.body
      .accessTokenPayload as AccessTokenPayload;

    const application = await getSingleApplication(
      accessTokenPayload,
      id as string
    );

    response.send({ ...application });
  }
);

const mountApplicationRoutes = (app: Express) => {
  const router = express();

  router.post('/application/create', checkAccessToken, createHandler);
  router.get('/application/all', checkAccessToken, allHandler);
  router.get('/application/get/:id', checkAccessToken, getHandler);

  app.use(privateLimiter);
  app.use(router);
};

export { mountApplicationRoutes };
