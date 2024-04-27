import {
  AuthorizationRepository,
  SqlAuthorizationRepository,
} from 'src/modules/authorizations/repositories';
import {
  CardRepository,
  SqlCardRepository,
} from 'src/modules/cards/repositories';
import { DrizzleService } from 'src/modules/libs/drizzle/services/drizzle.service';
import {
  PaymentRepository,
  SqlPaymentRepository,
} from 'src/modules/payments/repositories';
import {
  SqlTransactionRepository,
  TransactionRepository,
} from 'src/modules/transactions/repositories';

import * as dotenv from 'dotenv';
dotenv.config();

const drizzleService = new DrizzleService({
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT),
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  sync: false,
});

const cardRepository: CardRepository = new SqlCardRepository(drizzleService);

const transactionRepository: TransactionRepository =
  new SqlTransactionRepository(drizzleService);

const authorizationRepository: AuthorizationRepository =
  new SqlAuthorizationRepository(drizzleService);

const paymentRepository: PaymentRepository = new SqlPaymentRepository(
  drizzleService,
);

const seed = async () => {
  const baseIdExternal = `test-${new Date().getTime()}`;

  const categories = [
    'airlines_air_carriers',
    'bakeries',
    'bowling_alleys',
    'carpentry_services',
    'computer_software_stores',
    'eating_places_restaurants',
  ];

  await cardRepository.save({ idExternal: baseIdExternal });
  const card = await cardRepository.findByExternalId(baseIdExternal);

  const idCard = card.id;

  for (let i = 0; i < 2000; i++) {
    try {
      const idExternal = baseIdExternal + '-' + i;

      const approved = Math.floor(Math.random() * 100) % 3 !== 0;
      const auth = await authorizationRepository.save({
        idCard,
        approved,
        idExternal,
      });

      const categoryIndex = Math.floor(Math.random() * 5);

      if (approved) {
        const transaction = await transactionRepository.save({
          idExternal,
          idAuthorization: auth.id,
          idCard: idCard,
        });

        await paymentRepository.save({
          idAuthorization: auth.id,
          idTransaction: transaction.id,
          idCard: card.id,
          amount: Math.floor(Math.random() * 1000),
          status: 'approved',
          businessName: 'Test',
          category: categories[categoryIndex],
        });
      } else {
        await paymentRepository.save({
          idAuthorization: auth.id,
          idCard: card.id,
          amount: Math.floor(Math.random() * 1000),
          status: 'declined',
          businessName: 'Test',
          category: categories[categoryIndex],
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
};

seed();
