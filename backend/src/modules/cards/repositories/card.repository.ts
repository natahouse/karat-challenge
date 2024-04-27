import { Injectable } from '@nestjs/common';
import { CardEntity } from '../entities/card.entity';
import { Transaction } from 'src/modules/libs/drizzle/types';

@Injectable()
export abstract class CardRepository {
  abstract findOne(id: string): Promise<CardEntity>;

  abstract findByExternalId(idExternal: string): Promise<CardEntity>;

  abstract save(
    card: Omit<CardEntity, 'id'>,
    tx?: Transaction,
  ): Promise<CardEntity>;
}
