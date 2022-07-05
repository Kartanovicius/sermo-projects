import { Skeleton, Card, Typography, TextField, Box, Button } from '@mui/material'
import { useRef } from 'react'
import { updateProjectByCode } from '../../services/firebase'
import { IProject } from '../../types'

interface Props {
  project: IProject
}

export default function Notes ({project}: Props) {
  const textInputRef = useRef<HTMLInputElement>()

  function saveButonHandler() {
    if (project.code) {
      updateProjectByCode(project.code, {note: textInputRef.current?.value})
    }
    console.log('a')
  }

  return (
    <>
      {project.code === null ? <Skeleton height={350}/> :
        <Card sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 3,
          gap: 1,
        }}>
          <Typography variant='h6'>
            Notes
          </Typography>
          <TextField 
          id='notes-input'
          placeholder='Add any important note for this project'
          fullWidth
          multiline
          maxRows={10}
          defaultValue={project.note}
          inputRef={textInputRef}
          />
          <Box sx={{
            display: 'flex',
            justifyContent: 'end',
          }}>
            <Button
            id='save-notes-btn'
            variant='contained'
            sx={{ mt: 2 }}
            onClick={() => saveButonHandler()}
            >
              Save Note
            </Button>
          </Box>
        </Card>
      }
    </>
  )
}