import { Injectable } from '@nestjs/common';
import { DrizzleService } from 'src/modules/libs/drizzle/services/drizzle.service';

import { authorization } from 'src/modules/libs/drizzle/schema';
import { AuthorizationRepository } from './authorization.repository';
import { AuthorizationEntity } from '../entities/authorization.entity';
import { Transaction } from 'src/modules/libs/drizzle/types';
import { eq } from 'drizzle-orm';

@Injectable()
export class SqlAuthorizationRepository implements AuthorizationRepository {
  private schema = authorization;

  constructor(private readonly drizzleService: DrizzleService) {}

  async findAll() {
    const db = this.drizzleService.getDb();

    return await db.select({ id: this.schema.id }).from(this.schema);
  }

  async findOne(id: string) {
    const db = this.drizzleService.getDb();

    const [authorization] = await db
      .select({
        idExternal: this.schema.idExternal,
        id: this.schema.id,
        approved: this.schema.approved,
        idCard: this.schema.idCard,
      })
      .from(this.schema)
      .where(eq(this.schema.id, id))
      .limit(1);

    return authorization;
  }

  async findByExternalId(idExternal: string) {
    const db = this.drizzleService.getDb();

    const [authorization] = await db
      .select({
        idExternal: this.schema.idExternal,
        id: this.schema.id,
        approved: this.schema.approved,
        idCard: this.schema.idCard,
      })
      .from(this.schema)
      .where(eq(this.schema.idExternal, idExternal))
      .limit(1);

    return authorization;
  }

  async save(authorization: AuthorizationEntity, tx?: Transaction) {
    const dbContext = tx ?? this.drizzleService.getDb();
    const [entity] = await dbContext
      .insert(this.schema)
      .values({
        idCard: authorization.idCard,
        idExternal: authorization.idExternal,
        approved: authorization.approved,
      })
      .returning({
        id: this.schema.id,
      });

    return entity;
  }
}
