import { v4 as uuid } from 'uuid';

import type { NavigationType } from '../../database/collections/types';
import type { AccessTokenPayload } from '../../access-token/types';
import type { ImpressionEvent } from '../../database/collections/impression/types';

import { getfromUsers } from '../../database/collections/users/get-from-users';
import { saveInImpression } from '../../database/collections/impression/save-in-impression';

const sendElementEvent = async (
  accessTokenPayload: AccessTokenPayload,
  eventPayload: Record<string, string>
) => {
  const {
    navigationType,
    actor,
    targetId,
    targetName,
    targetPageId,
    targetPageType,
    targetPageUrl,
  } = eventPayload;

  const owner = (await getfromUsers({ id: accessTokenPayload.id }))[0];
  const date = new Date().toLocaleString();

  const engagementEvent: ImpressionEvent = {
    id: uuid(),
    type: 'Impression',
    action: 'view',
    navigationType: navigationType as NavigationType,
    actor,
    date,
    ownerId: owner.id,
    target: {
      id: `${owner.username}:element:${targetId}`,
      name: targetName,
      page: {
        id: `${owner.username}:page:${targetPageId}`,
        type: targetPageType,
        url: targetPageUrl,
      },
    },
  };

  await saveInImpression(engagementEvent);
};

export { sendElementEvent };
