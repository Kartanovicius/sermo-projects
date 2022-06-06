import React from 'react';
//mui
import { Grid, Container, Typography } from '@mui/material';
//components
import Projects from '../components/dashboard/Projects';
import Weather from '../components/dashboard/Weather';
import useUser from '../hooks/use-user';
import { useAuth } from '../context/authContext';

function DashboardContent() {
  const { currentUser } = useAuth()
  const { user } = useUser(currentUser.uid)
  const email: string = user?.emailAddress
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography fontWeight={ 'bold' } sx={{ typography: { sm: 'h4', xs: 'h6' } }}>
        Hello there, {email}
      </Typography>
      <Typography variant='subtitle1' sx={{ mb: 5}}>
        What's new
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7} lg={8}>
          <Projects />
        </Grid>
        <Grid item xs={12} md={5} lg={4}>
          <Weather/>
        </Grid>
      </Grid>
    </Container>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}