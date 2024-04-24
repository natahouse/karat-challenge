import { UseCase } from "./use-case"
import { Payment } from "../entities/payment.entity"

export type ListPaymentUseCase = UseCase<Input, Output>

type Input = {}
type Output = { payments: Payment[]; total: number }
