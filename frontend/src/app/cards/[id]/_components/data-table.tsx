"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import { Payment } from "@/_modules/payments/domain/entities/payment.entity"
import { listPaymentService } from "@/_modules/payments/main/use-cases"
import { DataTable } from "@/components/ui/data-table"
import { Skeleton } from "@/components/ui/skeleton"

import { columns } from "./columns"

type Props = {
  idCard: string
}

export const PaymentDataTable = (props: Props) => {
  const searchParams = useSearchParams()
  const page = searchParams.get("page") ?? "1"

  const [createdAt] = useState<string>(new Date().toISOString())
  const [data, setData] = useState<Payment[]>([])
  const [total, setTotal] = useState(0)
  const [isPending, setIsPending] = useState(true)

  useEffect(() => {
    setIsPending(true)
    listPaymentService
      .execute({ id: props.idCard, createdAt, page })
      .then((result) => {
        setData(result.payments)
        setTotal(result.total)
      })
      .finally(() => setIsPending(false))
  }, [page, createdAt, props.idCard])

  if (isPending) {
    return (
      <div className="grid gap-4">
        <Skeleton className="h-[40px] w-full" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    )
  }

  return <DataTable columns={columns} data={data} totalItems={total} />
}
