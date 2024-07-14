import rateLimit from 'express-rate-limit';

import { withErrorHandler } from '../../app/error-handler';
import { RateLimitError } from './rate-limit-error';
import { getConfig } from '../../../config/config';

const { disableRateLimit } = getConfig();

const MINUTES = 5;
const LIMIT = 1200;

const privateLimiter = rateLimit({
  windowMs: MINUTES * 60 * 1000,
  limit: LIMIT,
  standardHeaders: true,
  legacyHeaders: false,
  skip: () => disableRateLimit,
  handler: withErrorHandler(() => {
    throw new RateLimitError({
      message: 'Rate limit has been reached',
    });
  }),
});

export { privateLimiter };
