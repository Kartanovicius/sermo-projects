import React from 'react'
// Material-ui
import { Container, Grid, Skeleton, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
// Components
import Credentials from '../components/project/Credentials'
import Notes from '../components/project/Notes'
import RecurringTasks from '../components/project/RecurringTasks'
// custom hooks
import useUser from '../hooks/use-user'
// RTK
import { useGetProjectQuery } from '../store/features/project/project.api'

export default function ProjectMain() {
  const { project_code } = useParams()
  const { data: project, refetch } = useGetProjectQuery(Number(project_code))
  const { user } = useUser(project !== undefined ? project.owner : '')

  return (
    <Container maxWidth='lg' sx={{ my: 4, gap: 2 }}>
      <Typography
        style={{ fontWeight: 'bold', marginBottom: 32, fontSize: '2.125rem' }}
        variant='h1'
      >
        {project === undefined ? (
          <Skeleton />
        ) : (
          `${project.code} - ${project.client} - ${project.name}`
        )}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          {!project || !user ? (
            <Skeleton height={350} />
          ) : (
            <Credentials projectUser={user} project={project} />
          )}
        </Grid>
        <Grid item xs={12}>
          {!project ? <Skeleton height={350} /> : <Notes project={project} refetch={refetch} />}
        </Grid>
        <Grid item xs={12}>
          {!project ? (
            <Skeleton height={350} />
          ) : (
            <RecurringTasks project={project} refetch={refetch} />
          )}
        </Grid>
      </Grid>
    </Container>
  )
}
