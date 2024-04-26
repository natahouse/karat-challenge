import { ListFilter } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent } from "@/components/ui/tabs"

import { MetricsCards, PieChart, PaymentDataTable } from "./_components"

type Props = {
  params: { id: string }
}

export default function PaymentDashboardPage({ params }: Props) {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 p-4">
      <main className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
              <CardHeader className="pb-3">
                <CardTitle>Card Metrics</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  In this dashboard you may find your authorizations,
                  transactions and metrics related to merchant categories
                </CardDescription>
              </CardHeader>
            </Card>
            <MetricsCards idCard={params.id} />
          </div>
          <Tabs defaultValue="week">
            <div className="flex items-center">
              <div className="ml-auto flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 gap-1 text-sm"
                    >
                      <ListFilter className="h-3.5 w-3.5" />
                      <span className="sr-only sm:not-sr-only">Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem checked>
                      Approved
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem>
                      Declined
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <TabsContent value="week">
              <Card x-chunk="dashboard-05-chunk-3">
                <CardHeader className="px-7">
                  <CardTitle>Transactions</CardTitle>
                  <CardDescription>
                    Recent transactions for the given card
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <PaymentDataTable idCard={params.id} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <Card className="overflow-hidden" x-chunk="dashboard-05-chunk-4">
            <CardHeader className="flex flex-row items-start bg-muted/50">
              <div className="grid gap-0.5">
                <CardTitle className="flex items-center gap-2 text-lg">
                  Category Frequency
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-6 text-sm">
              <PieChart idCard={params.id} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
