import React from 'react'
import { Paper, Grid, Container, Typography, Avatar, Icon, Skeleton, TextField } from '@mui/material';
import { useCurrentUser } from '../context/currentUserContext';

function ProfileContent() {
  const { userFirst, userLast, userEmailAddress, userLoading } = useCurrentUser()
  const nameFirstLetter: string = userFirst?.charAt(0).toUpperCase()
  const surnameFirstLetter: string = userLast?.charAt(0).toUpperCase()

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography style={{ fontWeight: 'bold', marginBottom: 16 }} variant='h4'>{userLoading ? <Skeleton /> : `${userFirst} ${userLast}`}</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        {userLoading ? <Skeleton height={248}/> :
          <Paper
            sx={{
              py: 3,
              px: 4,
              display: 'flex',
              flexDirection: 'column',
            }}
            elevation={0}
          >
            <Typography style={{ fontWeight: 'bold' }} variant='h6'>User Information</Typography>
            <Paper
            sx={{
              pt: 4,
              display: 'flex',
              flexDirection: 'row',
            }}
            >
              <Icon sx={{ mr: 1, width: 120, height: 120 }}>
                <Avatar sx={{ width: 120, height: 120, bgcolor: "primary.main", color: "common.white", fontSize: 36, fontWeight: 'bold' }}>{nameFirstLetter}{surnameFirstLetter}</Avatar>
              </Icon>
              <Paper
              sx={{
                ml: 3,
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
              elevation={0}
              >
                <Paper
                sx={{
                  mb: 3,
                  display: 'flex',
                  flexDirection: 'row',
                }}
                elevation={0}
                >
                  <TextField fullWidth id="firstname" label="First Name" variant="filled" sx={{mr: 2}} />
                  <TextField fullWidth id="lastname" label="Last Name" variant="filled" />
                </Paper>
                  <TextField fullWidth id="email" label="Email address" variant="filled" defaultValue={userEmailAddress}/>
              </Paper>
            </Paper>
          </Paper>
          }
        </Grid>
        <Grid item xs={12}>
          {userLoading ? <Skeleton height={88}/> :
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography style={{ fontWeight: 'bold' }} variant='h6'>Password</Typography>
            <Typography variant='body1'>You should change your password every month to avoid security issues.</Typography>
          </Paper>
          }
        </Grid>
      </Grid>
    </Container>
  );
}

export default function Profile() {
  return <ProfileContent />;
}