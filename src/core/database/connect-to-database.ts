import type { Db } from 'mongodb';

import { getConfig } from '../../../config/config';
import { mongoClient } from './mongo-client';

const {
  database: { databaseName },
} = getConfig();

let database: Db;

const connectToDatabase = async () => {
  if (database) {
    return database;
  }

  let conn;

  try {
    conn = await mongoClient.connect();
  } catch (error) {
    console.error(error);
  }

  database = conn!.db(databaseName);

  return database;
};

export { connectToDatabase };
