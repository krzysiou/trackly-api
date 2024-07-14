type RateLimitErrorBody = {
  message: string;
};

class RateLimitError extends Error {
  public code: number = 429;

  constructor(errorBody: RateLimitErrorBody) {
    super(errorBody.message);
  }
}

export { RateLimitError };
