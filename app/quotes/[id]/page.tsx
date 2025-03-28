"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Image, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { mockQuoteRequests } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"

export default function CreateQuotePage({ params }: { params: { id: string } }) {
  const router = useRouter()

  // In a real app, we would fetch this from Supabase
  const quoteRequest = mockQuoteRequests.find((q) => q.id === params.id) || mockQuoteRequests[0]

  const [items, setItems] = useState([
    { name: "Item 1", price: 25.0, quantity: 1 },
    { name: "Item 2", price: 15.5, quantity: 2 },
  ])
  const [notes, setNotes] = useState("")

  const handleBack = () => {
    router.back()
  }

  const handleAddItem = () => {
    setItems([...items, { name: `Item ${items.length + 1}`, price: 0, quantity: 1 }])
  }

  const handleRemoveItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const handleItemChange = (index: number, field: string, value: any) => {
    const updatedItems = [...items]
    updatedItems[index] = { ...updatedItems[index], [field]: value }
    setItems(updatedItems)
  }

  const handleSubmitQuote = () => {
    // In a real app, we would submit this to Supabase
    alert("Quote submitted successfully!")
    router.push("/quotes")
  }

  // Calculate total
  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0)

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="flex items-center p-4 border-b">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-semibold ml-2">Create Quote</h1>
      </header>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        <Card>
          <CardContent className="p-4">
            <h2 className="font-semibold mb-2">Customer Information</h2>
            <p className="text-sm">{quoteRequest.customerName}</p>
            <p className="text-sm text-muted-foreground">Requested: {quoteRequest.date}</p>
          </CardContent>
        </Card>

        <div>
          <h3 className="font-semibold mb-2">Request Details</h3>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm">{quoteRequest.description}</p>
            </CardContent>
          </Card>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Request Images</h3>
          <div className="grid grid-cols-2 gap-2">
            {quoteRequest.images.map((image, index) => (
              <div key={index} className="aspect-square bg-muted rounded-md flex items-center justify-center">
                <Image className="h-8 w-8 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold">Quote Items</h3>
            <Button variant="outline" size="sm" onClick={handleAddItem}>
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>

          <div className="space-y-3">
            {items.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-3">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`item-name-${index}`}>Item</Label>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => handleRemoveItem(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <Input
                      id={`item-name-${index}`}
                      value={item.name}
                      onChange={(e) => handleItemChange(index, "name", e.target.value)}
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor={`item-quantity-${index}`}>Quantity</Label>
                        <Input
                          id={`item-quantity-${index}`}
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, "quantity", Number.parseInt(e.target.value) || 1)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`item-price-${index}`}>Price ($)</Label>
                        <Input
                          id={`item-price-${index}`}
                          type="number"
                          step="0.01"
                          min="0"
                          value={item.price}
                          onChange={(e) => handleItemChange(index, "price", Number.parseFloat(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>{formatCurrency(total)}</span>
          </div>
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes">Admin Notes</Label>
          <Textarea
            id="notes"
            placeholder="Add any additional notes..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
          />
        </div>

        <div className="pt-4">
          <Button className="w-full" size="lg" onClick={handleSubmitQuote}>
            Submit Quote
          </Button>
        </div>
      </div>
    </div>
  )
}

