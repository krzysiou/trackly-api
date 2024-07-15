import type { EngagementEvent } from './types';

import { getCollections } from '../get-collections';

const saveInEngagement = async (
  engagementEvent: EngagementEvent
): Promise<void> => {
  const { engagementCollection } = await getCollections();

  await engagementCollection.insertOne(engagementEvent);
};

export { saveInEngagement };
