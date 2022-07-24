import React, { useEffect, useState } from 'react'
// Material-ui
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material'
// npm packages
import { AsyncDialogProps } from 'react-dialog-async'
// Firebase
import { createProject } from '../services/firebase'
// contexts
import { useAuth } from '../context/authContext'
// constants
import * as ALERTS from '../constants/alerts'
// Types
import { IProject } from '../store/features/project/project.types'


export const CreateProjectDialog: React.FC<AsyncDialogProps<string, string>> = 
({ open, handleClose, data }) => {
  
  // Context variable
  const { currentUser } = useAuth()

  // Form
  const [code, setCode] = useState<number>(0)
  const [client, setClient] = useState<string>('')
  const [name, setName] = useState<string>('')

  // Validation
  const [codeAlreadyExist, setCodeAlreadyExist] = useState<boolean>(false)

  // On initializing dialog clear all fields ('Implemented for button disable')
  useEffect(() => {
    setCode(0)
    setClient('')
    setName('')
  }, [open])

  // Generate keywords for searching project
  const createKeywords = (text: string) => {
    const arrName: Array<string> = []
    let curName = ''
    text.toLowerCase().split('').forEach((letter: string) => {
      curName += letter
      arrName.push(curName)
    })
    return arrName
  }

  const generateKeywords = (code: number, client: string, name: string) =>{
    const fullProjectName = createKeywords(`${code} - ${client} - ${name}`)
    const clientFirst = createKeywords(`${client} - ${name}`)
    const onlyProjectName = createKeywords(name)
    return [
      ...Array.from(new Set([
        '',
        ...fullProjectName,
        ...clientFirst,
        ...onlyProjectName,
      ]))
    ]
  }

  async function createProjectHandler() {
    try {
      const project: IProject = {
        owner: currentUser.uid,
        code: code,
        client: client,
        name: name,
        note: '',
        recurringTasks: [],
        dateCreated: Date.now(),
        keywords: generateKeywords(code, client, name),
      }
      await createProject(project)
      handleClose()
    } catch (error) {
      console.log(error)
      setCodeAlreadyExist(true)
    }
  }

  return (
    <Dialog open={open} onClose={() => handleClose()}>
      <DialogTitle>Create new project</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle2">To create a new project record, please fill all required fields</Typography>
        <TextField
          autoFocus
          margin="dense"
          id="code"
          label="Project code"
          type="number"
          fullWidth
          variant="filled"
          required
          error={codeAlreadyExist}
          helperText={codeAlreadyExist ? ALERTS.PROJECT_CODE_ALREADY_EXISTS : ""}
          onChange={(e) => {
            setCode(parseInt(e.target.value))
            setCodeAlreadyExist(false)
          }}
        />
        <TextField
          margin="dense"
          id="client"
          label="Project client"
          type="text"
          fullWidth
          variant="filled"
          required
          onChange={(e) => setClient(e.target.value)}
        />
        <TextField
          margin="dense"
          id="name"
          label="Project name"
          type="text"
          fullWidth
          variant="filled"
          required
          onChange={(e) => setName(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button variant="outlined" onClick={() => handleClose()}>Cancel</Button>
        <Button variant="contained" 
          disabled={code.toString().length !== 6 || client.length === 0 || name.length === 0} 
          onClick={() => {createProjectHandler()}}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog> 
  )
}