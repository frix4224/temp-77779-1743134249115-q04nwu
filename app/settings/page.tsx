"use client"

import { useState } from "react"
import { AppLayout } from "@/components/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export default function SettingsPage() {
  const [language, setLanguage] = useState("en")
  const [notifications, setNotifications] = useState({
    newOrders: true,
    statusUpdates: true,
    issues: true,
    appUpdates: false,
  })

  const handleSaveProfile = () => {
    // In a real app, we would save this to Supabase
    alert("Profile saved!")
  }

  const handleSendFeedback = () => {
    // In a real app, we would submit this to Supabase
    alert("Feedback sent!")
  }

  return (
    <AppLayout>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold mb-2">Settings</h1>
          <p className="text-sm text-muted-foreground">Manage your account and preferences</p>
        </div>

        <div className="flex-1 overflow-auto p-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="John Doe" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john.doe@example.com" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" defaultValue="(555) 123-4567" />
              </div>

              <Button onClick={handleSaveProfile}>Save Changes</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your app experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-3">
                <h3 className="text-sm font-medium">Notifications</h3>

                <div className="flex items-center justify-between">
                  <Label htmlFor="new-orders" className="flex-1">
                    New orders
                  </Label>
                  <Switch
                    id="new-orders"
                    checked={notifications.newOrders}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, newOrders: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="status-updates" className="flex-1">
                    Status updates
                  </Label>
                  <Switch
                    id="status-updates"
                    checked={notifications.statusUpdates}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, statusUpdates: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="issues" className="flex-1">
                    Issues and alerts
                  </Label>
                  <Switch
                    id="issues"
                    checked={notifications.issues}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, issues: checked })}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="app-updates" className="flex-1">
                    App updates
                  </Label>
                  <Switch
                    id="app-updates"
                    checked={notifications.appUpdates}
                    onCheckedChange={(checked) => setNotifications({ ...notifications, appUpdates: checked })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Support</CardTitle>
              <CardDescription>Get help or provide feedback</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="feedback">App Feedback</Label>
                <Textarea id="feedback" placeholder="Share your thoughts about the app..." rows={4} />
              </div>

              <Button onClick={handleSendFeedback}>Send Feedback</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  )
}

