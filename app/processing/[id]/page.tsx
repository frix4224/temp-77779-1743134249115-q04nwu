"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, Minus, Camera, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { mockOrders } from "@/lib/mock-data"
import { formatCurrency } from "@/lib/utils"

export default function ProcessOrderPage({ params }: { params: { id: string } }) {
  const router = useRouter()

  // In a real app, we would fetch this from Supabase
  const order = mockOrders.find((o) => o.id === params.id) || mockOrders[0]

  const [items, setItems] = useState(order.items)
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: 1,
    price: 0,
    category: "",
    reason: "",
    notes: "",
  })

  const handleBack = () => {
    router.back()
  }

  const handleQuantityChange = (index: number, change: number) => {
    const updatedItems = [...items]
    const newQuantity = Math.max(1, updatedItems[index].quantity + change)
    updatedItems[index].quantity = newQuantity
    setItems(updatedItems)
  }

  const handleAddItem = () => {
    // In a real app, we would submit this to Supabase
    setItems([
      ...items,
      {
        ...newItem,
        scanned: true,
        unexpected: true,
      },
    ])
    setIsAddingItem(false)
    setNewItem({
      name: "",
      quantity: 1,
      price: 0,
      category: "",
      reason: "",
      notes: "",
    })
  }

  const handleCompleteProcessing = () => {
    // In a real app, we would update the status in Supabase
    alert("Processing completed! Order moved to ready for delivery.")
    router.push("/processing")
  }

  // Calculate total based on current items
  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0)

  return (
    <div className="flex flex-col h-screen bg-background pb-16 md:pb-0">
      {/* Header */}
      <header className="uber-header">
        <Button variant="ghost" size="icon" className="rounded-full" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-bold ml-2">Process Order</h1>

        <div className="ml-auto">
          <Dialog open={isAddingItem} onOpenChange={setIsAddingItem}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-full gap-1">
                <Plus className="h-4 w-4" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl">
              <DialogHeader>
                <DialogTitle>Add Unexpected Item</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="item-name">Item Name</Label>
                  <Input
                    id="item-name"
                    className="rounded-full"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      className="rounded-full"
                      value={newItem.quantity}
                      onChange={(e) => setNewItem({ ...newItem, quantity: Number.parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      min="0"
                      className="rounded-full"
                      value={newItem.price}
                      onChange={(e) => setNewItem({ ...newItem, price: Number.parseFloat(e.target.value) })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newItem.category}
                    onValueChange={(value) => setNewItem({ ...newItem, category: value })}
                  >
                    <SelectTrigger id="category" className="rounded-full">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="shirts">Shirts</SelectItem>
                      <SelectItem value="pants">Pants</SelectItem>
                      <SelectItem value="dresses">Dresses</SelectItem>
                      <SelectItem value="outerwear">Outerwear</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    className="rounded-xl"
                    placeholder="Add any additional details..."
                    value={newItem.notes}
                    onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
                  />
                </div>

                <Button variant="outline" className="w-full rounded-full">
                  <Camera className="h-4 w-4 mr-2" />
                  Take Photo
                </Button>
              </div>
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setIsAddingItem(false)} className="rounded-full flex-1">
                  Cancel
                </Button>
                <Button onClick={handleAddItem} className="rounded-full flex-1">
                  Add Item
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      {/* Content */}
      <div className="uber-content">
        {/* Order info */}
        <div className="bg-white p-5">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold">Order #{order.orderNumber}</h2>
              <p className="text-muted-foreground">{order.customerName}</p>
            </div>
            <Badge className="status-badge-processing">Processing</Badge>
          </div>
        </div>

        {/* Items */}
        <div className="p-5 mt-2">
          <h3 className="uber-section-title">Items</h3>
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className={`uber-card ${item.unexpected ? "border-l-4 border-l-amber-500" : ""}`}>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center">
                        <p className="font-bold">{item.name}</p>
                        {item.unexpected && (
                          <Badge
                            variant="outline"
                            className="ml-2 text-amber-500 border-amber-500 text-xs rounded-full"
                          >
                            Unexpected
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{formatCurrency(item.price)} each</p>
                    </div>

                    <div className="flex items-center bg-muted/30 rounded-full p-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
                        onClick={() => handleQuantityChange(index, -1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="mx-3 w-6 text-center font-bold">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
                        onClick={() => handleQuantityChange(index, 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t">
                    <span className="text-sm text-muted-foreground">Subtotal</span>
                    <span className="font-bold">{formatCurrency(item.quantity * item.price)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="p-5">
          <div className="uber-card">
            <div className="p-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-primary">{formatCurrency(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer button */}
      <div className="uber-footer-button">
        <Button className="w-full rounded-full h-14 gap-2 text-base font-bold" onClick={handleCompleteProcessing}>
          <Check className="h-5 w-5" />
          Complete Processing
        </Button>
      </div>
    </div>
  )
}

