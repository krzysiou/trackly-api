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
import { assertNavigationType } from '../../core/asserts/assert-navigation-type';
import { publicLimiter } from '../../core/limiters/public-limiter';

const pageHandler = withErrorHandler(
  async (request: Request, response: Response) => {
    const eventPayload = assertBodyString(request.body, [
      'applicationId',
      'navigationType',
      'actor',
      'targetId',
      'targetType',
      'targetUrl',
    ]);

    assertNavigationType(eventPayload.navigationType);

    await sendPageEvent(eventPayload);

    response.send({ message: 'Event sent successfully' });
  }
);

const elementHandler = withErrorHandler(
  async (request: Request, response: Response) => {
    const eventPayload = assertBodyString(request.body, [
      'applicationId',
      'navigationType',
      'actor',
      'targetId',
      'targetName',
      'targetPageId',
      'targetPageType',
      'targetPageUrl',
    ]);

    assertNavigationType(eventPayload.navigationType);

    await sendElementEvent(eventPayload);

    response.send({ message: 'Event sent successfully' });
  }
);

const getHandler = withErrorHandler(
  async (request: Request, response: Response) => {
    const { applicationId } = assertBodyString(request.body, ['applicationId']);
    const { queryObject } = assertBodyObject(request.body, ['queryObject']);

    const accessTokenPayload = request.body
      .accessTokenPayload as AccessTokenPayload;

    const events = await getImpressionEvent(
      applicationId,
      queryObject,
      accessTokenPayload
    );

    response.send({ events });
  }
);

const mountImpressionRoutes = (app: Express) => {
  const router = express();

  router.post('/impression/page', publicLimiter, pageHandler);
  router.post('/impression/element', publicLimiter, elementHandler);
  router.post('/impression/get', privateLimiter, checkAccessToken, getHandler);

  app.use(router);
};

export { mountImpressionRoutes };
