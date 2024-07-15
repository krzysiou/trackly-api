import type { Document, Filter } from 'mongodb';
import type { EngagementEvent } from './types';

import { getCollections } from '../get-collections';

const getFromEngagement = async (
  queryObject: Filter<Document>
): Promise<EngagementEvent[]> => {
  const { engagementCollection } = await getCollections();

  return await engagementCollection
    .find(queryObject, { projection: { _id: 0 } })
    .toArray();
};

export { getFromEngagement };
