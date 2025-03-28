"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, AlertCircle, Camera, MessageSquare, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { mockOrders } from "@/lib/mock-data"
import { formatCurrency, getStatusBadgeClass, getInitials } from "@/lib/utils"

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [issueType, setIssueType] = useState("")
  const [issueDescription, setIssueDescription] = useState("")
  const [isReportingIssue, setIsReportingIssue] = useState(false)

  // In a real app, we would fetch this from Supabase
  const order = mockOrders.find((o) => o.id === params.id) || mockOrders[0]

  const handleBack = () => {
    router.back()
  }

  const handleReportIssue = () => {
    // In a real app, we would submit this to Supabase
    console.log("Reporting issue:", { issueType, issueDescription })
    setIsReportingIssue(false)
    setIssueType("")
    setIssueDescription("")
  }

  return (
    <div className="flex flex-col h-screen bg-background pb-16 md:pb-0">
      {/* Header */}
      <header className="uber-header">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold ml-2">Order Details</h1>

        <div className="ml-auto flex gap-2">
          <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
            <Phone className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full h-10 w-10">
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Dialog open={isReportingIssue} onOpenChange={setIsReportingIssue}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-10 w-10 text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
              >
                <AlertCircle className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl">
              <DialogHeader>
                <DialogTitle>Report an Issue</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Select value={issueType} onValueChange={setIssueType}>
                  <SelectTrigger className="rounded-full">
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="missing_items">Missing Items</SelectItem>
                    <SelectItem value="damaged_items">Damaged Items</SelectItem>
                    <SelectItem value="wrong_items">Wrong Items</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>

                <Textarea
                  placeholder="Describe the issue..."
                  value={issueDescription}
                  onChange={(e) => setIssueDescription(e.target.value)}
                  rows={4}
                  className="rounded-xl"
                />

                <Button variant="outline" className="w-full rounded-full">
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo
                </Button>
              </div>
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setIsReportingIssue(false)} className="rounded-full flex-1">
                  Cancel
                </Button>
                <Button onClick={handleReportIssue} className="rounded-full flex-1">
                  Submit Report
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Content */}
      <div className="uber-content">
        {/* Customer info */}
        <div className="bg-white p-5">
          <div className="flex items-center gap-4 mb-3">
            <Avatar className="h-16 w-16 border-2 border-primary/10">
              <AvatarFallback className="bg-primary/5 text-primary text-xl">
                {getInitials(order.customerName)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="font-bold text-xl">{order.customerName}</h2>
              <Badge className={getStatusBadgeClass(order.status)}>{order.status.replace(/_/g, " ")}</Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-muted/30 rounded-xl p-3">
              <p className="uber-label">Order Number</p>
              <p className="text-lg font-bold">#{order.orderNumber}</p>
            </div>
            <div className="bg-muted/30 rounded-xl p-3">
              <p className="uber-label">Date</p>
              <p className="text-lg font-bold">{order.date}</p>
            </div>
            <div className="bg-muted/30 rounded-xl p-3">
              <p className="uber-label">Items</p>
              <p className="text-lg font-bold">{order.items.length}</p>
            </div>
            <div className="bg-primary/10 rounded-xl p-3">
              <p className="uber-label text-primary/70">Total</p>
              <p className="text-lg font-bold text-primary">{formatCurrency(order.total)}</p>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="p-5 mt-2">
          <h3 className="uber-section-title">Items</h3>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div key={index} className="uber-card">
                <div className="p-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-bold text-base">{item.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-muted-foreground">
                          {item.quantity} × {formatCurrency(item.price)}
                        </p>
                        <Badge variant={item.scanned ? "default" : "outline"} className="text-xs rounded-full">
                          {item.scanned ? "Scanned" : "Not Scanned"}
                        </Badge>
                      </div>
                    </div>
                    <div className="font-bold text-lg">{formatCurrency(item.quantity * item.price)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Notes */}
        {order.notes && (
          <div className="p-5">
            <h3 className="uber-section-title">Customer Notes</h3>
            <div className="uber-card">
              <div className="p-4">
                <p className="text-sm">{order.notes}</p>
              </div>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="p-5 space-y-3">
          <Button className="w-full rounded-full h-12 text-base" onClick={() => router.push(`/processing/${order.id}`)}>
            Process Order
          </Button>

          <Button
            variant="outline"
            className="w-full rounded-full h-12 text-base"
            onClick={() => router.push("/orders")}
          >
            Back to Orders
          </Button>
        </div>
      </div>
    </div>
  )
}

