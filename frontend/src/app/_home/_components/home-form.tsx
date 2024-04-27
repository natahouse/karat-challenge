"use client"

import { redirect } from "next/navigation"
import { useRef, useState } from "react"
import { useFormStatus } from "react-dom"

import { getCardService } from "@/_modules/cards/main/use-cases"
import { Button } from "@/components/ui/button"
import { CardDescription } from "@/components/ui/card"

export function HomePageForm() {
  const [error, setError] = useState<string | null>(null)
  const form = useRef<HTMLFormElement>(null)
  const { pending } = useFormStatus()

  return (
    <form
      ref={form}
      action={async (formData) => {
        setError(null)
        const idExternal = formData.get("idExternal") as string

        if (!idExternal) {
          setError("The card ID is required.")
          return
        }

        const result = await getCardService.execute({ idExternal })

        if (result?.id) redirect(`/cards/${result?.id}`)
        else setError("Internal Server Error!")
      }}
    >
      <div className="flex flex-col gap-5">
        <CardDescription>Enter Stripe ID</CardDescription>
        <input
          name="idExternal"
          aria-label="Card ID"
          className="border border-primary"
          placeholder="ic_1P8tcNP2lzb2oXI9TPSA5uBz"
        />
        {error && <p className="text-destructive">{error}</p>}
        <Button disabled={pending}>Enter</Button>
      </div>
    </form>
  )
}
