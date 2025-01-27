"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("issue")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would handle the form submission
    toast({
      title: activeTab === "issue" ? "Certificate Issued" : "Certificate Revoked",
      description: "The operation was successful.",
    })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Certificates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Certificates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,180</div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="issue">Issue Certificate</TabsTrigger>
          <TabsTrigger value="revoke">Revoke Certificate</TabsTrigger>
        </TabsList>
        <TabsContent value="issue">
          <Card>
            <CardHeader>
              <CardTitle>Issue New Certificate</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="recipientAddress">Recipient Address</Label>
                    <Input id="recipientAddress" placeholder="0x..." required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="studentName">Student Name</Label>
                    <Input id="studentName" placeholder="John Doe" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="studentId">Student ID</Label>
                    <Input id="studentId" placeholder="12345" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="courseName">Course Name</Label>
                    <Input id="courseName" placeholder="Introduction to Blockchain" required />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="grade">Grade</Label>
                    <Input id="grade" type="number" min="0" max="100" placeholder="95" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ipfsUri">IPFS URI</Label>
                    <Input id="ipfsUri" placeholder="ipfs://..." required />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Issue Certificate
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="revoke">
          <Card>
            <CardHeader>
              <CardTitle>Revoke Certificate</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="certificateId">Certificate ID</Label>
                  <Input id="certificateId" placeholder="Enter certificate ID" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="revocationReason">Reason for Revocation</Label>
                  <Input id="revocationReason" placeholder="Enter reason" required />
                </div>
                <Button type="submit" variant="destructive" className="w-full">
                  Revoke Certificate
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

