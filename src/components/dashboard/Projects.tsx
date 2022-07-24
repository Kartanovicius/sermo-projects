import { useState } from 'react'
// Material-ui
import { ListItemText, ListItemButton, List, ListSubheader, Divider, Button, Box, TextField } from '@mui/material'
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
import { useGetProjectsByKeywordQuery } from '../../store/features/project/project.api'

function ProjectsContent() {
  // Navigation
  const navigate = useNavigate()
  // Create project
  const createProjectDialog = useDialog(CreateProjectDialog)
  // Search
  const [searchValue, setSearchValue] = useState('')
  const searchDebounce = useDebounce(searchValue, 500)

  async function CreateProjectDialogHandler() {
    await createProjectDialog.show('')
    // Refect projects after new project were created
    refetch()
  }

  const { data: projects, refetch } = useGetProjectsByKeywordQuery(searchDebounce.toLowerCase(), { 
    skip: searchDebounce.length > 0 && searchDebounce.length < 3
  })

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