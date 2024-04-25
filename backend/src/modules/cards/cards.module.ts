import { Module } from '@nestjs/common';
import { CardRepository, SqlCardRepository } from './repositories';
import { CardsController } from './cards.controller';
import { CreateCardService } from './services/create-card.service';
import { PaymentsModule } from '../payments/payments.module';
import {
  FetchCardPaymentsService,
  FetchCardPaymentsMetricsService,
} from './services';

@Module({
  controllers: [CardsController],
  providers: [
    CreateCardService,
    FetchCardPaymentsService,
    FetchCardPaymentsMetricsService,
    { provide: CardRepository, useClass: SqlCardRepository },
  ],
  imports: [PaymentsModule],
  exports: [{ provide: CardRepository, useClass: SqlCardRepository }],
})
export class CardsModule {}
