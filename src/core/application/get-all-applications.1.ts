import type { AccessTokenPayload } from '../access-token/types';

import { getfromApplications } from '../database/collections/applications/get-from-applications';

const getAllApplications = async (accessTokenPayload: AccessTokenPayload) => {
  const ownerId = accessTokenPayload.id;

  const applications = (await getfromApplications({})).filter(
    ({ owner }) => owner === ownerId
  );

  return applications;
};

export { getAllApplications };
