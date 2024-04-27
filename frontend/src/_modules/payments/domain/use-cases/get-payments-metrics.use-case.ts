import { UseCase } from "@/_modules/types"

export type GetPaymentsMetricsUseCase = UseCase<
  GetPaymentsMetricsUseCaseInput,
  GetPaymentsMetricsUseCaseOutput
>

export type GetPaymentsMetricsUseCaseInput = { id: string }
export type GetPaymentsMetricsUseCaseOutput = {
  totalAmount: number
  averageAmount: number
}
