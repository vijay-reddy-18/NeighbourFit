export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  buttons?: ButtonOption[];
}

export interface ButtonOption {
  label: string;
  value: string;
  action: string;
}

export interface ChatState {
  currentStep: string;
  userInterested: boolean | null;
  hasBiology: boolean | null;
  wantsMoreInfo: boolean | null;
  askedAbout: string[];
  language: string;
}

export interface Language {
  code: string;
  name: string;
  nativeName: string;
}

export interface AdmissionFormData {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  state: string;
  city: string;
  pincode: string;
  qualification: string;
  percentage: string;
  boardUniversity: string;
  passingYear: string;
  fatherName: string;
  motherName: string;
  category: string;
  hasDisability: boolean;
  disabilityDetails?: string;
}