import { v4 as uuid } from 'uuid';

import type { NavigationType } from '../../database/collections/types';
import type { EngagementEvent } from '../../database/collections/engagement/types';

import { saveInEngagement } from '../../database/collections/engagement/save-in-engagement';
import { getfromApplications } from '../../database/collections/applications/get-from-applications';
import { NotFoundError } from '../../errors/notfound-error';

const sendClickEvent = async (eventPayload: Record<string, string>) => {
  const {
    applicationId,
    navigationType,
    actor,
    targetId,
    targetName,
    targetPageId,
    targetPageType,
    targetPageUrl,
  } = eventPayload;

  try {
    const application = (await getfromApplications({ id: applicationId }))[0];
    const date = new Date();

    const engagementEvent: EngagementEvent = {
      id: uuid(),
      type: 'Engagement',
      action: 'click',
      navigationType: navigationType as NavigationType,
      actor,
      date,
      applicationId: application.id,
      target: {
        id: `${application.name}:element:${targetId}`,
        name: targetName,
        page: {
          id: `${application.name}:page:${targetPageId}`,
          type: targetPageType,
          url: targetPageUrl,
        },
      },
    };

    await saveInEngagement(engagementEvent);
  } catch {
    throw new NotFoundError({
      message: `Application not found`,
    });
  }
};

export { sendClickEvent };
