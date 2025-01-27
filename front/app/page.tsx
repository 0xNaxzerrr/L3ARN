import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, Shield, CheckCircle, ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <section className="text-center mb-16 animate-fade-in">
        <h1 className="text-5xl font-bold mb-4 gradient-text">Welcome to L3ARN</h1>
        <p className="text-xl text-gray-800 mb-8">Secure and verifiable academic certificates on the blockchain</p>
        <Button size="lg" className="animate-slide-up">
          Get Started
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </section>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="mr-2 h-6 w-6 text-blue-500" />
              Issue Certificates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Easily issue tamper-proof academic certificates that are securely stored on the blockchain.
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="mr-2 h-6 w-6 text-green-500" />
              Verify Authenticity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Instantly verify the authenticity of certificates using our blockchain-based verification system.
            </p>
          </CardContent>
        </Card>

        <Card className="card-hover">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="mr-2 h-6 w-6 text-purple-500" />
              Manage Credentials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Students can easily access and share their verified academic credentials anytime, anywhere.
            </p>
          </CardContent>
        </Card>
      </div>

      <section className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
        <p className="text-xl text-gray-600 mb-8">
          L3ARN leverages blockchain technology to create a secure and transparent system for academic certificates.
        </p>
        <div className="flex justify-center space-x-4">
          <Link href="/about">
            <Button variant="outline">Learn More</Button>
          </Link>
          <Link href="/register">
            <Button>Sign Up Now</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

