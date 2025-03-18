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
  date: Date;
  applicationId: string;
}

type PaginationOptions = {
  page: number;
  limit: number;
};

export type { Event, NavigationType, Page, Target, PaginationOptions };
