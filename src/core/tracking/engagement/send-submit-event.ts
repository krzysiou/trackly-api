import { v4 as uuid } from 'uuid';

import type { NavigationType } from '../../database/collections/types';
import type { EngagementEvent } from '../../database/collections/engagement/types';
import type { AccessTokenPayload } from '../../access-token/types';

import { saveInEngagement } from '../../database/collections/engagement/save-in-engagement';
import { getfromUsers } from '../../database/collections/users/get-from-users';

const sendSubmitEvent = async (
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

  const engagementEvent: EngagementEvent = {
    id: uuid(),
    type: 'Engagement',
    action: 'submit',
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

  await saveInEngagement(engagementEvent);
};

export { sendSubmitEvent };
