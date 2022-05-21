import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/firebase'
import { FirebaseError } from 'firebase/app';
//Material UI
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../components/Copyright'
import { createTheme, ThemeProvider } from '@mui/material/styles';
//Components
import FormAlert from '../components/signup/FormAlert';

const theme = createTheme();

interface alertInterface {
  status: boolean
  message: string
}

let alreadyCalled = 0;

export default function SignUp() {
  const nameRef = useRef<HTMLInputElement>();
  const surnameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const passwordConfirmRef = useRef<HTMLInputElement>();

  const [nameErrorStatus, setNameErrorStatus] = useState<boolean>(false)
  const [surnameErrorStatus, setSurnameErrorStatus] = useState<boolean>(false)
  const [emailErrorStatus, setEmailErrorStatus] = useState<boolean>(false)
  const [passwordErrorStatus, setPasswordErrorStatus] = useState<boolean>(false)
  const [passwordConfirmErrorStatus, setPasswordConfirmErrorStatus] = useState<boolean>(false)

  const [alert, setAlert] = useState<alertInterface>({'status': false, 'message': ''})

  const { createUser } = useAuth()

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nameVal: string | undefined = nameRef.current?.value;
    const surnameVal: string | undefined = surnameRef.current?.value;
    const emailVal: string | undefined = emailRef.current?.value;
    const passwordVal: string | undefined = passwordRef.current?.value;
    const passwordConfirmVal: string | undefined = passwordConfirmRef.current?.value;

    let isValid: boolean = true;

    try {
      // Check if all inputs filled
      if (nameVal === '' || nameVal === undefined) {
        setNameErrorStatus(true)
        isValid = false
      }
      if (surnameVal === '' || surnameVal === undefined) {
        setSurnameErrorStatus(true)
        isValid = false
      }
      if (emailVal === '' || emailVal === undefined) {
        setEmailErrorStatus(true)
        isValid = false
      }
      if (passwordVal === '' || passwordVal === undefined) {
        setPasswordErrorStatus(true)
        isValid = false
      }
      if (passwordConfirmVal === '' || passwordConfirmVal === undefined) {
        setPasswordConfirmErrorStatus(true)
        isValid = false
      }
      if (isValid === false) {
        throw new Error('form-incomplete');
      }

      // Does passwords match
      if (passwordVal !== passwordConfirmVal) {        
        throw new Error('Password-is-not-matching');
      }

      // Firebase auth
      await createUser(emailRef.current?.value, passwordRef.current?.value)
      
      navigate('/home')
    } catch (e) {
      if (e instanceof FirebaseError) {
        if(e.message.includes("auth/weak-password")){
          setAlert({'status': true, 'message': 'Password should containt minimum 6 characters'})
          setPasswordErrorStatus(true)
          setPasswordConfirmErrorStatus(true)
        }
        if(e.message.includes("auth/email-already-in-use")){
          setEmailErrorStatus(true)
          setAlert({'status': true, 'message': 'This email is already in use'})
        }
      }
      if (e instanceof Error) {
        if (e.message === 'form-incomplete') {
          setAlert({'status': true, 'message': 'Form is incomplete'})
        }
        if (e.message === 'Password-is-not-matching') {
          setAlert({'status': true, 'message': "Passwords doesn't match"})
          setPasswordErrorStatus(true)
          setPasswordConfirmErrorStatus(true)
        }
      }
      alreadyCalled++;
    } finally {
      if (alreadyCalled === 1) {
        // Clear alert status and message
        setTimeout(function() {
          setAlert({'status': false, 'message': ''})
          alreadyCalled = 0;
        },5000)       
      }
      return;
    }
  };

  function passwordOnChangeHandler() {
    const passwordVal: string | undefined = passwordRef.current?.value;
    const passwordConfirmVal: string | undefined = passwordConfirmRef.current?.value;

    if (passwordVal !== '') {
      setPasswordErrorStatus(false)
    }
    if (passwordConfirmVal !== '') {
      setPasswordConfirmErrorStatus(false)
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />

        <FormAlert status={alert.status} message={alert.message}/>

        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  inputRef={nameRef}
                  error={nameErrorStatus}
                  onChange={ (event) => event.target.value !== '' ? setNameErrorStatus(false) : undefined}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="surname-name"
                  inputRef={surnameRef}
                  error={surnameErrorStatus}
                  onChange={ (event) => event.target.value !== '' ? setSurnameErrorStatus(false) : undefined}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  inputRef={emailRef}
                  error={emailErrorStatus}
                  onChange={ (event) => event.target.value !== '' ? setEmailErrorStatus(false) : undefined}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  inputRef={passwordRef}
                  error={passwordErrorStatus}
                  onChange={passwordOnChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Confirm Password"
                  type="password"
                  id="confirm-password"
                  autoComplete="confirm-password"
                  inputRef={passwordConfirmRef}
                  error={passwordConfirmErrorStatus}
                  onChange={passwordOnChangeHandler}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I agree with terms and conditions"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disableElevation
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}