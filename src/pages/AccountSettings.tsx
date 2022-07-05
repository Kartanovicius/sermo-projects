import React, { useState } from 'react'
// Material-ui
import { Container, Typography, Skeleton, Alert, Collapse, Grid, AlertColor } from '@mui/material'
// Contexts
import { useCurrentUser } from '../context/currentUserContext'
// Components
import UserInformation from '../components/accountSettings/UserInformation'
import ChangePassword from '../components/accountSettings/ChangePassword'

function AccountSettingsContent() {
  const { userFirst, userLast, userLoading } = useCurrentUser()

  const [alerts, setAlerts] = useState<{message: string, variant: AlertColor}[]>([])

  const alertsList = alerts.map((alert) =>
    <Collapse in={true} sx={{ my: 2 }} key={alert.message}>
      <Alert severity={alert.variant}>
        {alert.message}
      </Alert>
    </Collapse>
  )

  return (
    <Container maxWidth='lg'>
      <Container sx={{ my: 4 }} disableGutters>
      {alertsList}
      <Typography style={{ fontWeight: 'bold', marginBottom: 16 }} variant='h4'>
        {userLoading ? <Skeleton /> : `${userFirst} ${userLast}`}
      </Typography>
      <Grid container spacing={3}>
        <UserInformation setAlerts={setAlerts}/>
        <ChangePassword setAlerts={setAlerts}/>
      </Grid>
      </Container>
    </Container>
  )
}

export default function AccountSettings() {
  return <AccountSettingsContent />
}