import { FetchHttpClient } from "@/_shared/infra/fetch-http"
import { configs } from "@/configs"

import {
  HttpGetAmountByCategoryService,
  MockGetAmountByCategoryService,
  HttpListPaymentService,
  MockListPaymentService,
} from "../domain/services"

const httpClient = new FetchHttpClient()

export const listPaymentService = configs.useMocks
  ? new MockListPaymentService()
  : new HttpListPaymentService(httpClient)

export const getAmountByCategoryService = configs.useMocks
  ? new MockGetAmountByCategoryService()
  : new HttpGetAmountByCategoryService(httpClient)
