import type { Application } from './types';

import { getCollections } from '../get-collections';

const saveInApplications = async (application: Application): Promise<void> => {
  const { applicatonsCollection } = await getCollections();

  await applicatonsCollection.insertOne(application);
};

export { saveInApplications };
