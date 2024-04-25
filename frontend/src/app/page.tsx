import { Suspense } from "react"

import { PaymentDashboardPage } from "@/_modules/payments/ui/pages/dashboard.page"

export default function Page() {
  return (
    <Suspense>
      <PaymentDashboardPage />
    </Suspense>
  )
}
