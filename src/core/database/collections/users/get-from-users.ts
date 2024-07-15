import type { Document, Filter } from 'mongodb';
import type { User } from './types';

import { getCollections } from '../get-collections';

const getfromUsers = async (queryObject: Filter<Document>): Promise<User[]> => {
  const { usersCollection } = await getCollections();

  return await usersCollection
    .find(queryObject, { projection: { _id: 0 } })
    .toArray();
};

export { getfromUsers };
