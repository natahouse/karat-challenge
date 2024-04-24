import { ListPaymentUseCase } from "../domain/use-cases/list-payments.use-case"
import { PaymentMockRepository } from "../infra/repositories/payment-mock.repository"

export const listPaymentUseCase = new ListPaymentUseCase(
  new PaymentMockRepository()
)
