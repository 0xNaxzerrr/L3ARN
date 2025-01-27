"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, CheckCircle, XCircle } from "lucide-react"

export default function VerifyPage() {
  const [certificateId, setCertificateId] = useState("")
  const [verificationResult, setVerificationResult] = useState<"valid" | "invalid" | null>(null)

  const handleVerify = () => {
    // Simulate verification process
    setTimeout(() => {
      setVerificationResult(Math.random() > 0.5 ? "valid" : "invalid")
    }, 1000)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Verify Certificate</h1>

      <div className="flex gap-4 mb-8">
        <Input
          type="text"
          placeholder="Enter certificate ID"
          value={certificateId}
          onChange={(e) => setCertificateId(e.target.value)}
          className="flex-grow"
        />
        <Button onClick={handleVerify} disabled={!certificateId}>
          <Search className="w-4 h-4 mr-2" />
          Verify
        </Button>
      </div>

      {verificationResult && (
        <Card className={verificationResult === "valid" ? "bg-green-50" : "bg-red-50"}>
          <CardHeader>
            <CardTitle className="flex items-center">
              {verificationResult === "valid" ? (
                <>
                  <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                  Valid Certificate
                </>
              ) : (
                <>
                  <XCircle className="w-6 h-6 text-red-500 mr-2" />
                  Invalid Certificate
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              {verificationResult === "valid"
                ? "This certificate is authentic and has been verified on the blockchain."
                : "This certificate could not be verified. It may be invalid or revoked."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

