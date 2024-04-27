import { FetchHttpClient } from "@/_shared/infra/fetch-http"
import { configs } from "@/configs"

import { MockGetCardService, HttpGetCardService } from "../domain/services"

const httpClient = new FetchHttpClient()

export const getCardService = configs.useMocks
  ? new MockGetCardService()
  : new HttpGetCardService(httpClient)
