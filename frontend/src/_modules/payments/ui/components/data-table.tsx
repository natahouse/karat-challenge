"use client"

import { useEffect, useState } from "react"

import { Payment } from "@/_modules/payments/domain/entities/payment.entity"
import { listPaymentService } from "@/_modules/payments/main/use-cases"
import { DataTable } from "@/components/ui/data-table"
import { Skeleton } from "@/components/ui/skeleton"

import { columns } from "./columns"

export const PaymentDataTable = () => {
  const [data, setData] = useState<Payment[]>([])
  const [isPending, setIsPending] = useState(true)

  useEffect(() => {
    setIsPending(true)
    listPaymentService
      .execute()
      .then((result) => setData(result.payments))
      .finally(() => setIsPending(false))
  }, [])

  if (isPending) {
    return (
      <div className="grid gap-4">
        <Skeleton className="h-[40px] w-full" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    )
  }

  return <DataTable columns={columns} data={data} />
}
