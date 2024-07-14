import type { Config } from './types';

const { PORT } = process.env;

const getConfig = (): Config => {
  const config: Config = {
    port: PORT || '3200',
  };

  return config;
};

export { getConfig };
