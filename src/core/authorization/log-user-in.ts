import { AssertionError } from 'assert';

import { validatePassword } from './password/validate-password';
import { getfromUsers } from '../database/collections/users/get-from-users';

const logUserIn = async (username: string, password: string) => {
  const user = (await getfromUsers({ username }))[0];

  if (!user) {
    throw new AssertionError({
      message: `User not found`,
    });
  }

  await validatePassword(password, user.password);

  return user;
};

export { logUserIn };
