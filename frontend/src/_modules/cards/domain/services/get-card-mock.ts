import { GetCard, GetCardInput, GetCardOutput } from "../use-cases"

export class MockGetCardService implements GetCard {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async execute(input: GetCardInput): Promise<GetCardOutput> {
    await new Promise((resolve) => setTimeout(() => resolve(null), 2000))
    return {
      id: "673eb868-8e28-4983-b893-a0d8fb5cf51f",
    }
  }
}
