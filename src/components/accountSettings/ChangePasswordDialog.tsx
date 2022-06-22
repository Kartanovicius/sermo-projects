import React, { useEffect, useState } from 'react'
// Material-ui
import { AlertColor, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
// npm packages
import { AsyncDialogProps } from 'react-dialog-async'
// Firebase
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword } from '@firebase/auth'
import { FirebaseError } from 'firebase/app'
// contexts
import { useAuth } from '../../context/authContext'
// constants
import * as ALERTMESSAGE from '../../constants/alerts'

export const ChangePasswordDialog: React.FC<AsyncDialogProps<string, { message: string, variant: AlertColor }[]>> = 
({ open, handleClose, data }) => {

  const { currentUser } = useAuth()
  const [previousPassword, setPreviousPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  useEffect(() => {
    setPreviousPassword('')
    setNewPassword('')
  }, [open])

  async function updateUserPassword() {
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      previousPassword
    )
    await reauthenticateWithCredential(currentUser, credential)

    await updatePassword(currentUser, newPassword).then(() => {
      handleClose([{message: ALERTMESSAGE.PASSWORD_UPDATED, variant: 'success'}])
      // Update successful.
    }).catch((error) => {
      if (error instanceof FirebaseError) {
        if(error.message.includes('auth/wrong-password')) {
          handleClose([{message: ALERTMESSAGE.INVALID_PASSWORD, variant: 'error'}])
        }
      }
    })
  }

  return (
    <Dialog open={open} onClose={() => handleClose()}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          id='previousPassword'
          label='Previous Password'
          type='password'
          fullWidth
          variant='filled'
          onChange={e => setPreviousPassword(e.target.value)}
        />
        <TextField
          margin='dense'
          id='newPassword'
          label='Password'
          type='password'
          fullWidth
          variant='filled'
          helperText='New password must be at least 8 characters long'
          onChange={e => setNewPassword(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant='outlined' onClick={() => handleClose()}>Cancel</Button>
        <Button variant='contained' 
          disabled={previousPassword.length < 8 || newPassword.length < 8} 
          onClick={() => {updateUserPassword()}}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog> 
  )
}