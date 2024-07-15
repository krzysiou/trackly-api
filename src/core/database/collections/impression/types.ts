import type { Event, Page, Target } from '../types';

interface ImpressionEvent extends Event {
  type: 'Impression';
  action: 'view';
  target: Page | Target;
}

export type { ImpressionEvent };
