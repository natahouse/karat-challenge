import { MockGetAmountByCategory } from "../domain/services/get-amount-by-category-mock.service"
import { MockListPaymentService } from "../domain/services/list-payments-mock.service"

export const listPaymentService = new MockListPaymentService()
export const getAmountByCategory = new MockGetAmountByCategory()
