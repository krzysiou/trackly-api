import { v4 as uuid } from 'uuid';

import type { NavigationType } from '../../database/collections/types';
import type { ImpressionEvent } from '../../database/collections/impression/types';

import { saveInImpression } from '../../database/collections/impression/save-in-impression';
import { getfromApplications } from '../../database/collections/applications/get-from-applications';
import { NotFoundError } from '../../errors/notfound-error';

const sendPageEvent = async (eventPayload: Record<string, string>) => {
  const {
    applicationId,
    navigationType,
    actor,
    targetId,
    targetType,
    targetUrl,
  } = eventPayload;
  try {
    const application = (await getfromApplications({ id: applicationId }))[0];
    const date = new Date();

    const engagementEvent: ImpressionEvent = {
      id: uuid(),
      type: 'Impression',
      action: 'view',
      navigationType: navigationType as NavigationType,
      actor,
      date,
      applicationId: application.id,
      target: {
        id: `${application.name}:page:${targetId}`,
        type: targetType,
        url: targetUrl,
      },
    };

    await saveInImpression(engagementEvent);
  } catch {
    throw new NotFoundError({
      message: `Application not found`,
    });
  }
};

export { sendPageEvent };
