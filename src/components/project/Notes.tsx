import React from 'react'
import { Skeleton, Card, Typography, TextField, Box, CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'
import useDebounce from '../../hooks/use-debounce'
import { updateProjectByCode } from '../../services/firebase'
import { IProject } from '../../store/features/project/project.types'

interface Props {
  project: IProject
  refetch: () => void
}

export default function Notes({ project, refetch }: Props) {
  const [value, setValue] = useState(project.note)
  const [loading, setLoading] = useState(false)
  const debounceSave = useDebounce(value, 1000)

  useEffect(() => {
    if (project.code) {
      updateProjectByCode(project.code, { note: value }).then(() => {
        setLoading(false), refetch()
      })
    }
  }, [debounceSave])

  return (
    <>
      {project.code === null ? (
        <Skeleton height={350} />
      ) : (
        <Card
          sx={{
            display: 'flex',
            flexDirection: 'column',
            p: {
              xs: 2,
              sm: 3,
            },
            gap: 1,
          }}
        >
          <Box
            sx={{
              display: 'inline-flex',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant='h6'>Notes</Typography>
            {loading ? <CircularProgress size={24} sx={{ mr: 1 }} /> : <></>}
          </Box>
          <TextField
            id='notes-input'
            placeholder='Add any important note for this project'
            fullWidth
            multiline
            variant='filled'
            sx={{ MuiFilledInput: { root: { p: '18px 18px 8px' } } }}
            maxRows={10}
            defaultValue={project.note}
            onChange={(e) => {
              setValue(e.currentTarget.value)
              setLoading(true)
            }}
          />
        </Card>
      )}
    </>
  )
}
