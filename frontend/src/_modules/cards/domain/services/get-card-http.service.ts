import { HttpClient } from "@/_shared/protocols/http"
import { configs } from "@/configs"

import { GetCard, GetCardInput, GetCardOutput } from "../use-cases"

export class HttpGetCardService implements GetCard {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(input: GetCardInput): Promise<GetCardOutput> {
    const { body: foundCard } = await this.httpClient.request<ApiReturnType>({
      url: `${configs.apiBaseUrl}/cards/external/${input.idExternal}`,
      method: "get",
    })

    if (foundCard?.id) return { id: foundCard.id }

    const { body: newCard } = await this.httpClient.request<ApiReturnType>({
      url: `${configs.apiBaseUrl}/cards`,
      method: "post",
      headers: [["Content-Type", "application/json"]],
      body: { idExternal: input.idExternal },
    })

    return { id: newCard.id }
  }
}

type ApiReturnType = { id: string }
