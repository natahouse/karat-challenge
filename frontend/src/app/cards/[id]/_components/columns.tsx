import { Payment } from "@/_modules/payments/domain/entities/payment.entity"
import { Badge } from "@/components/ui/badge"
import { Column } from "@/components/ui/data-table"
import { formatCurrency, formatDate } from "@/lib/utils"

export const columns: Column<Payment>[] = [
  { key: "businessName", label: "Business Name", size: "30%" },
  {
    key: "status",
    label: "Status",
    size: "20%",
    content: ({ status }) => (
      <Badge variant={status === "approved" ? "affirmative" : "destructive"}>
        {status}
      </Badge>
    ),
  },
  {
    key: "createdAt",
    label: "Date",
    size: "20%",
    content: ({ createdAt }) => formatDate(createdAt),
  },
  {
    key: "amount",
    label: "Amount",
    contentClass: () => "text-left",
    content: ({ amount }) => formatCurrency(amount),
  },
]
