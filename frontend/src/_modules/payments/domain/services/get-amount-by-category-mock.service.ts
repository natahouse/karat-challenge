import {
  GetAmountByCategory,
  GetAmountByCategoryOutput,
} from "@/_modules/payments/domain/use-cases"

export class MockGetAmountByCategoryService implements GetAmountByCategory {
  async execute(): Promise<GetAmountByCategoryOutput> {
    await new Promise((resolve) => setTimeout(() => resolve(null), 2000))
    return {
      categories: [
        { name: "Alimentação", amount: 100 },
        { name: "Transporte", amount: 30 },
        { name: "Lazer", amount: 50 },
        { name: "Construção", amount: 240 },
      ],
    }
  }
}
