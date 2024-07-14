import type { Config } from './types';

const { PORT, TOKEN_SECRET, DISABLE_RATE_LIMIT } = process.env;

const getConfig = (): Config => {
  const config: Config = {
    port: PORT || '3200',
    tokenSecret: TOKEN_SECRET as string,
    disableRateLimit: DISABLE_RATE_LIMIT === 'true' || false,
  };

  return config;
};

export { getConfig };
