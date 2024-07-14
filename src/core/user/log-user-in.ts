import { AssertionError } from 'assert';

import type { User } from './types';

import { users } from './types';
import { validatePassword } from '../password/validate-password';

const logUserIn = async (username: string, password: string) => {
  const user = users.find((user) => user.username === username) as User;

  if (!user) {
    throw new AssertionError({
      message: `User not found`,
    });
  }

  await validatePassword(password, user.password);

  return user;
};

export { logUserIn };
