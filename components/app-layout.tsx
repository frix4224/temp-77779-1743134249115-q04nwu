"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, ClipboardList, CheckSquare, Wrench, Truck, DollarSign, Settings, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { EazyLogo } from "./eazy-logo"
import { MobileNav } from "./mobile-nav"

interface AppLayoutProps {
  children: React.ReactNode
}

export function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Orders", href: "/orders", icon: ClipboardList },
    { name: "Check-In", href: "/check-in", icon: CheckSquare },
    { name: "Processing", href: "/processing", icon: Wrench },
    { name: "Delivery", href: "/delivery", icon: Truck },
    { name: "Quotes", href: "/quotes", icon: DollarSign },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-1 border-r">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b">
            <EazyLogo className="h-8 w-auto" />
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
            <nav className="flex-1 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    pathname === item.href ? "bg-accent text-primary font-medium" : "text-foreground hover:bg-muted",
                    "group flex items-center px-3 py-2.5 text-sm rounded-md transition-colors",
                  )}
                >
                  <item.icon
                    className={cn(
                      pathname === item.href ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                      "mr-3 flex-shrink-0 h-5 w-5",
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-background border-b md:hidden">
          <div className="flex-1 flex items-center justify-between px-4">
            <EazyLogo className="h-8 w-auto" />

            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0">
                <div className="flex items-center justify-between h-16 px-4 border-b">
                  <EazyLogo className="h-8 w-auto" />
                  <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <nav className="flex-1 px-2 pt-5 pb-4 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        pathname === item.href
                          ? "bg-accent text-primary font-medium"
                          : "text-foreground hover:bg-muted",
                        "group flex items-center px-3 py-3 text-sm rounded-md",
                      )}
                    >
                      <item.icon
                        className={cn(
                          pathname === item.href ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                          "mr-3 flex-shrink-0 h-5 w-5",
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-hidden">{children}</main>

        {/* Mobile bottom navigation */}
        <MobileNav currentPath={pathname} />
      </div>
    </div>
  )
}

