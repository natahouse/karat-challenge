export interface Payment {
  id: string
  customer: string
  type: string
  status: string
  date: Date
  amount: number
}
