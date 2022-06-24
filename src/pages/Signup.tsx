import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as ROUTES from '../constants/routes'
//Firebase
import { db } from '../lib/firebase'
import { addDoc, collection } from 'firebase/firestore'
import { useAuth } from '../context/authContext'
import { FirebaseError } from 'firebase/app'
//Material UI
import { 
  Typography,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Container,
} from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles'
//Components
import Copyright from '../components/Copyright'

const theme = createTheme()

interface alertInterface {
  status: boolean
  message: string
}


export default function SignUp() {
  const firstnameRef = useRef<HTMLInputElement>()
  const lastnameRef = useRef<HTMLInputElement>()
  const emailRef = useRef<HTMLInputElement>()
  const passwordRef = useRef<HTMLInputElement>()
  const passwordConfirmRef = useRef<HTMLInputElement>()

  const [firstnameErrorStatus, setfirstnameErrorStatus] = useState<alertInterface>({'status': false, 'message': ''})
  const [lastnameErrorStatus, setlastnameErrorStatus] = useState<alertInterface>({'status': false, 'message': ''})
  const [emailErrorStatus, setEmailErrorStatus] = useState<alertInterface>({'status': false, 'message': ''})
  const [passwordErrorStatus, setPasswordErrorStatus] = useState<alertInterface>({'status': false, 'message': ''})
  const [passwordConfirmErrorStatus, setPasswordConfirmErrorStatus] = useState<alertInterface>({'status': false, 'message': ''})

  const { createUser } = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nameVal: string | undefined = firstnameRef.current?.value
    const lastnameVal: string | undefined = lastnameRef.current?.value
    const emailVal: string | undefined = emailRef.current?.value
    const passwordVal: string | undefined = passwordRef.current?.value
    const passwordConfirmVal: string | undefined = passwordConfirmRef.current?.value

    try {
      // Check if all inputs filled
      if (nameVal === '' || nameVal === undefined) {
        setfirstnameErrorStatus({'status': true, 'message': 'First name required'})
      }
      if (lastnameVal === '' || lastnameVal === undefined) {
        setlastnameErrorStatus({'status': true, 'message': 'Last name required'})
      }
      if (emailVal === '' || emailVal === undefined) {
        setEmailErrorStatus({'status': true, 'message': 'Email required'})
      }
      if (passwordVal === '' || passwordVal === undefined) {
        setPasswordErrorStatus({'status': true, 'message': 'Password required'})
      }
      if (passwordConfirmVal === '' || passwordConfirmVal === undefined) {
        setPasswordConfirmErrorStatus({'status': true, 'message': 'Password confirm required'})
      }

      // Does passwords match
      if (passwordVal !== passwordConfirmVal) {  
        throw new Error('Password-is-not-matching')
      }

      // Firebase auth
      const createdUserResult = await createUser(emailRef.current?.value, passwordRef.current?.value)

      await addDoc(collection(db, 'users'), {
        uid: createdUserResult.user.uid,
        first: nameVal,
        last: lastnameVal,
        emailAddress: emailVal,
        projects: [],
        dateCreated: Date.now(),
      })
      
      navigate(ROUTES.MAIN)
    } catch (e) {
      if (e instanceof FirebaseError) {
        if(e.message.includes('auth/weak-password')){
          setPasswordErrorStatus({'status': true, 'message': 'Password should containt minimum 6 characters'})
          setPasswordConfirmErrorStatus({'status': true, 'message': 'Password should containt minimum 6 characters'})
        }
        if(e.message.includes('auth/email-already-in-use')){
          setEmailErrorStatus({'status': true, 'message': 'This email is already in use'})
        }
      }
      if (e instanceof Error) {
        if (e.message === 'Password-is-not-matching') {
          setPasswordConfirmErrorStatus({'status': true, 'message': `Passwords doesn't match`})
        }
      }
    }
  }

  function passwordOnChangeHandler() {
    const passwordVal: string | undefined = passwordRef.current?.value
    const passwordConfirmVal: string | undefined = passwordConfirmRef.current?.value
    if (passwordVal !== '') {
      setPasswordErrorStatus({'status': false, 'message': ''})
    }
    if (passwordConfirmVal !== '') {
      setPasswordConfirmErrorStatus({'status': false, 'message': ''})
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='sm'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Box sx={{marginBottom: '40px'}}>
              <Typography component='h1' variant='h4' align='left' sx={{width: '100%', marginBottom: '8px'}}>
                Get started absolutely free.
              </Typography>
              <Typography variant='body2' align='left' sx={{width: '100%'}}>
                Free forever. No credit card needed.
              </Typography>
            </Box>

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete='given-name'
                  name='firstName'
                  required
                  fullWidth
                  id='firstName'
                  label='First Name'
                  autoFocus
                  inputRef={firstnameRef}
                  error={firstnameErrorStatus.status}
                  onChange={ (event) => event.target.value !== '' ? setfirstnameErrorStatus({'status': false, 'message': ''}) : undefined}
                  helperText={firstnameErrorStatus.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id='lastName'
                  label='Last Name'
                  name='lastName'
                  autoComplete='surname-name'
                  inputRef={lastnameRef}
                  error={lastnameErrorStatus.status}
                  onChange={ (event) => event.target.value !== '' ? setlastnameErrorStatus({'status': false, 'message': ''}) : undefined}
                  helperText={lastnameErrorStatus.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  autoComplete='email'
                  inputRef={emailRef}
                  error={emailErrorStatus.status}
                  onChange={ (event) => event.target.value !== '' ? setEmailErrorStatus({'status': false, 'message': ''}) : undefined}
                  helperText={emailErrorStatus.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  autoComplete='new-password'
                  inputRef={passwordRef}
                  error={passwordErrorStatus.status}
                  onChange={passwordOnChangeHandler}
                  helperText={passwordErrorStatus.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Confirm Password'
                  type='password'
                  id='confirm-password'
                  autoComplete='confirm-password'
                  inputRef={passwordConfirmRef}
                  error={passwordConfirmErrorStatus.status}
                  onChange={passwordOnChangeHandler}
                  helperText={passwordConfirmErrorStatus.message}
                />
              </Grid>
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link to={ROUTES.SIGN_IN}>
                  <Typography variant='body2' color='primary'>
                    Already have an account? Sign in
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  )
}