import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getStatusColor(status: string) {
  switch (status) {
    case "arrived_at_facility":
      return "bg-blue-500"
    case "processing":
      return "bg-amber-500"
    case "ready_for_delivery":
      return "bg-green-500"
    default:
      return "bg-gray-500"
  }
}

export function getStatusBadgeClass(status: string) {
  switch (status) {
    case "arrived_at_facility":
      return "status-badge-check-in"
    case "processing":
      return "status-badge-processing"
    case "ready_for_delivery":
      return "status-badge-ready"
    default:
      return "bg-gray-100 text-gray-700 border border-gray-300"
  }
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount)
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase()
    .substring(0, 2)
}

