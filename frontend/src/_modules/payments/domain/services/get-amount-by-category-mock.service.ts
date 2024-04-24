import {
  GetAmountByCategory,
  GetAmountByCategoryOutput,
} from "@/_modules/payments/domain/use-cases/get-amount-by-category.use-case"

export class MockGetAmountByCategory implements GetAmountByCategory {
  async execute(): Promise<GetAmountByCategoryOutput> {
    return {
      categories: [
        { name: "Alimentação", amount: 100 },
        { name: "Transporter", amount: 30 },
        { name: "Lazer", amount: 50 },
        { name: "Construção", amount: 240 },
      ],
    }
  }
}
