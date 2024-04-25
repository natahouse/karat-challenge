import { Injectable } from '@nestjs/common';
import { CardEntity } from '../entities/card.entity';
import { Transaction } from 'src/modules/libs/drizzle/types';

@Injectable()
export abstract class CardRepository {
  abstract findByExternalId(idExternal: string): Promise<CardEntity>;

  abstract save(card: Omit<CardEntity, 'id'>, tx?: Transaction): Promise<void>;
}
