import { UseCase } from "./use-case"
import { Payment } from "../entities/payment.entity"
import { PaymentRepository } from "../repositories/payment.repository"

export class ListPaymentUseCase implements UseCase<Input, Output> {
  constructor(private readonly repository: PaymentRepository) {}

  async execute(_input: Input): Promise<Output> {
    const [payments, total] = await this.repository.findAndCount()
    return { payments, total }
  }
}

type Input = {}
type Output = { payments: Payment[]; total: number }
