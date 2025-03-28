"use client"

import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { OrderList } from "@/components/order-list"
import { mockOrders } from "@/lib/mock-data"

export default function ProcessingPage() {
  const router = useRouter()

  // Filter orders that are in "processing" status
  const processingOrders = mockOrders.filter((order) => order.status === "processing")

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold mb-2">Processing</h1>
          <p className="text-sm text-muted-foreground mb-4">Verify and process orders</p>
        </div>

        <div className="flex-1 overflow-auto">
          {processingOrders.length > 0 ? (
            <OrderList orders={processingOrders} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
              <p className="text-muted-foreground mb-4">No orders in processing</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}

