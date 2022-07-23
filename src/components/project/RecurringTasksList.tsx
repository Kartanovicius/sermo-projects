// Material-ui
import { Checkbox, Collapse, Divider, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
// npm packages
import moment from 'moment'
// Types
import { IProject, IRecurringTask } from '../../types'

interface Props {
  code: IProject['code']
  open: boolean
  recurringTasksList: IProject['recurringTasks']
  deleteHandler: (code: number, index: number) => any
  doneCheckboxHandler: (code: number, item: IRecurringTask, index: number) => any
}

export default function RecurringTasksList ({recurringTasksList, open, code, deleteHandler, doneCheckboxHandler}: Props) {
  
  if (code === null) {
    throw new Error('Project code can\'t be null value')
  }

  const RecurringTasksList = recurringTasksList.map((item, index) =>
    <ListItem 
    key={index}
    secondaryAction={
      <IconButton disableRipple edge="end" aria-label="delete" onClick={() => deleteHandler(code, index)} >
        <DeleteOutlineRoundedIcon />
      </IconButton>
    }>
      <ListItemButton onClick={() => doneCheckboxHandler(code, item, index)} dense>
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