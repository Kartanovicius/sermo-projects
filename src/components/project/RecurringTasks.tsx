import { useRef, useState } from 'react'
// Material-UI
import { Skeleton, Card, Typography, TextField, Box, Button } from '@mui/material'
// Firebase
import { updateProjectByCode } from '../../services/firebase'
// Custom hooks
import useProject from '../../hooks/use-project'
// npm packages
import moment from 'moment'
// Types
import { IProject } from '../../types'
// Components
import RecurringTasksTable from './RecurringTasksTable'

interface Props {
  project: IProject
}

export default function RecurringTasks ({ project }: Props) {
  const taskTextRef = useRef<HTMLInputElement>()
  const taskTimeRef = useRef<HTMLInputElement>()
  const { setReload } = useProject(Number(project.code))

  const [openTable, setOpenTable] = useState(false)

  async function createRecurringTaskButtonHandler() {
    if (
      project.code && 
      taskTextRef.current !== undefined && 
      taskTimeRef.current !== undefined &&
      taskTextRef.current.value !== '' &&
      taskTimeRef.current.value !== ''
    ) {
      // Convert input time to milliseconds 
      let hour = parseInt(taskTimeRef.current.value.slice(0, 2))
      let minute = parseInt(taskTimeRef.current.value.slice(-2))
      let time = moment().set('h', hour).set('m', minute).add(1, 'd').valueOf()
      // Task object
      const recurringTask = {
        task: taskTextRef.current.value,
        time: time,
        done: true
      }
      // Push new task to project.recurringTasks if it exist
      // If recurringTasks does not exist then create a new array with recurringTask
      project.recurringTasks !== undefined ? 
      project.recurringTasks.push(recurringTask) :
      project.recurringTasks = [recurringTask]
      // Push new task to Firestore
      try {  
        await updateProjectByCode(
          project.code, 
          { recurringTasks: project.recurringTasks }
        )
        // Clear input fields
        taskTextRef.current.value = ''
        taskTimeRef.current.value = ''
        setReload(true)
      } catch (error) {
        console.log(error)
      }
    }
  }

  // Open table if recurringTasks exist and if it has any items
  function openTableHandler() {
    if (project.recurringTasks !== undefined && project.recurringTasks.length > 0) {
      setOpenTable(!openTable)
    }
  }

  return (
    <>
      {project.code === null ? <Skeleton height={350}/> :
        <Card sx={{
          display: 'flex',
          flexDirection: 'column',
          p: {
            xs: 2,
            sm: 3,
          },
          gap: 1,
        }}>
          <Typography variant='h6'>
            Recurring Tasks
          </Typography>
          <Box sx={{
            display: 'inline-flex',
            flexDirection: {
              xs: 'column',
              sm: 'row',
            },
            gap: 2,
            '.MuiTextField-root': {
              '&:nth-of-type(1)': {
                width: {
                  xs: '100%',
                  sm: '70%',
                }
              },
              width: {
                xs: '100%',
                sm: '30%',
              }
            }
          }}>
            <TextField
              id='task-text-input'
              label='Task'
              variant='filled'
              inputRef={taskTextRef}
            />
            <TextField 
              id='task-time-input'
              label='Repeat at'
              variant='filled'
              type="time"
              defaultValue="07:30"
              InputLabelProps={{
                shrink: true,
              }}
              inputProps={{
                step: 300, // 5 min
              }}
              sx={{ width: 150 }}
              inputRef={taskTimeRef}
            />
          </Box>
          <Box sx={{
            display: 'flex',
            justifyContent: 'end',
          }}>
            <Button
            id='save-notes-btn'
            variant='text'
            sx={{ mt: 2, mr: 1 }}
            onClick={() => openTableHandler()}
            >
              Show Tasks
            </Button>
            <Button
            id='save-notes-btn'
            variant='contained'
            sx={{ mt: 2 }}
            onClick={() => createRecurringTaskButtonHandler()}
            >
              Create Task
            </Button>
          </Box>
          <Box>
            <RecurringTasksTable project={project} open={openTable} />
          </Box>
        </Card>
      }
    </>
  )
}