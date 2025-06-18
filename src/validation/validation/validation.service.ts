import { ZodType } from 'zod';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ValidationService {
  validate<T>(schema: ZodType, data: T): T {
    return schema.parse(data);
  }
}
