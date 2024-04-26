export type Payment = {
  id: string
  businessName: string
  amount: number
  status: "approved" | "declined"
  createdAt: Date
}
