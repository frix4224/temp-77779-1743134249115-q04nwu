"use client"

import { useRouter } from "next/navigation"
import { Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AppLayout } from "@/components/app-layout"
import { OrderList } from "@/components/order-list"
import { mockOrders } from "@/lib/mock-data"

export default function DeliveryPage() {
  const router = useRouter()

  // Filter orders that are in "ready_for_delivery" status
  const deliveryOrders = mockOrders.filter((order) => order.status === "ready_for_delivery")

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold mb-2">Ready for Delivery</h1>
          <p className="text-sm text-muted-foreground mb-4">Prepare orders for delivery</p>
        </div>

        <div className="flex-1 overflow-auto">
          {deliveryOrders.length > 0 ? (
            <OrderList
              orders={deliveryOrders}
              actionButton={(orderId) => (
                <Button variant="outline" size="sm">
                  <Printer className="h-4 w-4 mr-2" />
                  Print QR
                </Button>
              )}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
              <p className="text-muted-foreground mb-4">No orders ready for delivery</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}

