export class CustomAPIError extends Error {
  public statusCode?: number;

  constructor(message: string) {
    super(message);
  }
}