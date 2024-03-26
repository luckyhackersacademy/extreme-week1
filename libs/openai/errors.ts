export class CannotParseResponse extends Error {
  constructor() {
    super("cannot parse response");
  }
}

export class EmptyContentError extends Error {
  constructor() {
    super("empty content");
  }
}

export class DefaultServerError extends Error {
  constructor(errorMessage: string) {
    super(`server error: ${errorMessage}`);
  }
}
