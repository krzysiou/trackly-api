import type { Collection } from 'mongodb';
import type { User } from './users/types';
import type { EngagementEvent } from './engagement/types';
import type { ImpressionEvent } from './impression/types';

import { connectToDatabase } from '../connect-to-database';

type DatabaseCollections = {
  usersCollection: Collection<User>;
  engagementCollection: Collection<EngagementEvent>;
  impressionCollection: Collection<ImpressionEvent>;
};

const getCollections = async () => {
  const database = await connectToDatabase();

  const databaseCollections: DatabaseCollections = {
    usersCollection: database.collection<User>('users'),
    engagementCollection: database.collection<EngagementEvent>('engagement'),
    impressionCollection: database.collection<ImpressionEvent>('impression'),
  };

  return databaseCollections;
};

export { getCollections };
