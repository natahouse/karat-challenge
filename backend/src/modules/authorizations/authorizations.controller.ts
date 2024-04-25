import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import {
  CreateAuthorizationFromEventService,
  FetchAllAuthorizationsService,
} from './services';

@Controller('authorizations')
export class AuthorizationController {
  private readonly logger = new Logger(AuthorizationController.name);

  constructor(
    private readonly fetchAllAuthorizationsService: FetchAllAuthorizationsService,
    private readonly createAuthorizationFromEventService: CreateAuthorizationFromEventService,
  ) {}

  @Get()
  async findAll() {
    return await this.fetchAllAuthorizationsService.execute();
  }

  // TODO: Remove after integration
  @Post()
  async create(@Body() body: any) {
    return await this.createAuthorizationFromEventService.execute(body);
  }
}
