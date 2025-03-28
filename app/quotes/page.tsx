"use client"

import { useRouter } from "next/navigation"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockQuoteRequests } from "@/lib/mock-data"

export default function QuotesPage() {
  const router = useRouter()

  const handleCreateQuote = (id: string) => {
    router.push(`/quotes/${id}`)
  }

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold mb-2">Custom Quotes</h1>
          <p className="text-sm text-muted-foreground mb-4">Create and manage custom price quotes</p>
        </div>

        <div className="flex-1 overflow-auto p-4">
          {mockQuoteRequests.length > 0 ? (
            <div className="space-y-4">
              {mockQuoteRequests.map((request) => (
                <Card key={request.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{request.customerName}</h3>
                        <p className="text-sm text-muted-foreground">Requested: {request.date}</p>
                      </div>
                      <Badge className={request.status === "pending" ? "bg-amber-500" : "bg-green-500"}>
                        {request.status === "pending" ? "Pending" : "Completed"}
                      </Badge>
                    </div>

                    <p className="text-sm mb-4">{request.description}</p>

                    <div className="flex justify-end">
                      <Button onClick={() => handleCreateQuote(request.id)} disabled={request.status !== "pending"}>
                        {request.status === "pending" ? "Create Quote" : "View Quote"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-4 text-center">
              <p className="text-muted-foreground mb-4">No quote requests available</p>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  )
}

