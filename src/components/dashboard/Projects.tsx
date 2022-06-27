// Material-ui
import { ListItemText, ListItemButton, List, ListSubheader, Divider, Button, Box, Alert } from '@mui/material'
import { DocumentData } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useDialog } from 'react-dialog-async'
import { useAuth } from '../../context/authContext'
import { getUserProjects } from '../../services/firebase'
// npm packages
import { CreateProjectDialog } from './CreateProjectDialog'

function ProjectsContent() {
  // Create project
  const createProjectDialog = useDialog(CreateProjectDialog)
  const [newProjectCreted, setNewProjectCreted] = useState(false)

  async function CreateProjectDialogHandler() {
    await createProjectDialog.show('')
    setNewProjectCreted(true)
  }

  // Display projects
  const { currentUser } = useAuth()
  const [projectList, setProjectList] = useState<DocumentData[]>([])

  useEffect(() => {
    getUserProjects(currentUser.uid).then(res => {
      let projects: DocumentData[] = []
      if (res !== undefined) {
        res.forEach(res => {
          return projects.push(res)
        })
      }
      return setProjectList(projects)
    })
    setNewProjectCreted(false)
  }, [currentUser.uid, newProjectCreted])

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
          {[...projectList].map(project => (
            <ListItemButton component='div' key={project.code}>
              <ListItemText primary={`${project.code} - ${project.client} - ${project.name}`}/>
            </ListItemButton>
          ))}
      </List>
    </>
  )
}

export default function Projects() {
  return <ProjectsContent />
}