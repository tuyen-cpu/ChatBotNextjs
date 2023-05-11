import { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import NextLink from 'next/link'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import LoadingButton from '@mui/lab/LoadingButton'
import { Regex } from '@/utils/constant'
import { useRouter } from 'next/router'
import LoadingIcon from '@/components/LoadingIcon'
import { SignInForm } from '@/model/user.model'
import { getSession, signIn, useSession } from 'next-auth/react'
import { popupCenter } from '@/utils/fn'
import GoogleButton from '@/components/Button/GoogleButton'

const schema = yup.object().shape({
  email: yup
    .string()
    .matches(Regex.EMAIL, 'Invalid Email')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
})

export default function Login() {
  const router = useRouter()
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  const { data: session, status } = useSession()
  const [notify, setNotify] = useState<{ type: 'success' | 'error'; message: string }>({
    type: 'success',
    message: '',
  })
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
        setNotify({ type: 'success', message: 'Login successful' })
        setSnackbarOpen(true)
      }
      if (result?.error) {
        setNotify({ type: 'error', message: result.error })
        setSnackbarOpen(true)
      } else if (result?.url) {
        console.log('🚀 ~ file: Login.tsx:76 ~ onSubmit ~ result?.url:', result?.url)
        await router.push(result.url)
      }
    } catch (error: any) {
      setNotify({ type: 'error', message: error.error })
      setSnackbarOpen(true)
    } finally {
      setTimeout(() => {
        setIsLoading(false)
      }, 400)
    }
  }

  useEffect(() => {
    checkLoading()
  }, [status, session, router])

  const checkLoading = async () => {
    console.log('🚀 ~ file: Login.tsx:120 ~ useEffect ~ status:', status)
    if (status === 'loading') {
      setIsLoginSuccess(true)
    } else {
      await setTimeout(() => {
        setIsLoginSuccess(false)
      }, 2000)

    }
    if (status === 'authenticated') {
      await setTimeout(() => {
        setIsLoginSuccess(false)
      }, 2000)
      await router.push('/chatform/sss')
    }
  }
  return (
    <Container component='main' maxWidth='sm'>
      {isLoggedIn && <h1>YOU ARE LOGGED IN</h1>}
      <CssBaseline />
      <Grid container justifyContent='center' alignItems='center'>
        <Grid item sx={{ borderRadius: 0 }}>
          <Avatar
            src='/images/logo.png'
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
          boxShadow: '#00000033 0 8px 24px',
        }}
        bgcolor='background.paper'
      >
        <Typography component='h1' variant='h1' sx={{ fontWeight: 'bold' }}>
          YOLO
        </Typography>
        <Typography component='p' variant='body1' sx={{ mt: 1.4, opacity: 0.6 }}>
          Hi, welcome back!
        </Typography>
        <Box component='form' onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 2 }}>
          <TextField
            // sx={{ backgroundColor:'background.input',}}
            // sx={{color:'text.primary'}}
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            autoComplete='off'
            {...register('email')}
            error={!!errors.email}
            helperText={errors.email?.message}
            // onChange={() => trigger('chatform')}
          />
          <TextField
            margin='normal'
            required
            fullWidth
            label='Password'
            type='password'
            id='password'
            autoComplete='current-password'
            inputProps={{
              maxLength: 30,
            }}
            sx={{ color: 'text.primary' }}
            {...register('password')}
            error={!!errors.password}
            helperText={errors.password?.message}
            // onChange={() => trigger('password')}
          />
          <LoadingButton
            disabled={!isValid}
            type='submit'
            fullWidth
            loading={isLoading}
            loadingIndicator='Loading…'
            variant='contained'
            sx={{
              mt: 3,
              mb: 2,
              py: 1.4,
              color: 'text.custom',
            }}
          >
            Sign In
          </LoadingButton>
          <Divider> <Typography component='p' variant='subtitle2' sx={{opacity:0.7}}>OR</Typography></Divider>

          <Box marginTop={2} display='flex' justifyContent='center' alignItems='center'>
            <GoogleButton onClick={() => popupCenter('/auth/google-signIn', 'Sign in with Google')} />
          </Box>
          <Grid marginTop={3} container justifyContent='flex-end'>
            <Grid item xs>
              <Link href='/auth/signup' component={NextLink}>
                <Typography component='p' variant='subtitle2'>Forgot password?</Typography>
              </Link>
            </Grid>
            <Grid item>
              <Link href='/auth/signup' component={NextLink}>
                <Typography component='p' variant='subtitle2'>{'Don\'t have an account? Sign Up'}</Typography>
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
          variant='filled'
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
