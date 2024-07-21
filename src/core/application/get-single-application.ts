import type { AccessTokenPayload } from '../access-token/types';

import { getfromApplications } from '../database/collections/applications/get-from-applications';

const getSingleApplication = async (
  accessTokenPayload: AccessTokenPayload,
  applicationId: string
) => {
  const ownerId = accessTokenPayload.id;

  const applications = (await getfromApplications({})).filter(
    ({ owner }) => owner === ownerId
  );

  const application = applications.find(({ id }) => id === applicationId);

  return application;
};

export { getSingleApplication };
