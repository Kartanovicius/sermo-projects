// Material-ui
import { Container, Grid, Skeleton, Typography} from '@mui/material'
import { useParams } from 'react-router-dom'
// Components
import Credentials from '../components/project/Credentials'
import Notes from '../components/project/Notes'
import RecurringTasks from '../components/project/RecurringTasks'
// custom hooks
import useUser from '../hooks/use-user'
import useProject from '../hooks/use-project'

function ProjectMainContent() {
  const { project_code } = useParams()
  const { project } = useProject(Number(project_code))
  const { user } = useUser(project !== undefined ? project.owner : '')

  return (
    <Container maxWidth='lg' sx={{ my: 4, gap: 2 }}>
      <Typography style={{ fontWeight: 'bold', marginBottom: 32 }} variant='h4'>
        {project === undefined ? <Skeleton /> : `${project.code} - ${project.client} - ${project.name}`}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        {!project || !user ? <Skeleton height={350}/> :
          <Credentials projectUser={user} project={project}/>
        }
        </Grid>
        <Grid item xs={12}>
        {!project ? <Skeleton height={350}/> :
          <Notes project={project}/>
        }
        </Grid>        
        <Grid item xs={12}>
        {!project ? <Skeleton height={350}/> :
          <RecurringTasks project={project}/>
        }
        </Grid>
      </Grid>
    </Container>
  )
}

export default function ProjectMain() {
  return <ProjectMainContent />
}