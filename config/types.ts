type DatabaseConfig = {
  databaseName: string;
  databaseConnectionString: string;
};

type Config = {
  readonly port: string;
  readonly tokenSecret: string;
  readonly disableRateLimit: boolean;
  readonly database: DatabaseConfig;
};

export type { Config, DatabaseConfig };
