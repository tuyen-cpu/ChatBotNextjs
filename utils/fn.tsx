import { useRouter } from 'next/router'
import jwtDecode from 'jwt-decode'

import DecodedToken from '@/model/DecodedToken'
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto'
import { JwtUser } from '@/model/user.model'
import { JWTPayload, jwtVerify } from 'jose'

export const handleError = (err: any) => {
  if (err.response) {
    throw new Error(err.response?.data?.message)
  } else {
    throw new Error('Server no responding!')
  }
}

// export const encryptCredential = (credential: string) => {
//   const algorithm = 'aes-256-cbc'
//   const secretKey = 'HcKp4s4W4zv28chMjKmfJtHYA6EYPScX'
//   const iv = randomBytes(16)
//   const cipher = createCipheriv(algorithm, secretKey, iv)
//   const encrypted = cipher.update(credential, 'utf8', 'hex') + cipher.final('hex')
//   return `${iv.toString('hex')}:${encrypted}`
// }

// export const decryptCredential = (credential: string) => {
//   const algorithm = 'aes-256-cbc'
//   const secretKey = 'HcKp4s4W4zv28chMjKmfJtHYA6EYPScX'
//   const [ivHex, encryptedHex] = credential.split(':')
//   const iv = Buffer.from(ivHex, 'hex')
//   const encrypted = Buffer.from(encryptedHex, 'hex')
//   const decipher = createDecipheriv(algorithm, secretKey, iv)
//   const decrypted = (decipher.update(encrypted) + decipher.final('utf8')).toString()
//   return decrypted
// }

// export const navigateUrl = (router: any, url: string, parameter?: any) => {
//   setTimeout(() => parameter ? router.push(`/${url}/${parameter}`) : router.push(`/${url}`), 2000)
// }

// export const userDetails = (userData: JwtUser) => {
//   let decodedToken: DecodedToken = jwtDecode(userData.accessToken)
//   localStorage.setItem('userDetails', JSON.stringify({
//     token_expired: encryptCredential(decodedToken.expired.toString()),
//     email: encryptCredential(decodedToken.email),
//   }))
// }

// export const checkAuth = () => {
//   const storedUser = localStorage.getItem('userDetails') || null
//   if (storedUser) {
//     const user = JSON.parse(storedUser)
//     if (user.email && user.token_expired) {
//       const expired_date = new Date(Date.parse(decryptCredential(user.token_expired)))
//       const now = new Date()
//       if (expired_date.getTime() < now.getTime()) {
//         localStorage.removeItem('userDetails')
//         return false
//       } else {
//         return true
//       }
//     }
//   } else {
//     return false
//   }
// }

export async function verify(token: string, secret: string): Promise<JWTPayload> {
  const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
  return payload;
}
export const popupCenter = (url: string, title: string) => {
  const dualScreenLeft = window.screenLeft ?? window.screenX
  const dualScreenTop = window.screenTop ?? window.screenY

  const width = window.innerWidth ?? document.documentElement.clientWidth ?? screen.width

  const height = window.innerHeight ?? document.documentElement.clientHeight ?? screen.height

  const systemZoom = width / window.screen.availWidth

  const left = (width - 500) / 2 / systemZoom + dualScreenLeft
  const top = (height - 550) / 2 / systemZoom + dualScreenTop

  const newWindow = window.open(
    url,
    title,
    `width=${500 / systemZoom},height=${550 / systemZoom},top=${top},left=${left}`
  )
  newWindow?.focus()
}


