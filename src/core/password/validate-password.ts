import { AssertionError } from 'assert';

import { compareSync } from 'bcrypt-nodejs';

const validatePassword = async (
  password: string,
  validPassword: string
): Promise<void> => {
  const passwordMatching = await compareSync(password, validPassword);

  if (!passwordMatching) {
    throw new AssertionError({ message: 'Password is not correct' });
  }
};

export { validatePassword };
