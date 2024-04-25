import { Module } from '@nestjs/common';
import { CardRepository, SqlCardRepository } from './repositories';
import { CardsController } from './cards.controller';
import { CreateCardService } from './services/create-card.service';

@Module({
  controllers: [CardsController],
  providers: [
    CreateCardService,
    { provide: CardRepository, useClass: SqlCardRepository },
  ],
  exports: [{ provide: CardRepository, useClass: SqlCardRepository }],
})
export class CardsModule {}
