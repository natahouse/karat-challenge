"use client"

import { useEffect, useState } from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency } from "@/lib/utils"

import { GetPaymentsMetricsUseCaseOutput } from "../../domain/use-cases"
import { getPaymentsMetricsService } from "../../main/use-cases"

export const MetricsCards = () => {
  const [data, setData] = useState<GetPaymentsMetricsUseCaseOutput>({
    totalAmount: 0,
    averageAmount: 0,
  })
  const [isPending, setIsPending] = useState(true)

  useEffect(() => {
    setIsPending(true)
    getPaymentsMetricsService
      .execute()
      .then((result) => setData(result))
      .finally(() => setIsPending(false))
  }, [])

  return (
    <>
      <Card x-chunk="dashboard-05-chunk-1">
        <CardHeader className="pb-2">
          <CardDescription>Soma de gastos</CardDescription>
          <CardTitle className="text-4xl">
            {isPending ? (
              <Skeleton className="h-[40px] w-full" />
            ) : (
              formatCurrency(data.totalAmount)
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            +25% from last week
          </div>
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-05-chunk-2">
        <CardHeader className="pb-2">
          <CardDescription>Média de gastos</CardDescription>
          <CardTitle className="text-4xl">
            {isPending ? (
              <Skeleton className="h-[40px] w-full" />
            ) : (
              formatCurrency(data.averageAmount)
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground">
            +10% from last month
          </div>
        </CardContent>
      </Card>
    </>
  )
}
