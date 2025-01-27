import { Star, User, Calendar, Tag } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Certificate {
  id: number
  courseName: string
  studentName: string
  grade: number
  year: number
  status: "Valid" | "Revoked"
  category: string
}

export function CertificateCard({ certificate }: { certificate: Certificate }) {
  const { courseName, studentName, grade, year, status, category } = certificate

  const gradeToStars = (grade: number) => {
    return Math.round((grade / 100) * 5)
  }

  const getStatusColor = (status: string) => {
    return status === "Valid" ? "bg-green-500 text-white" : "bg-red-500 text-white"
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "IT & Software": "bg-blue-500 text-white",
      Business: "bg-purple-500 text-white",
      // Add more categories and colors as needed
    }
    return colors[category] || "bg-gray-500 text-white"
  }

  return (
    <Card className="card-hover card-certificate overflow-hidden">
      <div className={`h-2 ${status === "Valid" ? "bg-green-500" : "bg-red-500"}`} />
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold line-clamp-1 text-gray-800">{courseName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-2 text-sm text-gray-600">
          <User className="w-4 h-4 mr-2" />
          <span className="font-medium">{studentName}</span>
        </div>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < gradeToStars(grade) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
            />
          ))}
          <span className="ml-2 text-sm font-medium text-gray-600">{grade}%</span>
        </div>
        <div className="flex items-center mb-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{year}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge variant="secondary" className={getStatusColor(status)}>
            {status}
          </Badge>
          <Badge variant="secondary" className={getCategoryColor(category)}>
            <Tag className="w-3 h-3 mr-1" />
            {category}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

