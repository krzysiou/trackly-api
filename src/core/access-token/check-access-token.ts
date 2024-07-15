import { verify } from 'jsonwebtoken';

import type { NextFunction, Request, Response } from 'express';
import type { AccessTokenPayload } from './types';

import { getConfig } from '../../../config/config';
import { withErrorHandler } from '../../app/error-handler';
import { AuthorizationError } from '../errors/authorization-error';

const { tokenSecret, sessionCookieName } = getConfig();

const checkAccessToken = withErrorHandler(
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const token = request.cookies[sessionCookieName] as string;
      const { id, username } = verify(token, tokenSecret) as AccessTokenPayload;

      request.body.accessTokenPayload = { id, username };

      next();
    } catch {
      throw new AuthorizationError({
        message: 'You are not authorized to view this content',
      });
    }
  }
);

export { checkAccessToken };
