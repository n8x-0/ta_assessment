import { Module } from '@nestjs/common';
import { CurrencyConverterController } from './controllers/currency-converter.controller';
import { CurrencyConverterService } from './services/currency-converter.service';

@Module({
  controllers: [CurrencyConverterController],
  providers: [CurrencyConverterService],
  exports: [CurrencyConverterService], // Export if other modules need to use this service
})
export class CurrencyConverterModule {}
