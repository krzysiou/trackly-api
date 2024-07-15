type AuthorizationErrorBody = {
  message: string;
};

class AuthorizationError extends Error {
  public code: number = 401;

  constructor(errorBody: AuthorizationErrorBody) {
    super(errorBody.message);
  }
}

export { AuthorizationError };
