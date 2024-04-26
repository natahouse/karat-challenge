import { Module } from '@nestjs/common';
import { CardRepository, SqlCardRepository } from './repositories';
import { CardsController } from './cards.controller';
import { CreateCardService } from './services/create-card.service';
import { PaymentsModule } from '../payments/payments.module';
import {
  FetchCardPaymentsService,
  FetchCardPaymentsMetricsService,
  FetchCardPaymentsCategoriesService,
} from './services';
import { CacheManagerModule } from '../cache-manager/cache-manager.module';

@Module({
  controllers: [CardsController],
  providers: [
    CreateCardService,
    FetchCardPaymentsService,
    FetchCardPaymentsMetricsService,
    FetchCardPaymentsCategoriesService,
    { provide: CardRepository, useClass: SqlCardRepository },
  ],
  imports: [PaymentsModule, CacheManagerModule],
  exports: [{ provide: CardRepository, useClass: SqlCardRepository }],
})
export class CardsModule {}
