import { MongoClient, ServerApiVersion } from 'mongodb';

import { getConfig } from '../../../config/config';

const {
  database: { databaseConnectionString },
} = getConfig();

const mongoClient = new MongoClient(databaseConnectionString, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: false,
    deprecationErrors: true,
  },
});

export { mongoClient };
