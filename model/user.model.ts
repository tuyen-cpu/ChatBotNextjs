export interface JwtUser {
  id?: number,
  firstName?: string,
  lastName?: string,
  email?: string,
  accessToken: string
}

export interface SignInForm {
  email: string
  password: string
}

export interface SignUpForm {
  firstName: string
  lastName: string
  email: string
  password: string
}