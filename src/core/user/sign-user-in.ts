import { AssertionError } from 'assert';

import { v4 as uuid } from 'uuid';

import type { User } from './types';

import { users } from './types';
import { encodePassword } from '../password/encode-password';

const signUserIn = async (username: string, password: string) => {
  const userIsTaken = users.find((user) => user.username === username) as User;

  if (userIsTaken) {
    throw new AssertionError({
      message: `Username '${username}' is already taken`,
    });
  }

  const user: User = {
    id: uuid(),
    username,
    password: await encodePassword(password),
  };

  users.push(user);

  return user;
};

export { signUserIn };
