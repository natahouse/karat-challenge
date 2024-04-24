import { Injectable } from '@nestjs/common';
import { AuthorizationEntity } from '../entities/authorization.entity';
import { Transaction } from 'src/modules/libs/drizzle/types';

@Injectable()
export abstract class AuthorizationRepository {
  abstract findAll(): Promise<
    {
      id: string;
    }[]
  >;

  abstract save(
    authorization: AuthorizationEntity,
    tx: Transaction,
  ): Promise<void>;
}
