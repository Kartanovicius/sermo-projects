// Material-ui
import { ListItemText, ListItemButton, List, ListSubheader, Divider, Button, Box } from '@mui/material'
// npm packages
import { useNavigate } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

function ProjectsContent() {
  const navigate = useNavigate()

  return (
    <>
      <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        mb: 2,
      }}>
        <Button variant='contained' onClick={(e) => navigate(ROUTES.CREATE_NEW_PROJECT)}>Create new project</Button>
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