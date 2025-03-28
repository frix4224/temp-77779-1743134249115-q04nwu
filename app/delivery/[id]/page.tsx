"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Printer, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { mockOrders } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"

export default function DeliveryDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [driverNotes, setDriverNotes] = useState("")

  // In a real app, we would fetch this from Supabase
  const order = mockOrders.find((o) => o.id === params.id) || mockOrders[0]

  const handleBack = () => {
    router.back()
  }

  const handlePrintQR = () => {
    // In a real app, this would trigger printing
    alert("Printing QR code...")
  }

  const handleMarkAsDelivered = () => {
    // In a real app, we would update the status in Supabase
    alert("Order marked as delivered!")
    router.push("/delivery")
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold ml-2">Delivery Details</h1>

        <div className="ml-auto">
          <Button variant="outline" size="sm" onClick={handlePrintQR}>
            <Printer className="h-4 w-4 mr-2" />
            Print QR
          </Button>
        </div>
      </header>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-semibold">Order #{order.orderNumber}</h2>
                <p className="text-sm text-muted-foreground">{order.customerName}</p>
              </div>
              <Badge className="bg-green-500">Ready for Delivery</Badge>
            </div>

            <div className="mt-4 text-sm">
              <div className="flex justify-between py-1">
                <span>Date:</span>
                <span>{order.date}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Items:</span>
                <span>{order.items.length}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Total:</span>
                <span className="font-semibold">{formatCurrency(order.total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <h3 className="font-semibold mb-2">Items</h3>
          <div className="space-y-2">
            {order.items.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-3">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Qty: {item.quantity} × {formatCurrency(item.price)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Driver Notes</h3>
          <Textarea
            placeholder="Add notes for the driver..."
            value={driverNotes}
            onChange={(e) => setDriverNotes(e.target.value)}
            rows={4}
          />
        </div>

        <div className="pt-4">
          <Button className="w-full" size="lg" onClick={handleMarkAsDelivered}>
            <Truck className="h-4 w-4 mr-2" />
            Mark as Delivered
          </Button>
        </div>
      </div>
    </div>
  )
}

