import { Injectable } from '@nestjs/common';
import { DrizzleService } from 'src/modules/libs/drizzle/services/drizzle.service';

import { card } from 'src/modules/libs/drizzle/schema';
import { CardRepository } from './card.repository';
import { eq } from 'drizzle-orm';
import { CardEntity } from '../entities/card.entity';
import { Transaction } from 'src/modules/libs/drizzle/types';

@Injectable()
export class SqlCardRepository implements CardRepository {
  private schema = card;

  constructor(private readonly drizzleService: DrizzleService) {}

  async save(card: Omit<CardEntity, 'id'>, tx?: Transaction) {
    const dbContext = tx ?? this.drizzleService.getDb();

    await dbContext.insert(this.schema).values({
      idExternal: card.idExternal,
    });
  }

  async findOne(id: string) {
    const db = this.drizzleService.getDb();

    const [card] = await db
      .select({ id: this.schema.id, idExternal: this.schema.idExternal })
      .from(this.schema)
      .where(eq(this.schema.id, id))
      .limit(1);

    return card;
  }

  async findByExternalId(idExternal: string) {
    const db = this.drizzleService.getDb();

    const [card] = await db
      .select({ id: this.schema.id, idExternal: this.schema.idExternal })
      .from(this.schema)
      .where(eq(this.schema.idExternal, idExternal))
      .limit(1);

    return card;
  }
}
