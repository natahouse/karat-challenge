import { Payment } from "@/_modules/payments/domain/entities/payment.entity"
import {
  ListPaymentUseCase,
  ListPaymentUseCaseOutput,
} from "@/_modules/payments/domain/use-cases"

export class MockListPaymentService implements ListPaymentUseCase {
  async execute(): Promise<ListPaymentUseCaseOutput> {
    const payments: Payment[] = [
      {
        id: "1",
        customer: "Liam Johnson",
        type: "Sale",
        status: "Fulfilled",
        date: new Date("2023-06-23"),
        amount: 250,
      },
      {
        id: "2",
        customer: "Olivia Smith",
        type: "Refund",
        status: "Declined",
        date: new Date("2023-06-24"),
        amount: 150,
      },
      {
        id: "3",
        customer: "Noah Williams",
        type: "Sale",
        status: "Fulfilled",
        date: new Date("2023-06-23"),
        amount: 350,
      },
      {
        id: "4",
        customer: "Emma Brown",
        type: "Sale",
        status: "Declined",
        date: new Date("2023-06-22"),
        amount: 200,
      },
      {
        id: "5",
        customer: "Liam Johnson",
        type: "Sale",
        status: "Fulfilled",
        date: new Date("2023-06-22"),
        amount: 450,
      },
    ]
    return { payments, total: payments.length }
  }
}
