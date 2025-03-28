"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Search, CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AppLayout } from "@/components/app-layout"
import { OrderList } from "@/components/order-list"
import { mockOrders } from "@/lib/mock-data"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  const filteredOrders = mockOrders.filter((order) => {
    // Filter by tab
    if (activeTab !== "all" && order.status !== activeTab) {
      return false
    }

    // Filter by status if using dropdown
    if (statusFilter !== "all" && order.status !== statusFilter) {
      return false
    }

    // Filter by search query
    if (searchQuery && !order.customerName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }

    return true
  })

  return (
    <AppLayout>
      <div className="flex flex-col h-full pb-16 md:pb-0">
        {/* Hero section */}
        <div className="bg-primary text-white p-5">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold">Orders</h1>
            <Button
              variant="ghost"
              size="sm"
              className="text-white/90 hover:text-white hover:bg-white/10 rounded-full gap-2 px-3"
            >
              <CalendarIcon className="h-4 w-4" />
              <span>{format(new Date(), "MMM d")}</span>
            </Button>
          </div>
          <p className="text-white/80">View and manage all customer orders</p>
        </div>

        {/* Search and filters */}
        <div className="p-5 bg-white sticky top-0 z-10 shadow-sm space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by customer name..."
              className="pl-10 pr-4 py-3 h-12 rounded-full border-muted bg-muted/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 h-10 w-full rounded-full p-1 bg-muted/30">
              <TabsTrigger value="all" className="rounded-full text-xs">
                All
              </TabsTrigger>
              <TabsTrigger value="arrived_at_facility" className="rounded-full text-xs">
                Check-in
              </TabsTrigger>
              <TabsTrigger value="processing" className="rounded-full text-xs">
                Processing
              </TabsTrigger>
              <TabsTrigger value="ready_for_delivery" className="rounded-full text-xs">
                Ready
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Order count */}
        <div className="px-5 pt-2 pb-0">
          <p className="text-sm text-muted-foreground font-medium">
            {filteredOrders.length} {filteredOrders.length === 1 ? "order" : "orders"} found
          </p>
        </div>

        {/* Order list */}
        <div className="flex-1 overflow-auto">
          <OrderList orders={filteredOrders} />
        </div>
      </div>
    </AppLayout>
  )
}

