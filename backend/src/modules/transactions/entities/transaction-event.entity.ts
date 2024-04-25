export type TransactionEventEntity = {
  id: string;
  object: string;
  authorization:
    | string
    | {
        id: string;
      };
  amount: number;
  currency: string;
  card:
    | {
        id: string;
      }
    | string;
  created: number;
  type: string;
};
