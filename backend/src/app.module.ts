import { Module } from '@nestjs/common';

import { StripeEventsModule } from './modules/stripe-events/stripe-events.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StripeModule } from './modules/libs';

@Module({
  imports: [StripeEventsModule, ConfigModule.forRoot({isGlobal: true}), StripeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get<string>('STRIPE_API_KEY'),
        options: {
          apiVersion: '2024-04-10',
        },
      }),
    }),],
  controllers: [],
  providers: [],
})
export class AppModule {}
