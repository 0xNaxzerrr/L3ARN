export interface MintForm {
  studentAddress: string;
  programName: string;
  startYear: number;
  endYear: number;
  file: File | null;
}

export interface UpdateForm {
  tokenId: string;
  newStatus: string;
}

export interface UploadResult {
  ipfsHash: string;
  ipfsUrl: string;
}

export interface MintFormProps {
  mintForm: MintForm;
  handleFormChange: (
    formName: "mint",
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleSubmit: (formName: "mint", e: React.FormEvent<HTMLFormElement>) => void;
  isUploading: boolean;
  isReadyToMint: boolean;
  isPending: boolean;
}

export interface UpdateFormProps {
  updateForm: UpdateForm;
  handleFormChange: (
    formName: "update",
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
  handleSubmit: (
    formName: "update",
    e: React.FormEvent<HTMLFormElement>
  ) => void;
  isPending: boolean;
}

export interface Course {
  courseName: string;
  grade: string;
  result: string;
  comments: string;
}

export interface ProgramCertificate {
  id: string;
  programName: string;
  startYear: string;
  endYear: string;
  status: string;
  academicProgresses: Array<{
    studentId: string;
    year: string;
    nftId: string;
  }>;
}

export interface PerformanceCertificate {
  id: string;
  year: string;
  studentId: string;
  studentName: string;
  courses: Course[];
  yearStartDate: string;
  yearEndDate: string;
  academicStatus: {
    status: string;
    comments: string;
  };
}

export interface AcademicStatus {
  status: string;
  comments: string;
}
export interface AcademicProgress {
  studentId: string;
  year: string;
  nftId: string;
}
export interface ProgramDetails {
  programName: string;
  startYear: number;
  endYear: number;
  programStatus: {
    status: number;
    comments: string;
  };
  academicProgresses: AcademicProgress[];
}

export interface PerformanceDetails {
  year: string;
  studentId: string;
  studentName: string;
  courses: Course[];
  yearStartDate: number;
  yearEndDate: number;
  academicStatus: AcademicStatus;
}
