import type { Document, Filter } from 'mongodb';
import type { AccessTokenPayload } from '../../access-token/types';

import { getfromUsers } from '../../database/collections/users/get-from-users';
import { getFromImpression } from '../../database/collections/impression/get-from-impression';

const getImpressionEvent = async (
  accessTokenPayload: AccessTokenPayload,
  queryObject: Filter<Document>
) => {
  const owner = (await getfromUsers({ id: accessTokenPayload.id }))[0];

  return await getFromImpression({ ...queryObject, ownerId: owner.id });
};

export { getImpressionEvent };
