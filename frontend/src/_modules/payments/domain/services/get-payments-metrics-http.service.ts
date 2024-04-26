import {
  GetPaymentsMetricsUseCase,
  GetPaymentsMetricsUseCaseInput,
  GetPaymentsMetricsUseCaseOutput,
} from "@/_modules/payments/domain/use-cases"
import { HttpClient } from "@/_shared/protocols/http"
import { configs } from "@/configs"

export class HttpGetPaymentsMetricsService
  implements GetPaymentsMetricsUseCase
{
  constructor(private readonly httpClient: HttpClient) {}

  async execute(
    input: GetPaymentsMetricsUseCaseInput
  ): Promise<GetPaymentsMetricsUseCaseOutput> {
    const { body } = await this.httpClient.request<ApiReturnType>({
      url: `${configs.apiBaseUrl}/cards/${input.id}/metrics`,
      method: "get",
    })

    const average =
      (body.amount && body.total) > 0 ? body.amount / body.total : 0

    return { totalAmount: body.amount, averageAmount: average }
  }
}

type ApiReturnType = {
  amount: number
  total: number
}
