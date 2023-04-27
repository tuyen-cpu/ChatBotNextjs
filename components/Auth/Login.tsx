import { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import { CircularProgress } from '@mui/material'
import Link from 'next/link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import UserAuthenticationService from '@/services/api/UserAuthenticationService'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import LoadingButton from '@mui/lab/LoadingButton'
import { Regex } from '@/utils/constant'
import { useRouter } from 'next/router';
// import {navigateUrl} from '@/utils/fn'
// import FormSignIn from '@/model/FormSignIn'
// import { userDetails,checkAuth,encryptCredential,decryptCredential } from '@/utils/fn'
import LoadingIcon from '@/components/LoadingIcon'
import { SignInForm } from '@/model/user.model'
import { getSession, signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import { popupCenter } from '@/utils/fn'
import Button from '@mui/material/Button'
const schema = yup.object().shape({
  email: yup
    .string()
    .matches(Regex.EMAIL, 'Email must be a valid chatform address')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
})

export default function Login() {
  const router = useRouter()
  const [notify, setNotify] = useState<{ type: 'success' | 'error'; message: string }>({
    type: 'success',
    message: '',
  })
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loadingMessage,setLoadingMessage] = useState('')
  const { data: session, status } = useSession()
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SignInForm>({
    resolver: yupResolver(schema),
    mode: 'all',
  })
  const [loginSuccess, setIsLoginSuccess] = useState(false)
  const onSubmit = async (data: SignInForm) => {
    setIsLoading(true)
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: `${
          router.query.callbackUrl ? router.query.callbackUrl : window.location.origin
        }`,
      })
      if (result?.ok) {
        setNotify({ type: 'success', message: 'đăng nhập thành côngh' })
        setSnackbarOpen(true)
      }
      if (result?.error) {
        setNotify({ type: 'error', message: result.error })
        setSnackbarOpen(true)
      } else if (result?.url) {
        console.log('🚀 ~ file: Login.tsx:76 ~ onSubmit ~ result?.url:', result?.url)
        router.push(result.url)
      }
    } catch (error: any) {
      setNotify({ type: 'error', message: error.error })
      setSnackbarOpen(true)
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 400)
    }

    // UserAuthenticationService.signIn(data)
    //   .then((res) => {
    //     setNotify({ type: 'success', message: res.message })
    //     setSnackbarOpen(true)
    //     setIsLoginSucess(true)
    //     userDetails(res)
    //     navigateUrl(router, 'auth/chatform', encryptCredential(res.data.email))
    //   })
    //   .catch((error) => {
    //     setNotify({ type: 'error', message: error.message })
    //     setSnackbarOpen(true)
    //     setIsLoading(false)
    //   })
  }
  // const verification = () => {
  //   if (checkAuth()) {
  //     const userDetails = localStorage.getItem('userDetails')
  //     if (userDetails) {
  //       const user = JSON.parse(userDetails)
  //       let userEmail = user.email
  //       const decodedEmail = decryptCredential(userEmail)
  //       navigateUrl(router, 'auth/chatform', decodedEmail)
  //     }
  //   }
  // }

  // useEffect(() => {
  //   verification()
  // }, [])

  // useEffect(() => {
  //   console.log('🚀 ~ file: Login.tsx:117 ~ useEffect ~ status:', status)
  //   if (status === 'loading') {
  //     setIsLoginSuccess(true)
  //   } else {
  //     setIsLoginSuccess(false)
  //   }
  //   if (status === 'authenticated') {
  //     setIsLoginSuccess(false)
  //     router.push('/chatform/sss', undefined, { shallow: true })
  //   }
  // }, [status, session, router])
  return (
      <Container component="main" maxWidth="md">
        {isLoggedIn && <h1>YOU ARE LOGGED IN</h1>}
        <CssBaseline />
        <Grid container justifyContent="center" alignItems="center">
          <Grid item sx={{ borderRadius: 0 }}>
            <Avatar
              src="https://cutelogin.netlify.app/assets/logo2.9548f92a.png"
              style={{ width: '100px', height: '100px', borderRadius: 0 }} // Thay đổi kích thước của Avatar tại đây
            />
          </Grid>
        </Grid>

        <Box
          sx={{
            marginTop: 4,
            padding: 4,
            borderRadius: 2.5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            // boxShadow: '#6a839c33 0 8px 24px',
          }}
          bgcolor="background.secondary"
        >
          <Typography component="h1" variant="h4" sx={{ fontWeight: 'bold' }}>
            Welcome back!
          </Typography>
          <Typography component="p" variant="h6" sx={{ mt: 2, opacity: 0.6 }}>
            Enter your credentials to access your account.
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              // inputProps={{
              //   maxLength: 30,
              // }}
              autoComplete="off"
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
              // onChange={() => trigger('chatform')}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="off"
              inputProps={{
                maxLength: 30,
              }}
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
              // onChange={() => trigger('password')}
            />
            <LoadingButton
              disabled={!isValid}
              type="submit"
              fullWidth
              loading={isLoading}
              loadingIndicator="Loading…"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                py: 1.4,
                opacity: !isValid ? 0.5 : 1,
                bgcolor: !isValid ? 'action.disabledBackground' : 'primary.main',
                color: 'action.disabled',
              }}
            >
              Sign In
            </LoadingButton>
            <Button
            sx={{
              pl: 0.4,
              py: 0,
              pr: 1.2,
              backgroundColor: 'background.google',
              color: 'text.primary',
              textTransform: 'unset',
              '&:hover': {
                backgroundColor: 'background.google',
                boxShadow: 'none',
                textDecoration: 'none',
              },
            }}
            variant="contained"
            startIcon={<Image height={44} width={44} src="/btn_google_dark_normal_ios.svg"  alt={''}/>}
            onClick={() => popupCenter('/auth/google-signin', 'Sign in with Google')}
          >
            Sign in with Google
          </Button>
            <Grid container justifyContent="flex-end">
              <Grid item xs>
                <Link href="/auth/signup">
                  <Typography>Forgot password?</Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link href="/auth/signup">
                  <Typography>{"Don't have an account? Sign Up"}</Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert
            severity={notify.type}
            variant="filled"
            sx={{ width: '100%' }}
            onClose={() => setSnackbarOpen(false)}
          >
            {notify.message}
          </Alert>
        </Snackbar>
        {loginSuccess && <LoadingIcon loadingText={loadingMessage} />}
      </Container>
    )
}
