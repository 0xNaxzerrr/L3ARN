export interface CertificateData {
  studentName: string;
  studentId: bigint;
  courseName: string;
  graduationYear: bigint;
  grade: string;
  isValid: boolean;
  timestamp: bigint;
}

export interface CertificateFormData {
  address: string;
  studentName: string;
  studentId: string;
  courseName: string;
  grade: string;
  uri: string;
}

export interface RevocationFormData {
  tokenId: string;
  reason: string;
}
