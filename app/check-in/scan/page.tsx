"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Scan, CheckCircle2, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import { mockOrders } from "@/lib/mock-data"

export default function ScanQRPage() {
  const router = useRouter()
  const [scanning, setScanning] = useState(false)
  const [scannedOrder, setScannedOrder] = useState<any>(null)
  const [scanSuccess, setScanSuccess] = useState(false)

  const handleBack = () => {
    router.back()
  }

  const handleStartScan = () => {
    setScanning(true)

    // Simulate QR scanning - in a real app, we would use the device camera
    setTimeout(() => {
      // Randomly select an order to simulate scanning
      const randomOrder = mockOrders.find((order) => order.status === "arrived_at_facility")
      setScannedOrder(randomOrder)
      setScanning(false)
      setScanSuccess(true)

      // Simulate updating the order status
      setTimeout(() => {
        router.push(`/orders/${randomOrder?.id}`)
      }, 2000)
    }, 2000)
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="uber-header">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold ml-2">Scan QR Code</h1>
      </header>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-5">
        {scanSuccess ? (
          <div className="text-center">
            <div className="bg-green-100 rounded-full p-6 w-24 h-24 flex items-center justify-center mx-auto mb-8">
              <CheckCircle2 className="h-12 w-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Order Scanned!</h2>
            <p className="text-muted-foreground mb-6 text-lg">
              Order #{scannedOrder?.orderNumber} has been successfully scanned.
            </p>
            <div className="flex items-center justify-center">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse mx-1"></div>
              <div
                className="w-2 h-2 bg-primary rounded-full animate-pulse mx-1"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 bg-primary rounded-full animate-pulse mx-1"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
            <p className="text-sm mt-2">Redirecting to order details...</p>
          </div>
        ) : (
          <>
            <div className="w-full max-w-sm mb-8">
              <div className="aspect-square border-2 border-primary/30 rounded-2xl flex items-center justify-center bg-primary/5 mb-8 relative overflow-hidden">
                {scanning ? (
                  <>
                    <div className="absolute inset-0 bg-primary/10 animate-pulse"></div>
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-primary/50 transform -translate-y-1/2 animate-[scan_2s_ease-in-out_infinite]"></div>
                    <Scan className="h-16 w-16 text-primary/70" />
                  </>
                ) : (
                  <div className="text-center p-4">
                    <Camera className="h-16 w-16 text-primary/70 mx-auto mb-4" />
                    <p className="text-muted-foreground">Position the QR code within this area</p>
                  </div>
                )}
              </div>

              <Button
                className="w-full rounded-full h-14 text-lg font-bold"
                onClick={handleStartScan}
                disabled={scanning}
              >
                {scanning ? "Scanning..." : "Start Scanning"}
              </Button>
            </div>

            <div className="uber-card w-full max-w-sm">
              <div className="p-5">
                <h3 className="font-bold text-lg mb-4">Scanning Instructions</h3>
                <ol className="space-y-3 list-decimal pl-5">
                  <li>Make sure the QR code is clearly visible</li>
                  <li>Position the QR code within the scanning area</li>
                  <li>Hold steady until the scan completes</li>
                  <li>Verify the order details after scanning</li>
                </ol>
              </div>
            </div>
          </>
        )}
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% {
            top: 0;
          }
          50% {
            top: 100%;
          }
          100% {
            top: 0;
          }
        }
      `}</style>
    </div>
  )
}

