import type { NextFunction, Request, Response } from 'express';

type RequestHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => Promise<void>;

const isError = (error: unknown): error is Error => error instanceof Error;

const getErrorMessage = (error: unknown): string | unknown =>
  isError(error) ? error.message : error;

const isErrorWithCode = (
  error: unknown
): error is Error & { code: string | number } =>
  typeof error === 'object' && error !== null && 'code' in error;

const isErrorWithCodeNumber = (
  error: unknown
): error is Error & { code: number } =>
  isErrorWithCode(error) && typeof error.code === 'number';

const withErrorHandler =
  (handler: RequestHandler): RequestHandler =>
  async (request, response, next) => {
    try {
      await handler(request, response, next);
    } catch (error) {
      if (isErrorWithCode(error) && error.code === 'ERR_ASSERTION') {
        const message = `Assertion error: ${getErrorMessage(error)}`;

        response.status(400).send({ message });

        return;
      }

      if (isErrorWithCodeNumber(error) && error.code === 404) {
        const message = `NotFound error: ${getErrorMessage(error)}`;

        response.status(404).send({ message });

        return;
      }

      if (isErrorWithCodeNumber(error) && error.code === 401) {
        const message = `Unauthorized error: ${getErrorMessage(error)}`;

        response.status(401).send({ message });

        return;
      }

      const message = `Internal error: ${getErrorMessage(error)}`;

      response.status(500).send({ message });

      return;
    }
  };

export { withErrorHandler };
