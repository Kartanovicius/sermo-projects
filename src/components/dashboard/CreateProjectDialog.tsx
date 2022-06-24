import React, { useEffect, useState } from 'react'
// Material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
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
        <Typography variant='subtitle2'>To create a new project record, please fill all required fields</Typography>
        <TextField
          autoFocus
          margin='dense'
          id='code'
          label='Project code'
          type='tel'
          fullWidth
          variant='filled'
          required
          onChange={e => setCode(parseInt(e.target.value))}
        />
        <TextField
          margin='dense'
          id='client'
          label='Project client'
          type='text'
          fullWidth
          variant='filled'
          required
          onChange={e => setClient(e.target.value)}
        />
        <TextField
          margin='dense'
          id='name'
          label='Project name'
          type='text'
          fullWidth
          variant='filled'
          required
          onChange={e => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant='outlined' onClick={() => handleClose()}>Cancel</Button>
        <Button variant='contained' 
          disabled={code < 100000 || client.length === 0 || name.length === 0} 
          onClick={() => {createProjectHandler()}}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog> 
  )
}