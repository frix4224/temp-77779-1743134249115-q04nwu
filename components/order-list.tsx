import type React from "react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getStatusColor, formatCurrency, getStatusBadgeClass } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

interface OrderListProps {
  orders: any[]
  actionButton?: (orderId: string) => React.ReactNode
}

export function OrderList({ orders, actionButton }: OrderListProps) {
  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 p-4 text-center">
        <p className="text-muted-foreground">No orders found</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 p-5">
      {orders.map((order) => (
        <Link href={`/orders/${order.id}`} key={order.id} className="block">
          <div className="uber-card">
            <div className={`h-2 w-full ${getStatusColor(order.status)}`} />
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold">#{order.orderNumber}</h3>
                    <Badge className={getStatusBadgeClass(order.status)}>{order.status.replace(/_/g, " ")}</Badge>
                  </div>
                  <p className="font-medium">{order.customerName}</p>
                  <p className="text-xs text-muted-foreground mt-1">{order.date}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-primary">{formatCurrency(order.total)}</span>
                  <p className="text-xs text-muted-foreground">{order.items.length} items</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                {actionButton ? (
                  actionButton(order.id)
                ) : (
                  <Button
                    variant="ghost"
                    className="w-full justify-between text-primary hover:bg-primary/5 p-2 h-10 rounded-full"
                  >
                    <span className="font-medium">View details</span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

