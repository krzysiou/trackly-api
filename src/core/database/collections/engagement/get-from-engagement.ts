import type { Document, Filter } from 'mongodb';
import type { EngagementEvent } from './types';
import type { PaginationOptions } from '../types';

import { getCollections } from '../get-collections';

const getFromEngagement = async (
  queryObject: Filter<Document>,
  paginationOptions: PaginationOptions
): Promise<EngagementEvent[]> => {
  const { engagementCollection } = await getCollections();
  const { page, limit } = paginationOptions;

  return await engagementCollection
    .find(queryObject, { projection: { _id: 0 } })
    .sort({ date: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray();
};

export { getFromEngagement };
