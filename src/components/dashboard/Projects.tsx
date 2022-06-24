// Material-ui
import { ListItemText, ListItemButton, List, ListSubheader, Divider, Button, Box } from '@mui/material'
import { useDialog } from 'react-dialog-async'
// npm packages
import { CreateProjectDialog } from './CreateProjectDialog'

function ProjectsContent() {
  const createProjectDialog = useDialog(CreateProjectDialog)

  async function CreateProjectDialogHandler() {
    await createProjectDialog.show('')
  }

  return (
    <>
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        mb: 2,
      }}>
        <Button variant='contained' onClick={(e) => CreateProjectDialogHandler()}>Create new project</Button>
      </Box>
      <List
      sx={{bgcolor: 'background.paper', borderRadius: 1, padding: 0}}
      subheader={
        <ListSubheader component='div' id='list-subheader' sx={{borderRadius: 1}}>
          Projects
        </ListSubheader>
      }>
        <Divider/>
        <ListItemButton component='div'>
          <ListItemText primary={`Project number - project client - project name`}/>
        </ListItemButton>
      </List>
    </>
  )
}

export default function Projects() {
  return <ProjectsContent />
}