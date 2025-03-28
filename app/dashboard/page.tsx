"use client"

import { useState } from "react"
import { format, addDays, subDays } from "date-fns"
import { QrCode, ChevronLeft, ChevronRight, ArrowRight, Clock, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AppLayout } from "@/components/app-layout"
import { useRouter } from "next/navigation"

export default function DashboardPage() {
  const router = useRouter()
  const [currentDate, setCurrentDate] = useState(new Date())

  // Mock data - would be fetched from Supabase in a real implementation
  const stats = {
    checkIn: 12,
    processing: 24,
    readyForDelivery: 8,
  }

  const handlePreviousDay = () => {
    setCurrentDate((prev) => subDays(prev, 1))
  }

  const handleNextDay = () => {
    setCurrentDate((prev) => addDays(prev, 1))
  }

  const handleScanQR = () => {
    router.push("/check-in/scan")
  }

  const isToday = format(currentDate, "yyyy-MM-dd") === format(new Date(), "yyyy-MM-dd")

  return (
    <AppLayout>
      <div className="flex flex-col h-full pb-16 md:pb-0">
        {/* Hero section */}
        <div className="bg-primary text-white p-5">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <div className="flex items-center gap-1 text-white/80 text-sm">
              <Clock className="h-4 w-4" />
              <span>{format(new Date(), "h:mm a")}</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-white/90 text-sm font-medium">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(), "EEEE, MMMM d")}</span>
          </div>
        </div>

        {/* Date selector */}
        <div className="flex items-center justify-between p-4 bg-white sticky top-0 z-10 shadow-sm">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-10 w-10 text-primary"
            onClick={handlePreviousDay}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-lg font-bold">{isToday ? "Today" : format(currentDate, "MMMM d, yyyy")}</h2>
          <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 text-primary" onClick={handleNextDay}>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Stats cards */}
        <div className="p-5 space-y-4">
          <div className="uber-card">
            <div className="bg-blue-500 h-2 w-full" />
            <div className="p-5">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="text-xl font-bold">Check-in</h3>
                  <p className="text-sm text-muted-foreground">Orders awaiting check-in</p>
                </div>
                <div className="bg-blue-50 text-blue-700 text-3xl font-bold h-16 w-16 rounded-full flex items-center justify-center border border-blue-200">
                  {stats.checkIn}
                </div>
              </div>
              <Button
                className="w-full justify-between rounded-full bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 h-12"
                onClick={() => router.push("/check-in")}
              >
                <span className="font-bold">View orders</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="uber-card">
            <div className="bg-amber-500 h-2 w-full" />
            <div className="p-5">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="text-xl font-bold">Processing</h3>
                  <p className="text-sm text-muted-foreground">Orders being processed</p>
                </div>
                <div className="bg-amber-50 text-amber-700 text-3xl font-bold h-16 w-16 rounded-full flex items-center justify-center border border-amber-200">
                  {stats.processing}
                </div>
              </div>
              <Button
                className="w-full justify-between rounded-full bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 h-12"
                onClick={() => router.push("/processing")}
              >
                <span className="font-bold">View orders</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="uber-card">
            <div className="bg-green-500 h-2 w-full" />
            <div className="p-5">
              <div className="flex justify-between items-center mb-3">
                <div>
                  <h3 className="text-xl font-bold">Ready for Delivery</h3>
                  <p className="text-sm text-muted-foreground">Orders ready to be delivered</p>
                </div>
                <div className="bg-green-50 text-green-700 text-3xl font-bold h-16 w-16 rounded-full flex items-center justify-center border border-green-200">
                  {stats.readyForDelivery}
                </div>
              </div>
              <Button
                className="w-full justify-between rounded-full bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 h-12"
                onClick={() => router.push("/delivery")}
              >
                <span className="font-bold">View orders</span>
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Floating action button */}
        <div className="fixed bottom-20 right-6 md:bottom-6 z-20">
          <Button
            size="lg"
            className="rounded-full h-16 w-16 bg-primary hover:bg-primary/90 shadow-lg"
            onClick={handleScanQR}
          >
            <QrCode className="h-7 w-7" />
            <span className="sr-only">Scan QR Code</span>
          </Button>
        </div>
      </div>
    </AppLayout>
  )
}

