import { BadRequestException, Injectable } from '@nestjs/common';

import { CardRepository } from 'src/modules/cards/repositories';

@Injectable()
export class FetchCardByExternalIdService {
  constructor(private readonly repository: CardRepository) {}

  async execute(idExternal: string) {
    if (!idExternal || typeof idExternal !== 'string') {
      throw new BadRequestException({
        error: 'MissingRequiredField',
        message: '"idExternal" must be sent with the payload as a string',
      });
    }

    return await this.repository.findByExternalId(idExternal);
  }
}
