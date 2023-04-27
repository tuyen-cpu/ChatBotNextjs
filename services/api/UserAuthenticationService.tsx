import axios from 'axios'
import { SignInForm, SignUpForm } from '../../model/user.model'
import { handleError } from '@/utils/fn'

const URL = 'http://localhost:5000'

const signUp = async (user: SignUpForm) => {
  try {
    const response = await axios.post(`${URL}/register`, user)
    return response.data
  } catch (err) {
    handleError(err)
  }
}

const signIn = async (user: SignInForm) => {
  try {
    const response = await axios.post(`${URL}/login`, user)
    return response.data
  } catch (err: any) {
    handleError(err)
  }
}

const UserAuthenticationService = {
  signUp,
  signIn,
}

export default UserAuthenticationService
