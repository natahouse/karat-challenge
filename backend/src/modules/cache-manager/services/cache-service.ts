export abstract class CacheService {
  public abstract get(key: string): Promise<string | null>;
  public abstract set(
    key: string,
    value: string,
    ttlInSeconds?: number,
  ): Promise<void>;
  public abstract del(key: string): Promise<void>;
  public abstract delByPattern(pattern: string): Promise<void>;
}
