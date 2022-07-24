import { useEffect, useState } from 'react'
// Material-ui
import { ListItemText, ListItemButton, List, ListSubheader, Divider, Button, Box, TextField } from '@mui/material'
// Contexts
import { useAuth } from '../../context/authContext'
// npm packages
import { useDialog } from 'react-dialog-async'
import { useNavigate } from 'react-router-dom'
// Components
import { CreateProjectDialog } from '../CreateProjectDialog'
// Constants
import * as ROUTES from '../../constants/routes'
// Custom hooks
import useDebounce from '../../hooks/use-debounce'
// Redux toolkit
import { fetchSearchedProjects, fetchUserProjects } from '../../store/features/project/projectsSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

function ProjectsContent() {
  // Navigation
  const navigate = useNavigate()
  // Create project
  const createProjectDialog = useDialog(CreateProjectDialog)
  const [newProjectCreted, setNewProjectCreted] = useState(false)
  // Search
  const [searchValue, setSearchValue] = useState('')
  const [searchActive, setSearchActive] = useState(false)
  const searchDebounce = useDebounce(searchValue, 500)
  // User
  const { currentUser } = useAuth()

  async function CreateProjectDialogHandler() {
    await createProjectDialog.show('')
    setNewProjectCreted(true)
  }

  // Display projects
  // Dispatch redux functions for fetching projects
  const { projects } = useAppSelector(state => state.projects)
  const dispatch = useAppDispatch()

  // Search project only every 500ms and when there is > 2 chars enetered
  useEffect(() => {
    if (searchValue.length > 2) {
      dispatch(fetchSearchedProjects(searchValue))
      setSearchActive(true)
    }
    // Do not fetch data if search haven't been activated
    else if (searchActive) {
      dispatch(fetchUserProjects(currentUser.uid))
      setSearchActive(false)
    }
  },[searchDebounce])

  // Fetch data initaily and when new project created
  useEffect(() => {
    dispatch(fetchUserProjects(currentUser.uid))
    setNewProjectCreted(false)
  }, [newProjectCreted, currentUser.uid])
  

  return (
    <>
      <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        mb: 2,
        flexDirection: {
          xs: "column",
          sm: "row",
        },
        gap: 1,
      }}>
        <Button variant="contained" onClick={() => CreateProjectDialogHandler()}>Create new project</Button>
        <TextField 
          variant="filled"
          placeholder="Project Search"
          sx={{ ".MuiFilledInput-root": { height: 39 }, "input": { py: 0 } }}
          onChange={(e) => setSearchValue(e.currentTarget.value)}
        />
      </Box>
      <List
      sx={{bgcolor: "background.paper", borderRadius: 1, padding: 0}}
      subheader={
        <ListSubheader component="div" id="list-subheader" sx={{borderRadius: 1}}>
          Projects
        </ListSubheader>
      }>
        <Divider/>
          {projects?.map(project => (
            <ListItemButton component="div" key={project.code} onClick={() => navigate(ROUTES.PROJECT + project.code)}>
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