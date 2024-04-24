import { Payment } from "@/_modules/payments/domain/entities/payment.entity"
import { Badge } from "@/components/ui/badge"
import { Column } from "@/components/ui/data-table"
import { formatDate } from "@/lib/utils"

export const columns: Column<Payment>[] = [
  { key: "customer", label: "Customer" },
  { key: "type", label: "Type" },
  {
    key: "status",
    label: "Status",
    content: ({ status }) => <Badge>{status}</Badge>,
  },
  { key: "date", label: "Date", content: ({ date }) => formatDate(date) },
  { key: "amount", label: "Amount" },
]
