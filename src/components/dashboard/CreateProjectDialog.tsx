import React, { useEffect, useState } from 'react'
// Material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
// npm packages
import { AsyncDialogProps } from 'react-dialog-async'
// Firebase
// contexts
import { useAuth } from '../../context/authContext'
// constants
import { createProject } from '../../services/firebase'

export const CreateProjectDialog: React.FC<AsyncDialogProps<string, string>> = 
({ open, handleClose, data }) => {

  const { currentUser } = useAuth()
  const [code, setCode] = useState<number>(0)
  const [client, setClient] = useState<string>('')
  const [name, setName] = useState<string>('')

  useEffect(() => {
    setCode(0)
    setClient('')
    setName('')
  }, [open])

  function createProjectHandler() {
    createProject(currentUser.uid, code, client, name)
    handleClose()
  }

  return (
    <Dialog open={open} onClose={() => handleClose()}>
      <DialogTitle>Create new project</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          id='code'
          label='Code'
          type='number'
          fullWidth
          variant='filled'
          onChange={e => setCode(parseInt(e.target.value))}
        />
        <TextField
          margin='dense'
          id='client'
          label='Client'
          type='text'
          fullWidth
          variant='filled'
          onChange={e => setClient(e.target.value)}
        />
        <TextField
          margin='dense'
          id='name'
          label='Name'
          type='text'
          fullWidth
          variant='filled'
          onChange={e => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant='outlined' onClick={() => handleClose()}>Cancel</Button>
        <Button variant='contained' 
          disabled={code < 100000 || client.length === 0 || name.length === 0} 
          onClick={() => {createProjectHandler()}}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog> 
  )
}