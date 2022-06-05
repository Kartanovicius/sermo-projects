import * as React from 'react'
import { useParams } from 'react-router-dom';
import { Paper, Grid, Container } from '@mui/material';


function ProfileContent() {
  let params = useParams();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div>{params.userid}</div>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default function Profile() {
  return <ProfileContent />;
}