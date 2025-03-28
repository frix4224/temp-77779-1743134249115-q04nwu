// This file contains mock data for the application
// In a real app, this would be fetched from Supabase

export const mockOrders = [
  {
    id: "order-1",
    orderNumber: "1001",
    customerName: "John Smith",
    date: "2023-03-25",
    status: "arrived_at_facility",
    total: 45.99,
    items: [
      { name: "T-Shirt", quantity: 2, price: 12.99, scanned: true },
      { name: "Jeans", quantity: 1, price: 20.0, scanned: false },
    ],
    notes: "Please handle with care.",
  },
  {
    id: "order-2",
    orderNumber: "1002",
    customerName: "Sarah Johnson",
    date: "2023-03-25",
    status: "arrived_at_facility",
    total: 78.5,
    items: [
      { name: "Dress", quantity: 1, price: 45.0, scanned: true },
      { name: "Blouse", quantity: 2, price: 16.75, scanned: true },
    ],
  },
  {
    id: "order-3",
    orderNumber: "1003",
    customerName: "Michael Brown",
    date: "2023-03-24",
    status: "processing",
    total: 112.75,
    items: [
      { name: "Suit", quantity: 1, price: 89.99, scanned: true },
      { name: "Tie", quantity: 1, price: 22.75, scanned: true },
    ],
  },
  {
    id: "order-4",
    orderNumber: "1004",
    customerName: "Emily Davis",
    date: "2023-03-24",
    status: "processing",
    total: 67.25,
    items: [
      { name: "Sweater", quantity: 1, price: 35.5, scanned: true },
      { name: "Skirt", quantity: 1, price: 31.75, scanned: true },
    ],
    notes: "Stain on sweater sleeve.",
  },
  {
    id: "order-5",
    orderNumber: "1005",
    customerName: "David Wilson",
    date: "2023-03-23",
    status: "ready_for_delivery",
    total: 93.0,
    items: [
      { name: "Jacket", quantity: 1, price: 65.0, scanned: true },
      { name: "Pants", quantity: 2, price: 14.0, scanned: true },
    ],
  },
  {
    id: "order-6",
    orderNumber: "1006",
    customerName: "Jennifer Taylor",
    date: "2023-03-23",
    status: "ready_for_delivery",
    total: 54.5,
    items: [
      { name: "Blouse", quantity: 2, price: 18.25, scanned: true },
      { name: "Scarf", quantity: 1, price: 18.0, scanned: true },
    ],
  },
]

export const mockQuoteRequests = [
  {
    id: "quote-1",
    customerName: "Robert Anderson",
    date: "2023-03-25",
    status: "pending",
    description: "Wedding dress with intricate beadwork and lace details. Needs special cleaning and preservation.",
    images: [1, 2], // In a real app, these would be URLs to images
  },
  {
    id: "quote-2",
    customerName: "Lisa Martinez",
    date: "2023-03-24",
    status: "pending",
    description: "Vintage leather jacket with some stains and a torn pocket. Needs repair and cleaning.",
    images: [1],
  },
  {
    id: "quote-3",
    customerName: "Thomas Clark",
    date: "2023-03-23",
    status: "completed",
    description: "Set of 4 silk curtains with water damage. Need special treatment.",
    images: [1, 2, 3],
  },
]

