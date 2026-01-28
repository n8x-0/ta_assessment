import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiResponse } from '../dtos/api-response.dto';
import { ApiError } from '../exceptions/api-error.exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let apiResponse: ApiResponse<null>;

    if (exception instanceof ApiError) {
      apiResponse = ApiResponse.error(exception.message, exception.statusCode);
    } else if (exception instanceof HttpException) {
      apiResponse = ApiResponse.error(exception.message, exception.getStatus());
    } else {
      // For unexpected errors, return a generic message
      apiResponse = ApiResponse.error(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    response.status(apiResponse.statusCode || 500).json({
      success: apiResponse.success,
      message: apiResponse.message,
      data: apiResponse.data,
    });
  }
}
