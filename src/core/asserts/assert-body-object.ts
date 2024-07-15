import { AssertionError } from 'assert';

const assertBodyObject = (
  body: Record<string, Record<string, string>>,
  fields: string[]
) => {
  const parsedResult: Record<string, Record<string, string>> = {};

  fields.forEach((field) => {
    if (!body[field]) {
      throw new AssertionError({
        message: `Field: '${field}' must be provided`,
      });
    }

    parsedResult[field] = body[field];
  });

  return parsedResult;
};

export { assertBodyObject };
