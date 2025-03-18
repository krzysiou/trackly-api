import type { Document, Filter } from 'mongodb';
import type { AccessTokenPayload } from '../../access-token/types';
import type { PaginationOptions } from '../../database/collections/types';

import { getFromImpression } from '../../database/collections/impression/get-from-impression';
import { getAllApplications } from '../../application/get-all-applications.1';
import { AuthorizationError } from '../../errors/authorization-error';

const getImpressionEvent = async (
  applicationId: string,
  queryObject: Filter<Document>,
  paginationOptions: PaginationOptions,
  accessTokenPayload: AccessTokenPayload
) => {
  const applications = await getAllApplications(accessTokenPayload);

  const belongsToUser = applications.find(({ id }) => id === applicationId);

  if (!belongsToUser) {
    throw new AuthorizationError({
      message: 'You are not authorized to view this content',
    });
  }

  return await getFromImpression(
    { ...queryObject, applicationId },
    paginationOptions
  );
};

export { getImpressionEvent };
