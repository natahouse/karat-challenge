"use client"

import Chart from "chart.js/auto"
import { useEffect, useRef, useState } from "react"

import { Skeleton } from "@/components/ui/skeleton"

import { getAmountByCategoryService } from "../../main/use-cases"

export const PieChart = () => {
  const [isPending, setIsPending] = useState(true)

  const ref = useRef(null)
  const chartLoaded = useRef(false)

  useEffect(() => {
    if (chartLoaded.current) return
    chartLoaded.current = true

    setIsPending(true)
    getAmountByCategoryService
      .execute()
      .then((result) => {
        if (!ref.current) return

        const data = {
          labels: result.categories.map(({ name }) => name),
          datasets: [
            {
              label: "Dataset 1",
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
              title: {
                display: true,
                text: "Chart.js Pie Chart",
              },
            },
          },
        })
      })
      .finally(() => setIsPending(false))
  }, [])

  return (
    <>
      {isPending && <Skeleton className="h-[600px] w-full" />}
      <canvas ref={ref}></canvas>
    </>
  )
}
