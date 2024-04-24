import { HttpRequest, HttpResponse, HttpClient } from "@/_shared/protocols/http"

export class FetchHttpClient implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse> {
    const response = await fetch(data.url, {
      method: data.method,
      body: JSON.stringify(data.body),
      headers: data.headers,
    })

    const json = await response.json()

    return {
      statusCode: response.status,
      body: json,
    }
  }
}
