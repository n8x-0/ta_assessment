export class ApiResponse<T> {
  constructor(
    public success: boolean,
    public data?: T,
    public message?: string,
    public statusCode?: number,
  ) {}

  static success<T>(
    data?: T,
    message?: string,
    statusCode: number = 200,
  ): ApiResponse<T> {
    return new ApiResponse<T>(true, data, message, statusCode);
  }

  static error(message?: string, statusCode: number = 400): ApiResponse<null> {
    return new ApiResponse<null>(false, null, message, statusCode);
  }
}
