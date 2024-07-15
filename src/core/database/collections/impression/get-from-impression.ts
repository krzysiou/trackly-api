import type { Document, Filter } from 'mongodb';
import type { ImpressionEvent } from './types';

import { getCollections } from '../get-collections';

const getFromImpression = async (
  queryObject: Filter<Document>
): Promise<ImpressionEvent[]> => {
  const { impressionCollection } = await getCollections();

  return await impressionCollection
    .find(queryObject, { projection: { _id: 0 } })
    .toArray();
};

export { getFromImpression };
