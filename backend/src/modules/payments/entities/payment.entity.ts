export type PaymentEntity = {
  id: string;
  idExternal: string;

  idCard: string;

  status: string;

  idTransaction: string;
  transaction: any;

  idAuthorization: string;
  authorizations: any;
};
