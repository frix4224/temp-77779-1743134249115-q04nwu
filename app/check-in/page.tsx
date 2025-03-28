"use client"

import { useRouter } from "next/navigation"
import { QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AppLayout } from "@/components/app-layout"
import { OrderList } from "@/components/order-list"
import { mockOrders } from "@/lib/mock-data"

export default function CheckInPage() {
  const router = useRouter()

  // Filter orders that are in "arrived_at_facility" status
  const checkInOrders = mockOrders.filter((order) => order.status === "arrived_at_facility")

  // Check if all items in all orders are scanned
  const allItemsScanned = checkInOrders.every((order) => order.items.every((item) => item.scanned))

  const handleScanQR = () => {
    router.push("/check-in/scan")
  }

  const handleCompleteCheckIn = () => {
    // In a real app, we would update the status in Supabase
    alert("Check-in completed! Orders moved to processing.")
    router.push("/dashboard")
  }

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold mb-2">Check-In</h1>
          <p className="text-sm text-muted-foreground mb-4">Scan QR codes to verify incoming orders</p>

          <div className="flex gap-2">
            <Button variant="outline" className="flex-1" onClick={handleScanQR}>
              <QrCode className="h-4 w-4 mr-2" />
              Scan QR Code
            </Button>

            <Button
              className="flex-1"
              disabled={!allItemsScanned || checkInOrders.length === 0}
              onClick={handleCompleteCheckIn}
            >
              Complete Check-in
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {checkInOrders.length > 0 ? (
            <OrderList orders={checkInOrders} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
              <p className="text-muted-foreground mb-4">No orders waiting for check-in</p>
              <Button variant="outline" onClick={() => router.push("/dashboard")}>
                Return to Dashboard
              </Button>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}

