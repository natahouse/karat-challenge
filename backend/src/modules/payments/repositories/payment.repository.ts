import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class PaymentRepository {
  abstract findAll(): Promise<
    {
      id: string;
    }[]
  >;
}
