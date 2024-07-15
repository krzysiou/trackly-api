import { genSaltSync, hashSync } from 'bcrypt-nodejs';

const encodePassword = async (password: string): Promise<string> => {
  const salt = genSaltSync(10);
  const encodedPassword = await hashSync(password, salt);

  return encodedPassword;
};

export { encodePassword };
