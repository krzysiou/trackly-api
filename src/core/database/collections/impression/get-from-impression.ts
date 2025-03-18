import type { Document, Filter } from 'mongodb';
import type { ImpressionEvent } from './types';
import type { PaginationOptions } from '../types';

import { getCollections } from '../get-collections';

const getFromImpression = async (
  queryObject: Filter<Document>,
  paginationOptions: PaginationOptions
): Promise<ImpressionEvent[]> => {
  const { impressionCollection } = await getCollections();
  const { page, limit } = paginationOptions;

  return await impressionCollection
    .find(queryObject, { projection: { _id: 0 } })
    .sort({ date: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray();
};

export { getFromImpression };
