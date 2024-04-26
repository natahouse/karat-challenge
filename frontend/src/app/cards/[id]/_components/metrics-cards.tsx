"use client"

import { useEffect, useState } from "react"

import { GetPaymentsMetricsUseCaseOutput } from "@/_modules/payments/domain/use-cases"
import { getPaymentsMetricsService } from "@/_modules/payments/main/use-cases"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency } from "@/lib/utils"

type Props = {
  idCard: string
}

export const MetricsCards = (props: Props) => {
  const [data, setData] = useState<GetPaymentsMetricsUseCaseOutput>({
    totalAmount: 0,
    averageAmount: 0,
  })
  const [isPending, setIsPending] = useState(true)

  useEffect(() => {
    setIsPending(true)
    getPaymentsMetricsService
      .execute({ id: props.idCard })
      .then((result) => setData(result))
      .finally(() => setIsPending(false))
  }, [props.idCard])

  return (
    <>
      <Card x-chunk="dashboard-05-chunk-1">
        <CardHeader className="pb-2">
          <CardDescription>Total Amount</CardDescription>
          <CardTitle className="text-4xl">
            {isPending ? (
              <Skeleton className="h-[40px] w-full" />
            ) : (
              formatCurrency(data.totalAmount)
            )}
          </CardTitle>
          <CardDescription>From approved transactions</CardDescription>
        </CardHeader>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2">
        <CardHeader className="pb-2">
          <CardDescription>Avg Amount</CardDescription>
          <CardTitle className="text-4xl">
            {isPending ? (
              <Skeleton className="h-[40px] w-full" />
            ) : (
              formatCurrency(data.averageAmount)
            )}
          </CardTitle>
          <CardDescription>From approved transactions</CardDescription>
        </CardHeader>
      </Card>
    </>
  )
}
