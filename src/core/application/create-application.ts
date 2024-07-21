import { v4 as uuid } from 'uuid';

import type { Application } from '../database/collections/applications/types';
import type { AccessTokenPayload } from '../access-token/types';

import { saveInApplications } from '../database/collections/applications/save-in-applications';

const createApplication = async (
  accessTokenPayload: AccessTokenPayload,
  applicationName: string
) => {
  const ownerId = accessTokenPayload.id;
  const date = new Date().toLocaleString();

  const application: Application = {
    id: uuid(),
    name: applicationName,
    owner: ownerId,
    date,
  };

  await saveInApplications(application);
};

export { createApplication };
