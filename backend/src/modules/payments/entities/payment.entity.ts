import { AuthorizationEntity } from 'src/modules/authorizations/entities';
import { CardEntity } from 'src/modules/cards/entities/card.entity';
import { PaymentStatus } from 'src/modules/libs/drizzle/schema';
import { TransactionEntity } from 'src/modules/transactions/entities';

export type PaymentEntity = {
  id?: string;
  businessName: string;
  amount: number;
  category: string;
  status: PaymentStatus;
  createdAt?: Date;

  idCard: string;
  card?: CardEntity;

  idTransaction?: string;
  transaction?: TransactionEntity;

  idAuthorization: string;
  authorizations?: AuthorizationEntity;
};
