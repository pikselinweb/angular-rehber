export interface LOGIN_FORM {
  email: string;
  password: string;
}
export interface REGISTER_FORM extends LOGIN_FORM {
  fullName: string;
  passwordConfirm?:string;
  bio?: string;
}
