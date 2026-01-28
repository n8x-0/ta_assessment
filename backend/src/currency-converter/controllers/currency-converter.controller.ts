import {
  Controller,
  Get,
  Query,
  Logger,
  HttpCode,
  HttpStatus as NestHttpStatus,
  ValidationPipe,
} from '@nestjs/common';
import { ApiResponse } from '../../shared/dtos/api-response.dto';
import { CurrencyConverterService } from '../services/currency-converter.service';
import { GetExchangeRateDto } from '../dto/get-exchange-rate.dto';

@Controller('currency-converter')
export class CurrencyConverterController {
  private readonly logger = new Logger(CurrencyConverterController.name);

  constructor(
    private readonly currencyConverterService: CurrencyConverterService,
  ) {}

  @Get('currencies')
  @HttpCode(NestHttpStatus.OK)
  async getCurrencies(): Promise<ApiResponse<any>> {
    const data = await this.currencyConverterService.getCurrencies();

    return ApiResponse.success(
      data,
      'Currencies retrieved successfully',
      NestHttpStatus.OK,
    );
  }

  @Get('exchange-rate')
  @HttpCode(NestHttpStatus.OK)
  async getExchangeRate(
    @Query(ValidationPipe) query: GetExchangeRateDto,
  ): Promise<ApiResponse<any>> {
    this.logger.log('getExchangeRate called');
    const { base_currency, currency, date } = query;
    const data = await this.currencyConverterService.getExchangeRate(base_currency, currency, date);
    return ApiResponse.success(
      data,
      'Exchange rate retrieved successfully',
      NestHttpStatus.OK,
    );
  }
}
