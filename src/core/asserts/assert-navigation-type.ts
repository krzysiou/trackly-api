import { AssertionError } from 'assert';

const assertNavigationType = (navigationType: string) => {
  const availableTypes = [
    'navigation',
    'refresh',
    'back-forward',
    'prerender',
    'unknown',
  ];

  if (!availableTypes.includes(navigationType)) {
    throw new AssertionError({
      message: `Field: 'navigationType' must be one of 'navigation', 'refresh', 'history', 'unknown'`,
    });
  }
};

export { assertNavigationType };
