import {
  GetAmountByCategory,
  GetAmountByCategoryOutput,
} from "@/_modules/payments/domain/use-cases"
import { HttpClient } from "@/_shared/protocols/http"
import { configs } from "@/configs"

export class HttpGetAmountByCategoryService implements GetAmountByCategory {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(): Promise<GetAmountByCategoryOutput> {
    const { body } = await this.httpClient.request<ApiReturnType>({
      url: configs.apiBaseUrl + "/amount-by-category",
      method: "get",
    })

    return { categories: body.categories }
  }
}

type ApiReturnType = {
  categories: { name: string; amount: number }[]
}
