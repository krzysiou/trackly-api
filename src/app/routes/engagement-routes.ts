import express from 'express';

import type { Express, Request, Response } from 'express';
import type { AccessTokenPayload } from '../../core/access-token/types';

import { withErrorHandler } from '../error-handler';
import { checkAccessToken } from '../../core/access-token/check-access-token';
import { privateLimiter } from '../../core/limiters/private-limtier';
import { assertBodyString } from '../../core/asserts/assert-body-string';
import { sendClickEvent } from '../../core/tracking/engagement/send-click-event';
import { getEngagamentEvent } from '../../core/tracking/engagement/get-event';
import { sendSubmitEvent } from '../../core/tracking/engagement/send-submit-event';
import { assertBodyObject } from '../../core/asserts/assert-body-object';
import { assertNavigationType } from '../../core/asserts/assert-navigation-type';

const clickHandler = withErrorHandler(
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

    assertNavigationType(eventPayload.navigationType);

    const accessTokenPayload = request.body
      .accessTokenPayload as AccessTokenPayload;

    await sendClickEvent(accessTokenPayload, eventPayload);

    response.send({ message: 'Event sent successfully' });
  }
);

const submitHandler = withErrorHandler(
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

    assertNavigationType(eventPayload.navigationType);

    const accessTokenPayload = request.body
      .accessTokenPayload as AccessTokenPayload;

    await sendSubmitEvent(accessTokenPayload, eventPayload);

    response.send({ message: 'Event sent successfully' });
  }
);

const getHandler = withErrorHandler(
  async (request: Request, response: Response) => {
    const { queryObject } = assertBodyObject(request.body, ['queryObject']);

    const accessTokenPayload = request.body
      .accessTokenPayload as AccessTokenPayload;

    const events = await getEngagamentEvent(accessTokenPayload, queryObject);

    response.send({ events });
  }
);

const mountEngagementRoutes = (app: Express) => {
  const router = express();

  router.post('/engagement/click', checkAccessToken, clickHandler);
  router.post('/engagement/submit', checkAccessToken, submitHandler);
  router.post('/engagement/get', checkAccessToken, getHandler);

  app.use(privateLimiter);
  app.use(router);
};

export { mountEngagementRoutes };
