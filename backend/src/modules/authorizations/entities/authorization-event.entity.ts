export type AuthorizationEventEntity = {
  id: string;
  object: string;
  amount: number;
  currency: string;
  card: {
    id: string;
  };
  created: number;
  approved: boolean;
  merchant_data: {
    category: string;
    category_code: string;
    name: string;
  };
};
