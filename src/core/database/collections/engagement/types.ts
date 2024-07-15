import type { Event } from '../types';

interface EngagementEvent extends Event {
  type: 'Engagement';
  action: 'click' | 'submit';
}

export type { EngagementEvent };
