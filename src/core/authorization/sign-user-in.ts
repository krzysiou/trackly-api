import { AssertionError } from 'assert';

import { v4 as uuid } from 'uuid';

import type { User } from '../database/collections/users/types';

import { encodePassword } from './password/encode-password';
import { getfromUsers } from '../database/collections/users/get-from-users';
import { saveInUsers } from '../database/collections/users/save-in-users';

const signUserIn = async (username: string, password: string) => {
  const userIsTaken = (await getfromUsers({ username }))[0];

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

  await saveInUsers(user);

  return user;
};

export { signUserIn };
