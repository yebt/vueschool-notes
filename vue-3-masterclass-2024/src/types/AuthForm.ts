
export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm extends LoginForm{
  username: string
  fistName: string
  lastName: string
  confirmPassword: string
}
