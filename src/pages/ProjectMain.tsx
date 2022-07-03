// Material-ui
import { Card, Container, Grid, List, ListItem, ListItemText, Skeleton, Typography} from '@mui/material'
import { useParams } from 'react-router-dom'
// npm packaged
import dateFormat from "dateformat";
import useUser from '../hooks/use-user';
import useProject from '../hooks/use-project';


function ProjectMainContent() {
  const { project_code } = useParams()
  const { project } = useProject(Number(project_code))
  const { user } = useUser(project.owner)
  const projectUser = user

  const column1 = [
    {primary: `${projectUser.name} ${projectUser.surname}`, secondary: 'Project owner'},
    {primary: projectUser.emailAddress, secondary: 'Project owner Email'},
    {primary: dateFormat(new Date(project.dateCreated), 'isoDate'), secondary: 'Project created'},
  ]
  const column1List = column1.map((element, index) => (
    <ListItem disableGutters key={index}>
      <ListItemText
        primary={element.primary}
        secondary={element.secondary}
      />
    </ListItem>
  ))

  const column2 = [
    {primary: project.code, secondary: 'Project code'},
    {primary: project.client, secondary: 'Project client'},
    {primary: project.name, secondary: 'Project Name'},
  ]
  const column2List = column2.map((element, index) => (
    <ListItem disableGutters key={index}>
      <ListItemText
        primary={element.primary}
        secondary={element.secondary}
      />
    </ListItem>
  ))
  
  return (
      <Container maxWidth='lg' sx={{ mt: 4 }}>
        <Typography style={{ fontWeight: 'bold', marginBottom: 16 }} variant='h4'>
          {project.code === null ? <Skeleton /> : `${project.code} - ${project.client} - ${project.name}`}
        </Typography>
        {project.code === null ? <Skeleton /> :
        <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 3,
          gap: 2,
        }}
        >
          <Typography variant='h6'>
            Credentials
          </Typography>
          <Grid container spacing={0}>
            <Grid item xs={12} md={6}>
              <List>
                {column1List}
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <List>
                {column2List}
              </List>
            </Grid>
          </Grid>
        </Card>
        }
      </Container>

  )
}

export default function ProjectMain() {
  return <ProjectMainContent />
}