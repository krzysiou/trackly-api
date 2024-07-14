import { sign } from 'jsonwebtoken';

import type { AccessTokenPayload } from './types';
import type { User } from '../user/types';

import { getConfig } from '../../../config/config';

const { tokenSecret } = getConfig();

const generateAccessToken = (user: User) => {
  const { id, username } = user;

  const accessTokenPayload: AccessTokenPayload = {
    id,
    username,
  };

  return sign(accessTokenPayload, tokenSecret);
};

export { generateAccessToken };
