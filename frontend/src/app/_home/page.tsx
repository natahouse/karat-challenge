import { Card, CardHeader, CardTitle } from "@/components/ui/card"

import { HomePageForm } from "./_components/home-form"

export default function HomePage() {
  return (
    <main className="flex h-screen w-screen items-center justify-center bg-primary">
      <Card className="w-[300px] bg-secondary">
        <CardHeader className=" flex flex-row items-center justify-center">
          <div className="center">
            <CardTitle className="flex items-center gap-2 text-lg text-primary">
              View your card
            </CardTitle>
            <HomePageForm />
          </div>
        </CardHeader>
      </Card>
    </main>
  )
}
