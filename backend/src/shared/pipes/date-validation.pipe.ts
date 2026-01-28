import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class DateValidationPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!value) {
      return value; // Allow undefined values to pass through
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(value)) {
      throw new BadRequestException(`
        Invalid date format for ${metadata.data}. Expected YYYY-MM-DD.`);
    }

    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new BadRequestException(`Invalid date value for ${metadata.data}.`);
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (date > today) {
      throw new BadRequestException(`
        Date cannot be in the future for ${metadata.data}.`);
    }

    return value;
  }
}
