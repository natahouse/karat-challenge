"use client"

import Chart from "chart.js/auto"
import { useEffect, useRef, useState } from "react"

import { getAmountByCategoryService } from "@/_modules/payments/main/use-cases"
import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

type Props = {
  idCard: string
}

export const PieChart = (props: Props) => {
  const [isPending, setIsPending] = useState(true)

  const ref = useRef(null)
  const chartLoaded = useRef(false)

  useEffect(() => {
    if (chartLoaded.current) return
    chartLoaded.current = true

    setIsPending(true)
    getAmountByCategoryService
      .execute({ id: props.idCard })
      .then((result) => {
        if (!ref.current) return

        const data = {
          labels: result.categories.map(({ name }) => name),
          datasets: [
            {
              label: "Frequency",
              data: result.categories.map(({ amount }) => amount),
            },
          ],
        }

        new Chart(ref.current, {
          type: "pie",
          data: data,
          options: {
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
            },
          },
        })
      })
      .finally(() => setIsPending(false))
  }, [props.idCard])

  return (
    <>
      {isPending && <Skeleton className="h-[600px] w-full" />}
      <canvas ref={ref} className={cn(isPending && "hidden")}></canvas>
    </>
  )
}
