import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { DrizzleService } from 'src/modules/libs/drizzle/services/drizzle.service';
import { CardRepository } from 'src/modules/cards/repositories';

@Injectable()
export class CreateCardService {
  constructor(
    private readonly repository: CardRepository,
    private readonly drizzleService: DrizzleService,
  ) {}

  async execute(idExternal: string) {
    if (!idExternal || typeof idExternal !== 'string') {
      throw new BadRequestException({
        error: 'MissingRequiredField',
        message: '"idExternal" must be sent with the payload as a string',
      });
    }
    return this.drizzleService.getDb().transaction(async (tx) => {
      await this.repository.save({ idExternal }, tx);
    });
  }
}
