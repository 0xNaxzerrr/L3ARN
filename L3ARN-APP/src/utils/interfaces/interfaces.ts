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
