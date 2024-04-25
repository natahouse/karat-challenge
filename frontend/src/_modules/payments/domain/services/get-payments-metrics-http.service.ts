import {
  GetPaymentsMetricsUseCase,
  GetPaymentsMetricsUseCaseOutput,
} from "@/_modules/payments/domain/use-cases"
import { HttpClient } from "@/_shared/protocols/http"
import { configs } from "@/configs"

export class HttpGetPaymentsMetricsService
  implements GetPaymentsMetricsUseCase
{
  constructor(private readonly httpClient: HttpClient) {}

  async execute(): Promise<GetPaymentsMetricsUseCaseOutput> {
    const { body } = await this.httpClient.request<ApiReturnType>({
      url: configs.apiBaseUrl + "/metrics",
      method: "get",
    })

    return { totalAmount: body.total, averageAmount: body.average }
  }
}

type ApiReturnType = {
  total: number
  average: number
}
