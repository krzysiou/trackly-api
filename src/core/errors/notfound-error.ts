type NotFoundErrorBody = {
  message: string;
};

class NotFoundError extends Error {
  public code: number = 404;

  constructor(errorBody: NotFoundErrorBody) {
    super(errorBody.message);
  }
}

export { NotFoundError };
