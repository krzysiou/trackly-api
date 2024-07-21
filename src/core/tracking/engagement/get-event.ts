import type { Document, Filter } from 'mongodb';
import type { AccessTokenPayload } from '../../access-token/types';

import { getFromEngagement } from '../../database/collections/engagement/get-from-engagement';
import { getAllApplications } from '../../application/get-all-applications.1';
import { AuthorizationError } from '../../errors/authorization-error';

const getEngagamentEvent = async (
  applicationId: string,
  queryObject: Filter<Document>,
  accessTokenPayload: AccessTokenPayload
) => {
  const applications = await getAllApplications(accessTokenPayload);

  const belongsToUser = applications.find(({ id }) => id === applicationId);

  if (!belongsToUser) {
    throw new AuthorizationError({
      message: 'You are not authorized to view this content',
    });
  }

  return await getFromEngagement({ ...queryObject, applicationId });
};

export { getEngagamentEvent };
