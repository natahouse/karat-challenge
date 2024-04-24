import { Payment } from "../entities/payment.entity"

export interface PaymentRepository {
  findAndCount: () => Promise<[Payment[], number]>
}
