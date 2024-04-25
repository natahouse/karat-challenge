import {
  ListPaymentUseCase,
  ListPaymentUseCaseOutput,
} from "@/_modules/payments/domain/use-cases"
import { HttpClient } from "@/_shared/protocols/http"
import { configs } from "@/configs"

export class HttpListPaymentService implements ListPaymentUseCase {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(): Promise<ListPaymentUseCaseOutput> {
    const { body } = await this.httpClient.request<ApiReturnType>({
      url: configs.apiBaseUrl + "/payments",
      method: "get",
    })

    return { payments: body.payments, total: body.total }
  }
}

type ApiReturnType = {
  payments: {
    id: string
    customer: string
    type: string
    status: string
    date: Date
    amount: number
  }[]
  total: number
}
