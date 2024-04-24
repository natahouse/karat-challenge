import { Injectable } from '@nestjs/common';
import { AuthorizationRepository } from '../repositories';

@Injectable()
export class FetchAllAuthorizationsService {
  constructor(private readonly repository: AuthorizationRepository) {}

  async execute() {
    return await this.repository.findAll();
  }
}
