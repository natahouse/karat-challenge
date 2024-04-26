import {
  ListPaymentUseCase,
  ListPaymentUseCaseInput,
  ListPaymentUseCaseOutput,
} from "@/_modules/payments/domain/use-cases"
import { HttpClient } from "@/_shared/protocols/http"
import { configs } from "@/configs"

import { Payment } from "../entities/payment.entity"

export class HttpListPaymentService implements ListPaymentUseCase {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(
    input: ListPaymentUseCaseInput
  ): Promise<ListPaymentUseCaseOutput> {
    const { id, createdAt, page } = input

    const searchParams = new URLSearchParams({
      createdAt: createdAt ?? "",
      page,
    })

    const { body } = await this.httpClient.request<ApiReturnType>({
      url: configs.apiBaseUrl + `/cards/${id}/payments?` + searchParams,
      method: "get",
    })

    return { payments: body.payments, total: body.total }
  }
}

type ApiReturnType = {
  payments: Payment[]
  total: number
}
