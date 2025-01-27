"use client"

import { useState } from "react"
import { CertificateCard } from "@/components/CertificateCard"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

const certificates = [
  {
    id: 1,
    courseName: "Introduction to Blockchain",
    studentName: "Alice Johnson",
    grade: 95,
    year: 2023,
    status: "Valid",
    category: "IT & Software",
  },
  {
    id: 2,
    courseName: "Business Analytics",
    studentName: "Alice Johnson",
    grade: 88,
    year: 2023,
    status: "Valid",
    category: "Business",
  },
  {
    id: 3,
    courseName: "Cybersecurity Fundamentals",
    studentName: "Alice Johnson",
    grade: 92,
    year: 2022,
    status: "Valid",
    category: "IT & Software",
  },
  // Add more certificates as needed
]

export default function StudentPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("date")

  const filteredCertificates = certificates.filter((cert) =>
    cert.courseName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedCertificates = [...filteredCertificates].sort((a, b) => {
    if (sortBy === "date") return b.year - a.year
    if (sortBy === "name") return a.courseName.localeCompare(b.courseName)
    return 0
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 gradient-text">My Certificates</h1>

      <div className="flex justify-between items-center mb-8">
        <div className="relative w-64">
          <Input
            type="text"
            placeholder="Search certificates"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Sort by Date</SelectItem>
            <SelectItem value="name">Sort by Name</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {sortedCertificates.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No certificates found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCertificates.map((cert) => (
            <CertificateCard key={cert.id} certificate={cert} />
          ))}
        </div>
      )}
    </div>
  )
}

