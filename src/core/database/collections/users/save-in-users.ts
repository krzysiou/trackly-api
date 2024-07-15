import type { User } from './types';

import { getCollections } from '../get-collections';

const saveInUsers = async (user: User): Promise<void> => {
  const { usersCollection } = await getCollections();

  await usersCollection.insertOne(user);
};

export { saveInUsers };
