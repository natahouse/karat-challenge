import { UseCase } from "./use-case"

export type GetAmountByCategory = UseCase<
  GetAmountByCategoryInput,
  GetAmountByCategoryOutput
>

export type GetAmountByCategoryInput = {}
export type GetAmountByCategoryOutput = {
  categories: { name: string; amount: number }[]
}
