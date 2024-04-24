import { Injectable } from '@nestjs/common';
import { DrizzleService } from 'src/modules/libs/drizzle/services/drizzle.service';

import { authorization } from 'src/modules/libs/drizzle/schema';
import { AuthorizationRepository } from './authorization.repository';
import { AuthorizationEntity } from '../entities/authorization.entity';
import { Transaction } from 'src/modules/libs/drizzle/types';

@Injectable()
export class SqlAuthorizationRepository implements AuthorizationRepository {
  private schema = authorization;

  constructor(private readonly drizzleService: DrizzleService) {}

  async findAll() {
    const db = this.drizzleService.getDb();

    return await db.select({ id: this.schema.id }).from(this.schema);
  }

  async save(authorization: AuthorizationEntity, tx?: Transaction) {
    const dbContext = tx ?? this.drizzleService.getDb();
    await dbContext
      .insert(this.schema)
      .values({
        idCard: authorization.idCard,
        idExternal: authorization.idExternal,
        status: authorization.status,
      })
      .returning({ idUser: this.schema.id });
  }
}
