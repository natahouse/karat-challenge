import { Body, Controller, Logger, Post } from '@nestjs/common';
import { CreateCardService } from './services/create-card.service';

@Controller('cards')
export class CardsController {
  private readonly logger = new Logger(CardsController.name);

  constructor(private readonly createCardService: CreateCardService) {}

  @Post()
  async findAll(@Body() body) {
    return await this.createCardService.execute(body.idExternal);
  }
}
