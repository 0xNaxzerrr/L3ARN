'use client';

import { Star, UserCircle } from 'lucide-react';

interface CertificateData {
  studentName: string;
  studentId: bigint;
  courseName: string;
  graduationYear: bigint;
  grade: string;
  isValid: boolean;
  timestamp: bigint;
}

interface CertificateCardProps {
  certificate: CertificateData;
}

export function CertificateCard({ certificate }: CertificateCardProps) {
  const gradeToNumber = (grade: string) => {
    // Convertit la note en nombre pour l'affichage des étoiles
    const match = grade.match(/(\d+)/);
    if (match) {
      return Math.min(Math.round(parseInt(match[1]) / 20 * 5), 5);
    }
    return 0;
  };

  return (
    <div className={`
      relative rounded-xl overflow-hidden
      ${certificate.isValid ? 'bg-white' : 'bg-gray-50'}
      shadow-sm hover:shadow-md transition-shadow
      border border-gray-100
    `}>
      {/* Header with category and rating */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Academic Certificate
          </span>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
            <span className="ml-1 text-sm text-gray-600">
              {gradeToNumber(certificate.grade)}/5
            </span>
          </div>
        </div>

        {/* Course Title */}
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {certificate.courseName}
        </h3>

        {/* Student Info */}
        <div className="flex items-center text-sm text-gray-500 mb-4">
          <UserCircle className="w-4 h-4 mr-1" />
          {certificate.studentName}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Year</p>
            <p className="font-medium">{certificate.graduationYear.toString()}</p>
          </div>
          <div>
            <p className="text-gray-500">Grade</p>
            <p className="font-medium">{certificate.grade}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500">
            ID: {certificate.studentId.toString()}
          </span>
          <span className={`
            px-2 py-1 rounded-full text-xs font-medium
            ${certificate.isValid 
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
            }
          `}>
            {certificate.isValid ? 'Valid' : 'Revoked'}
          </span>
        </div>
      </div>
    </div>
  );
}
