import { HttpStatus } from '../enums/http-status.enum';

export class ApiError extends Error {
  constructor(
    public message: string,
    public statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
    public isOperational: boolean = true,
  ) {
    super(message);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }

    // Set the name of the error constructor
    this.name = this.constructor.name;
  }
}
