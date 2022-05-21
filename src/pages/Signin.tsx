import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { FirebaseError } from 'firebase/app';
// Material UI
import { 
  Typography,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Container
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// Components
import Copyright from '../components/Copyright'
import FormAlert from '../components/FormAlert';

const theme = createTheme();
let alreadyCalled = 0;

interface alertInterface {
  status: boolean
  message: string
}

export default function SignIn() {
  const emailRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();

  const [emailErrorStatus, setEmailErrorStatus] = useState<boolean>(false)
  const [passwordErrorStatus, setPasswordErrorStatus] = useState<boolean>(false)

  const [alert, setAlert] = useState<alertInterface>({'status': false, 'message': ''})

  const { signInUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailVal = emailRef.current?.value;
    const passwordVal = passwordRef.current?.value;

    try {
      await signInUser(emailVal, passwordVal)
      navigate('/home')
    } catch (e) {
      console.log(e)
      if (e instanceof FirebaseError) {
        if(e.message.includes("internal-error")){
          setAlert({'status': true, 'message': 'Sign in form is incompleted'})
          if (emailVal === '' || emailVal === undefined) {
            setEmailErrorStatus(true)
          }
          if (passwordVal === '' || passwordVal === undefined) {
            setPasswordErrorStatus(true)
          }
        }
        if(e.message.includes("auth/missing-email") || e.message.includes("auth/invalid-email")){
          setAlert({'status': true, 'message': 'Please enter email adress'})
          setEmailErrorStatus(true)
        }
        if(e.message.includes("auth/user-not-found")){
          setAlert({'status': true, 'message': "This user does not exist"})
          setEmailErrorStatus(true)
        }
        if(e.message.includes("auth/wrong-password")){
          setAlert({'status': true, 'message': "You have entered an invalid password"})
          setPasswordErrorStatus(true)
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              inputRef={emailRef}
              error={emailErrorStatus}
              onChange={ (event) => event.target.value !== '' ? setEmailErrorStatus(false) : undefined}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              inputRef={passwordRef}
              error={passwordErrorStatus}
              onChange={ (event) => event.target.value !== '' ? setPasswordErrorStatus(false) : undefined}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              disableElevation
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signup">
                  <Typography variant="body2" color='primary'>
                    Don't have an account? Sign Up
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}