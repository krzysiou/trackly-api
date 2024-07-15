import type { Document, Filter } from 'mongodb';
import type { AccessTokenPayload } from '../../access-token/types';

import { getfromUsers } from '../../database/collections/users/get-from-users';
import { getFromEngagement } from '../../database/collections/engagement/get-from-engagement';

const getEngagamentEvent = async (
  accessTokenPayload: AccessTokenPayload,
  queryObject: Filter<Document>
) => {
  const owner = (await getfromUsers({ id: accessTokenPayload.id }))[0];

  return await getFromEngagement({ ...queryObject, ownerId: owner.id });
};

export { getEngagamentEvent };
