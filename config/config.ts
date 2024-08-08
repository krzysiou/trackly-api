import type { Config, DatabaseConfig } from './types';

const {
  PORT,
  TOKEN_SECRET,
  DB_CONNECTION_STRING,
  DB_NAME,
  DISABLE_RATE_LIMIT,
  SESSION_COOKIE_NAME,
  ORIGIN,
} = process.env;

const getConfig = (): Config => {
  const databaseConfig: DatabaseConfig = {
    databaseName: DB_NAME || 'Trackly',
    databaseConnectionString: DB_CONNECTION_STRING as string,
  };

  const config: Config = {
    port: PORT || '3200',
    tokenSecret: TOKEN_SECRET as string,
    origin: ORIGIN || '*',
    disableRateLimit: DISABLE_RATE_LIMIT === 'true' || false,
    sessionCookieName: SESSION_COOKIE_NAME || 'session',
    database: databaseConfig,
  };

  return config;
};

export { getConfig };
