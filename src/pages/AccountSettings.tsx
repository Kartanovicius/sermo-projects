import React, { useRef } from 'react'
import { Paper, Grid, Container, Typography, Avatar, Icon, Skeleton, TextField, Button, Card, Box } from '@mui/material';
import { useCurrentUser } from '../context/currentUserContext';
import { useAuth } from '../context/authContext';

function ProfileContent() {
  const { userFirst, userLast, userEmailAddress, userLoading } = useCurrentUser()

  const nameFirstLetter: string = userFirst?.charAt(0).toUpperCase()
  const surnameFirstLetter: string = userLast?.charAt(0).toUpperCase()

  const userFirstRef = useRef(userFirst)
  const userLastRef = useRef(userLast)
  const userEmailAddressRef = useRef(userEmailAddress)

  function updateUser() {
  }

  function updateUserProfile() {
    updateUser()
  }

  function resetUserInfo() {
    userFirstRef.current.value = userFirst
    userLastRef.current.value = userLast
    userEmailAddressRef.current.value = userEmailAddress
  }

  return (
    <Container maxWidth="lg">
      <Container sx={{ mt: 4, mb: 4, minHeight: `calc(100vh - 76px - 3.2rem)` }} disableGutters>
      <Typography style={{ fontWeight: 'bold', marginBottom: 16 }} variant='h4'>{userLoading ? <Skeleton /> : `${userFirst} ${userLast}`}</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
        {userLoading ? <Skeleton height={248}/> :
          <Card
            sx={{
              px: 3, pt: 3, pb: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography style={{ fontWeight: 'bold' }} variant='h6'>User Information</Typography>
            <Box
            sx={{
              py: 2,
              display: 'flex',
              flexDirection: 'row',
            }}
            >
              <Icon sx={{ mr: 3, width: 120, height: 120 }}>
                <Avatar sx={{ width: 120, height: 120, bgcolor: "primary.main", color: "common.white", fontSize: 36, fontWeight: 'bold' }}>{nameFirstLetter}{surnameFirstLetter}</Avatar>
              </Icon>
              <Box
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}
              >
                <Box
                sx={{
                  mb: 3,
                  display: 'flex',
                  flexDirection: 'row',
                }}
                >
                  <TextField fullWidth id="firstnameInput" label="First Name" variant="filled" sx={{mr: 2}} defaultValue={userFirst} inputRef={userFirstRef}/>
                  <TextField fullWidth id="lastnameInput" label="Last Name" variant="filled" defaultValue={userLast} inputRef={userLastRef}/>
                </Box>
                <Box>
                  <TextField fullWidth id="emailInput" label="Email address" variant="filled" defaultValue={userEmailAddress} inputRef={userEmailAddressRef}/>
                </Box>
              </Box>
            </Box>
          </Card>
          }
        </Grid>
        <Grid item xs={12}>
          {userLoading ? <Skeleton height={88}/> :
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', px: 3, pt: 3, pb: 2 }}>
              <Typography style={{ fontWeight: 'bold' }} variant='h6'>Password</Typography>
              <Button variant="outlined">Change Password</Button>
            </Box>
            <Box sx={{ px: 3, pb: 3 }}>
              <Typography variant='body1'>You should change your password every month to avoid security issues.</Typography>
            </Box>
          </Card>
          }
        </Grid>
      </Grid>
      </Container>
      <Paper sx={{ width: 'inherit', textAlign: 'end', display: 'inline-flex', gap: 2, justifyContent: 'end', py: 2, px: 3 }}>
        <Button variant="text" color="primary" onClick={(e) => resetUserInfo()}>Reset</Button>
        <Button variant="contained" onClick={(e) => updateUserProfile()}>Save</Button>
      </Paper>
    </Container>
  );
}

export default function Profile() {
  return <ProfileContent />;
}