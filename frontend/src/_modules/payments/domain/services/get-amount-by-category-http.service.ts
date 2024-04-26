import {
  GetAmountByCategory,
  GetAmountByCategoryInput,
  GetAmountByCategoryOutput,
} from "@/_modules/payments/domain/use-cases"
import { HttpClient } from "@/_shared/protocols/http"
import { configs } from "@/configs"

export class HttpGetAmountByCategoryService implements GetAmountByCategory {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(
    input: GetAmountByCategoryInput
  ): Promise<GetAmountByCategoryOutput> {
    const { body } = await this.httpClient.request<ApiReturnType>({
      url: `${configs.apiBaseUrl}/cards/${input.id}/metrics/categories`,
      method: "get",
    })

    const categories = body.map((e) => ({
      name: this.parseSnakeCase(e.category),
      amount: e.total,
    }))

    return { categories }
  }

  private parseSnakeCase(input: string): string {
    const words = input.split("_")

    const capitalizedWords = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1)
    )

    return capitalizedWords.join(" ")
  }
}

type ApiReturnType = { category: string; total: number }[]
