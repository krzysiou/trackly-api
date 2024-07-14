import type { Config } from './types';

const { PORT, TOKEN_SECRET } = process.env;

const getConfig = (): Config => {
  const config: Config = {
    port: PORT || '3200',
    tokenSecret: TOKEN_SECRET as string,
  };

  return config;
};

export { getConfig };
