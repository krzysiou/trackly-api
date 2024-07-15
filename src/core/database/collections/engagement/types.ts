import type { Event, Target } from '../types';

interface EngagementEvent extends Event {
  type: 'Engagement';
  action: 'click' | 'submit';
  target: Target;
}

export type { EngagementEvent };
