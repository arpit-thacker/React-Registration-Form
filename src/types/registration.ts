export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  countryCode: string;
  mobile: string;
  state: string;
  city: string;
  gender: "Male" | "Female" | "Other" | null;
  password: string;
  confirmPassword: string;
  rememberMe: boolean;
  agreeTerms: boolean;

  registrationDateTime: string;
}

export interface RegistrationErrors {

  firstName?: string;
  lastName?: string;
  email?: string;
  companyName?: string;
  mobile?: string;
  state?: string;
  city?: string;
  gender?: string;
  password?: string;
  confirmPassword?: string;
  strength?: string;
  agreeTerms?: string;
}