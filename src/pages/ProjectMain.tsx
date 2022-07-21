// Material-ui
import { Container, Grid, Skeleton, Typography} from '@mui/material'
import { useParams } from 'react-router-dom'
// Components
import Credentials from '../components/project/Credentials'
import Notes from '../components/project/Notes'
import RecurringTasks from '../components/project/RecurringTasks'
// npm packaged
import useUser from '../hooks/use-user'
import useProject from '../hooks/use-project'

function ProjectMainContent() {
  const { project_code } = useParams()
  const { project } = useProject(Number(project_code))
  const { user } = useUser(project.owner)

  return (
    <Container maxWidth='lg' sx={{ my: 4, gap: 2 }}>
      <Typography style={{ fontWeight: 'bold', marginBottom: 32 }} variant='h4'>
        {project.code === null ? <Skeleton /> : `${project.code} - ${project.client} - ${project.name}`}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Credentials projectUser={user} project={project}/>
        </Grid>
        <Grid item xs={12}>
          <Notes project={project}/>
        </Grid>
        <Grid item xs={12}>
          <RecurringTasks project={project}/>
        </Grid>
      </Grid>
    </Container>
  )
}

export default function ProjectMain() {
  return <ProjectMainContent />
}