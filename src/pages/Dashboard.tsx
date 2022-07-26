import React from 'react'
// Material-ui
import { Grid, Container, Typography, Skeleton } from '@mui/material'
// contexts
import { useCurrentUser } from '../context/currentUserContext'
// components
import Projects from '../components/dashboard/Projects'
import Weather from '../components/dashboard/Weather'

function DashboardContent() {
  const { userEmailAddress } = useCurrentUser()

  return (
    <Container maxWidth='lg' sx={{ my: 4 }}>
      <Typography style={{ fontWeight: '700' }} sx={{ typography: { sm: 'h4', xs: 'h6' } }}>
        {userEmailAddress === undefined ? <Skeleton /> : `Hello there, ${userEmailAddress}`}
      </Typography>
      <Typography variant='subtitle1' sx={{ mb: 5 }}>
        All these projects are waiting for you
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7} lg={8}>
          <Projects />
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Weather />
        </Grid>
      </Grid>
    </Container>
  )
}

export default function Dashboard() {
  return <DashboardContent />
}
