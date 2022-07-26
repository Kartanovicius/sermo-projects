import React, { useState } from 'react'
// Material-ui
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from '@mui/material'
// npm packages
import { AsyncDialogProps } from 'react-dialog-async'

export const PasswordConfirmationDialog: React.FC<AsyncDialogProps<string, string>> = ({
  open,
  handleClose,
  data,
}) => {
  const [value, setValue] = useState('')

  return (
    <Dialog open={open} onClose={() => handleClose()}>
      <DialogTitle>Confirm Password</DialogTitle>
      <DialogContent>
        <DialogContentText>{data}</DialogContentText>
        <TextField
          autoFocus
          margin='dense'
          id='password'
          label='Password'
          type='password'
          fullWidth
          variant='filled'
          onChange={(e) => setValue(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant='outlined' onClick={() => handleClose()}>
          Cancel
        </Button>
        <Button variant='contained' onClick={() => handleClose(value)}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}
