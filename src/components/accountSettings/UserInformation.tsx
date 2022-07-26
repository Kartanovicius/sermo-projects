import React, { useRef } from 'react'
// Material-ui
import {
  AlertColor,
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  Icon,
  Paper,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material'
// npm packages
import { useDialog } from 'react-dialog-async'
// Firebase
import { updateFieldByUserId } from '../../services/firebase'
import { EmailAuthProvider, reauthenticateWithCredential, updateEmail } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
// contexts
import { useAuth } from '../../context/authContext'
import { useCurrentUser } from '../../context/currentUserContext'
// components
import { PasswordConfirmationDialog } from './PasswordConfirmationDialog'
// constants
import * as ALERTMESSAGE from '../../constants/alerts'

type Props = {
  setAlerts: React.Dispatch<React.SetStateAction<{ message: string; variant: AlertColor }[]>>
}

export default function UserInformation({ setAlerts }: Props) {
  // Data from context
  const { userFirst, userLast, userEmailAddress, userLoading, setUpdated } = useCurrentUser()
  const { currentUser } = useAuth()
  // User Icon First letters from Name and Surname
  const nameFirstLetter: string = userFirst?.charAt(0).toUpperCase()
  const surnameFirstLetter: string = userLast?.charAt(0).toUpperCase()
  // Input ref
  const userFirstRef = useRef(userFirst)
  const userLastRef = useRef(userLast)
  const userEmailAddressRef = useRef(userEmailAddress)
  // useDialog react-dialog-async
  const passwordConfirmationDialog = useDialog(PasswordConfirmationDialog)
  // Updated user fields
  const alertMessage: { message: string; variant: AlertColor }[] = []

  async function updateFirstName() {
    try {
      await updateFieldByUserId(currentUser.uid, { name: userFirstRef.current.value })
      alertMessage.push({ message: ALERTMESSAGE.FIRST_NAME_UPDATED, variant: 'success' })
    } catch (error) {
      console.log(error)
    }
  }

  async function updateLastName() {
    try {
      await updateFieldByUserId(currentUser.uid, { surname: userLastRef.current.value })
      alertMessage.push({ message: ALERTMESSAGE.LAST_NAME_UPDATED, variant: 'success' })
    } catch (error) {
      console.log(error)
    }
  }

  async function updateEmailAddress() {
    try {
      await passwordConfirmationDialog
        .show('To change email address for current user, please enter your current password here.')
        .then((password) => {
          return EmailAuthProvider.credential(
            currentUser.email,
            password !== undefined ? password : '',
          )
        })
        .then((credential) => {
          return reauthenticateWithCredential(currentUser, credential)
        })

      await updateEmail(currentUser, userEmailAddressRef.current.value)

      await updateFieldByUserId(currentUser.uid, {
        emailAddress: userEmailAddressRef.current.value,
      })

      alertMessage.push({ message: ALERTMESSAGE.EMAIL_ADDRESS_UPDATED, variant: 'success' })
    } catch (error) {
      if (error instanceof FirebaseError) {
        if (error.message.includes('auth/internal-error')) {
          return alertMessage.push({ message: ALERTMESSAGE.UNFINISHED_DIALOG, variant: 'error' })
        }
        if (error.message.includes('auth/wrong-password')) {
          return alertMessage.push({ message: ALERTMESSAGE.INVALID_PASSWORD, variant: 'error' })
        }
      }
    }
  }

  const saveUserInfoHandler = async () => {
    if (userFirst !== userFirstRef.current.value) {
      await updateFirstName()
    }
    if (userLast !== userLastRef.current.value) {
      await updateLastName()
    }
    if (userEmailAddress !== userEmailAddressRef.current.value) {
      await updateEmailAddress()
    }
    // Display alert
    setAlerts(alertMessage)
    // Update CurrentUser context
    setUpdated(true)
  }

  function resetUserInfo() {
    userFirstRef.current.value = userFirst
    userLastRef.current.value = userLast
    userEmailAddressRef.current.value = userEmailAddress
  }

  return (
    <Grid item xs={12}>
      {userLoading ? (
        <Skeleton height={248} />
      ) : (
        <Card
          sx={{
            px: 3,
            pt: 3,
            pb: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography style={{ fontWeight: 'bold' }} variant='h6'>
            User Information
          </Typography>
          <Box
            sx={{
              py: 2,
              width: '100%',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
            }}
          >
            <Icon
              sx={(theme) => ({
                width: 120,
                height: 120,
                [theme.breakpoints.down('sm')]: {
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  mb: 2,
                },
              })}
            >
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  bgcolor: 'primary.main',
                  color: 'common.white',
                  fontSize: 36,
                  fontWeight: 'bold',
                }}
              >
                {nameFirstLetter}
                {surnameFirstLetter}
              </Avatar>
            </Icon>
            <Box
              sx={(theme) => ({
                width: 'calc(100% - 120px - 24px)',
                display: 'flex',
                flexDirection: 'column',
                [theme.breakpoints.down('sm')]: {
                  width: '100%',
                },
              })}
            >
              <Box
                component='form'
                noValidate
                autoComplete='off'
                sx={(theme) => ({
                  mb: 3,
                  display: 'inline-flex',
                  flexWrap: 'wrap',
                  gap: '12px',
                  div: {
                    display: 'inline-flex',
                    flexWrap: 'wrap',
                    gap: '12px',
                    width: '100%',
                    '.MuiTextField-root': {
                      width: `calc(50% - 6px)`,
                      [theme.breakpoints.down('sm')]: {
                        width: '100%',
                      },
                    },
                  },
                })}
              >
                <div>
                  <TextField
                    id='firstnameInput'
                    label='First Name'
                    variant='filled'
                    defaultValue={userFirst}
                    inputRef={userFirstRef}
                  />
                  <TextField
                    id='lastnameInput'
                    label='Last Name'
                    variant='filled'
                    defaultValue={userLast}
                    inputRef={userLastRef}
                  />
                </div>
                <TextField
                  fullWidth
                  id='emailInput'
                  label='Email address'
                  variant='filled'
                  defaultValue={userEmailAddress}
                  inputRef={userEmailAddressRef}
                />
              </Box>
            </Box>
          </Box>
          <Paper
            sx={{
              width: 'inherit',
              textAlign: 'end',
              display: 'inline-flex',
              gap: 2,
              justifyContent: 'end',
              p: 1,
            }}
          >
            <Button variant='outlined' onClick={() => resetUserInfo()}>
              Reset
            </Button>
            <Button variant='contained' onClick={() => saveUserInfoHandler()}>
              Save
            </Button>
          </Paper>
        </Card>
      )}
    </Grid>
  )
}
