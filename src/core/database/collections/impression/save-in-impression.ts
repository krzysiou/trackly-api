import type { ImpressionEvent } from './types';

import { getCollections } from '../get-collections';

const saveInImpression = async (
  impressionEvent: ImpressionEvent
): Promise<void> => {
  const { impressionCollection } = await getCollections();

  await impressionCollection.insertOne(impressionEvent);
};

export { saveInImpression };
