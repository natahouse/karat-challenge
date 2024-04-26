import { UseCase } from "./use-case"
import { Payment } from "../entities/payment.entity"

export type ListPaymentUseCase = UseCase<
  ListPaymentUseCaseInput,
  ListPaymentUseCaseOutput
>

export type ListPaymentUseCaseInput = {
  id: string
  createdAt?: string
  page: string
}
export type ListPaymentUseCaseOutput = { payments: Payment[]; total: number }
