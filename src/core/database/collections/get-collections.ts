import type { Collection } from 'mongodb';
import type { User } from './users/types';

import { connectToDatabase } from '../connect-to-database';

type DatabaseCollections = {
  usersCollection: Collection<User>;
};

const getCollections = async () => {
  const database = await connectToDatabase();

  const databaseCollections: DatabaseCollections = {
    usersCollection: database.collection<User>('users'),
  };

  return databaseCollections;
};

export { getCollections };
