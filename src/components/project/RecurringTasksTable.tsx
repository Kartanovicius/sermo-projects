import { useEffect } from 'react'
// Material-ui
import { Checkbox, Collapse, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
// Firebase
import { updateProjectByCode } from '../../services/firebase'
// npm packages
import moment from 'moment'
// Types
import { IProject, IRecurringTask } from '../../types'
// Custom hooks
import useProject from '../../hooks/use-project'

interface Props {
  project: IProject
  open: boolean
}

export default function RecurringTasksTable ({project, open}: Props) {
  const { code, recurringTasks } = project
  const { setReload } = useProject(Number(code))

  // Test if recurringTasks are not undefined if undefined set an empty array 
  if (recurringTasks === undefined) {
    throw new Error(`
    recurringTasks array undefined\n
    recurringTasks should always have at least one item when passed to RecurringTasksTable
    `)
  }

  function deleteHandler(index: number) {
    if (code !== undefined && code !== null) {
      recurringTasks?.splice(index, 1)
      updateProjectByCode(code, { recurringTasks: recurringTasks })
      .then(() => setReload(true))
    }
  }

  function doneCheckboxHandler(item: IRecurringTask, index: number) {
    if (code !== undefined && code !== null && recurringTasks !== undefined) {
      recurringTasks[index]['done'] = !item.done
      updateProjectByCode(code, { recurringTasks: recurringTasks })
      .then(() => setReload(true))
    }
  }

  useEffect(() => {
    return () => {
      recurringTasks.forEach((task, index) => {
        if (task.time - moment().valueOf() < 0 && code !== undefined && code !== null) {
          recurringTasks[index]['done'] = false
          while (task.time - moment().valueOf() < 0) {
            recurringTasks[index]['time'] = moment(task.time).add(1, 'd').valueOf()
          }
          updateProjectByCode(code, { recurringTasks: recurringTasks })
          .then(() => setReload(true))
        }
      });
    }
  }, [])
  

  const RecurringTasksList = recurringTasks.map((item, index) =>
    <ListItem 
    key={index}
    secondaryAction={
      <IconButton disableRipple edge="end" aria-label="delete" onClick={() => deleteHandler(index)}>
        <DeleteOutlineRoundedIcon />
      </IconButton>
    }>
      <ListItemButton onClick={() => doneCheckboxHandler(item, index)} dense>
        <ListItemIcon>
            <Checkbox
              edge="start"
              checked={item.done}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': item.task }}
            />
          </ListItemIcon>
        <ListItemText 
        primary={item.task} 
        secondary={"Next reminder at " + moment(item.time).toObject().hours + ":" + moment(item.time).toObject().minutes} />
      </ListItemButton>
    </ListItem>
  )

  return (
    <Collapse in={open} unmountOnExit >
      <Divider sx={{ pt:1 }}/>
      <List disablePadding>
        {RecurringTasksList}
      </List>
    </Collapse>
  )
}