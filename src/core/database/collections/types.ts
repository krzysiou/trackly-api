type Page = {
  id: string;
  type: string;
  url: string;
};

type Target = {
  id: string;
  name: string;
  page: Page;
};

type NavigationType = 'refresh' | 'navigation' | 'history' | 'unknown';

interface Event {
  id: string;
  type: 'Engagement' | 'Impression';
  navigationType: NavigationType;
  actor: string;
  date: string;
  ownerId: string;
}

export type { Event, NavigationType, Page, Target };
