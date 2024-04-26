import { Payment } from "@/_modules/payments/domain/entities/payment.entity"
import { Badge } from "@/components/ui/badge"
import { Column } from "@/components/ui/data-table"
import { formatCurrency, formatDate } from "@/lib/utils"

export const columns: Column<Payment>[] = [
  { key: "businessName", label: "Business Name" },
  {
    key: "status",
    label: "Status",
    content: ({ status }) => (
      <Badge variant={status === "approved" ? "affirmative" : "destructive"}>
        {status}
      </Badge>
    ),
  },
  {
    key: "createdAt",
    label: "Date",
    content: ({ createdAt }) => formatDate(createdAt),
  },
  {
    key: "amount",
    label: "Amount",
    content: ({ amount }) => formatCurrency(amount),
  },
]
