import express from 'express';

import type { Express, Request, Response } from 'express';
import type { AccessTokenPayload } from '../../core/access-token/types';

import { withErrorHandler } from '../error-handler';
import { checkAccessToken } from '../../core/access-token/check-access-token';
import { privateLimiter } from '../../core/limiters/private-limtier';
import { assertBodyString } from '../../core/asserts/assert-body-string';
import { assertBodyObject } from '../../core/asserts/assert-body-object';
import { sendPageEvent } from '../../core/tracking/impression/send-page-event';
import { sendElementEvent } from '../../core/tracking/impression/send-element-event';
import { getImpressionEvent } from '../../core/tracking/impression/get-event';

const pageHandler = withErrorHandler(
  async (request: Request, response: Response) => {
    const eventPayload = assertBodyString(request.body, [
      'navigationType',
      'actor',
      'targetId',
      'targetType',
      'targetUrl',
    ]);

    const accessTokenPayload = request.body
      .accessTokenPayload as AccessTokenPayload;

    await sendPageEvent(accessTokenPayload, eventPayload);

    response.send({ message: 'Event sent successfully' });
  }
);

const elementHandler = withErrorHandler(
  async (request: Request, response: Response) => {
    const eventPayload = assertBodyString(request.body, [
      'navigationType',
      'actor',
      'targetId',
      'targetName',
      'targetPageId',
      'targetPageType',
      'targetPageUrl',
    ]);

    const accessTokenPayload = request.body
      .accessTokenPayload as AccessTokenPayload;

    await sendElementEvent(accessTokenPayload, eventPayload);

    response.send({ message: 'Event sent successfully' });
  }
);

const getHandler = withErrorHandler(
  async (request: Request, response: Response) => {
    const { queryObject } = assertBodyObject(request.body, ['queryObject']);

    const accessTokenPayload = request.body
      .accessTokenPayload as AccessTokenPayload;

    const events = await getImpressionEvent(accessTokenPayload, queryObject);

    response.send({ events });
  }
);

const mountImpressionRoutes = (app: Express) => {
  const router = express();

  router.post('/impression/page', checkAccessToken, pageHandler);
  router.post('/impression/element', checkAccessToken, elementHandler);
  router.post('/impression/get', checkAccessToken, getHandler);

  app.use(privateLimiter);
  app.use(router);
};

export { mountImpressionRoutes };
