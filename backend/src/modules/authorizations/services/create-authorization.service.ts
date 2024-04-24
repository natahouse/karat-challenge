import { Injectable, NotFoundException } from '@nestjs/common';
import { AuthorizationRepository } from '../repositories';
import { AuthorizationEntity } from '../entities/authorization.entity';
import { DrizzleService } from 'src/modules/libs/drizzle/services/drizzle.service';

@Injectable()
export class CreateAuthorizationsService {
  constructor(
    private readonly repository: AuthorizationRepository,
    private readonly drizzleService: DrizzleService,
  ) {}

  async execute(entity: AuthorizationEntity) {
    return this.drizzleService.getDb().transaction(async (tx) => {
      await this.repository.save(entity, tx);
    });
  }
}
