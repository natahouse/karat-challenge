import {
  ListPaymentUseCase,
  ListPaymentUseCaseOutput,
} from "@/_modules/payments/domain/use-cases/list-payments.use-case"
import { HttpClient } from "@/_shared/protocols/http"

export class HttpListPaymentService implements ListPaymentUseCase {
  constructor(private readonly httpClient: HttpClient) {}

  async execute(): Promise<ListPaymentUseCaseOutput> {
    const { body } = await this.httpClient.request({
      method: "get",
      url: "",
    })
    return { payments: body.payments, total: body.total }
  }
}
