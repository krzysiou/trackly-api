import type { Document, Filter } from 'mongodb';
import type { Application } from './types';

import { getCollections } from '../get-collections';

const getfromApplications = async (
  queryObject: Filter<Document>
): Promise<Application[]> => {
  const { applicatonsCollection } = await getCollections();

  return await applicatonsCollection
    .find(queryObject, { projection: { _id: 0 } })
    .toArray();
};

export { getfromApplications };
