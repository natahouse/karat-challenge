import {
  GetPaymentsMetricsUseCase,
  GetPaymentsMetricsUseCaseOutput,
} from "@/_modules/payments/domain/use-cases"

export class MockGetPaymentsMetricsService
  implements GetPaymentsMetricsUseCase
{
  async execute(): Promise<GetPaymentsMetricsUseCaseOutput> {
    await new Promise((resolve) => setTimeout(() => resolve(null), 2000))
    return {
      totalAmount: 1250,
      averageAmount: 30,
    }
  }
}
