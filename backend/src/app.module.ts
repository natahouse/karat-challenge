import { Module } from '@nestjs/common';

import { StripeEventsModule } from './modules/stripe-events/stripe-events.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StripeModule } from './modules/libs/stripe/stripe.module';
import { BullModule } from '@nestjs/bull';
import { AppController } from './app.controller';
import { DrizzleModule } from './modules/libs/drizzle/drizzle.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DrizzleModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        host: configService.get<string>('POSTGRES_HOST'),
        port: configService.get<number>('POSTGRES_PORT'),
        database: configService.get<string>('POSTGRES_DB'),
        user: configService.get<string>('POSTGRES_USER'),
        password: configService.get<string>('POSTGRES_PASSWORD'),
        sync: configService.get<string>('NODE_ENV') === 'development',
      }),
    }),
    StripeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get<string>('STRIPE_API_KEY'),
        options: {
          apiVersion: '2024-04-10',
        },
      }),
    }),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        },
      }),
    }),

    StripeEventsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
