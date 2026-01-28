import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { ApiError } from '../../shared/exceptions/api-error.exception';
import 'dotenv/config';

interface IExchangeRate {
  data: {
    [date: string]: {
      [currency: string]: number;
    };
  };
}

interface ICurrencies {
  data: {
    [currency: string]: string;
  };
}
@Injectable()
export class CurrencyConverterService {
  private readonly logger = new Logger(CurrencyConverterService.name);
  private readonly API_KEY = process.env.CURRENCY_API_KEY || '';
  private readonly BASE_URL = process.env.BASE_URL || '';

  private isTodaysDate(date: string): boolean {
    const today = new Date().toISOString().slice(0, 10);
    // if incoming date equals today's date, return false
    if (date === today) return false;
    return true;
  }

  async getCurrencies(): Promise<any> {
    try {
      const url = `${this.BASE_URL}/currencies?apikey=${this.API_KEY}`;
      const response = await axios.get<ICurrencies>(url);
      return response.data.data;
    } catch (error) {
      this.logger.error(`Error fetching currencies: ${error.message}`);
      throw new ApiError(
        error.response?.data?.message || 'Failed to fetch currencies',
        error.response?.status || 500,
      );
    }
  }

  async getExchangeRate(
    baseCurrency: string,
    currency: string,
    date?: string,
  ): Promise<any> {
    try {
      let url: string;
      if (date && this.isTodaysDate(date)) {
        url = `${this.BASE_URL}/historical?apikey=${this.API_KEY}&base_currency=${baseCurrency}&currencies=${currency}&date=${date}`;
        const response = await axios.get<IExchangeRate>(url);
        const result = response.data;
        return result?.data[date];
      } else {
        url = `${this.BASE_URL}/latest?apikey=${this.API_KEY}&base_currency=${baseCurrency}&currencies=${currency}`;
        const response = await axios.get<IExchangeRate>(url);
        return response.data?.data;
      }
    } catch (error) {
      this.logger.error(`Error fetching exchange rate: ${error.message}`);
      throw new ApiError(
        error.response?.data?.message || 'Failed to fetch exchange rate',
        error.response?.status || 500,
      );
    }
  }
}
