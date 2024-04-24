import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { FetchAllAuthorizationsService } from './services/fetch-all-authorizations.service';
import { CreateAuthorizationsService } from './services';

@Controller('authorizations')
export class AuthorizationController {
  private readonly logger = new Logger(AuthorizationController.name);

  constructor(
    private readonly fetchAllAuthorizationsService: FetchAllAuthorizationsService,
    private readonly createAuthorizationsService: CreateAuthorizationsService,
  ) {}

  @Get()
  async findAll() {
    return await this.fetchAllAuthorizationsService.execute();
  }

  @Post()
  async create(@Body() body: any) {
    return await this.createAuthorizationsService.execute(body);
  }
}
