import { verify } from 'jsonwebtoken';

import type { NextFunction, Request, Response } from 'express';
import type { AccessTokenPayload } from './types';

import { getConfig } from '../../../config/config';
import { withErrorHandler } from '../../app/error-handler';

const { tokenSecret } = getConfig();

type AuthorizationErrorBody = {
  message: string;
};

class AuthorizationError extends Error {
  public code: number = 401;

  constructor(errorBody: AuthorizationErrorBody) {
    super(errorBody.message);
  }
}

const checkAccessToken = withErrorHandler(
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const token = request.headers.authorization as string;
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
