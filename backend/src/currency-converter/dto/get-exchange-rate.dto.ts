import {
  IsNotEmpty,
  IsString,
  IsOptional,
} from 'class-validator';

export class GetExchangeRateDto {
  @IsNotEmpty()
  @IsString()
  base_currency: string;

  @IsNotEmpty()
  @IsString()
  currency: string;

  @IsOptional()
  @IsString()
  date?: string;
}
