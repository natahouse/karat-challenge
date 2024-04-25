export type BaseFilters = {
  createdAt?: Date;
  limit?: number;
  offset?: number;
};

export type BaseReturn<T> = {
  total: number;
  entities: T[];
};
