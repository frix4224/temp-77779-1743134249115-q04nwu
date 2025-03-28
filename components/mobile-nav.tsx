"use client"

import Link from "next/link"
import { LayoutDashboard, ClipboardList, CheckSquare, Wrench, Truck } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileNavProps {
  currentPath: string
}

export function MobileNav({ currentPath }: MobileNavProps) {
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Orders", href: "/orders", icon: ClipboardList },
    { name: "Check-In", href: "/check-in", icon: CheckSquare },
    { name: "Processing", href: "/processing", icon: Wrench },
    { name: "Delivery", href: "/delivery", icon: Truck },
  ]

  return (
    <div className="uber-bottom-nav">
      <div className="grid grid-cols-5">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn("bottom-tab", currentPath === item.href ? "bottom-tab-active" : "bottom-tab-inactive")}
          >
            <item.icon className="h-6 w-6 mb-1" />
            <span>{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

