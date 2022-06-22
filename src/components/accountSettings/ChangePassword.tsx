import { SetStateAction } from 'react'
// Material-ui
import { AlertColor, Box, Button, Card, Grid, Skeleton, Typography } from '@mui/material'
// npm packages
import { useDialog } from 'react-dialog-async'
// contexts
import { useCurrentUser } from '../../context/currentUserContext'
// components
import { ChangePasswordDialog } from './ChangePasswordDialog'

type Props = {
  setAlerts: React.Dispatch<SetStateAction<{message: string, variant: AlertColor}[]>>
}

function ChangePasswordContent({ setAlerts } : Props) {
  const {userLoading} = useCurrentUser()
  // useDialog react-dialog-async
  const changePasswordDialog = useDialog(ChangePasswordDialog)

  async function updatePassword() {
    await changePasswordDialog.show('password').then(alert => {
      if (alert !== undefined) {
        setAlerts(alert)
      }
    })
  }

  return (
    <Grid item xs={12}>
      {userLoading ? <Skeleton height={88}/> :
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: 3,
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: 1,
          pb: 2,
        }}>
          <Typography style={{ fontWeight: 'bold' }} variant='h6'>Password</Typography>
          <Button variant='outlined' onClick={updatePassword}>Change Password</Button>
        </Box>
        <Box>
          <Typography variant='body1'>You should change your password every month to avoid security issues.</Typography>
        </Box>
      </Card>
      }
    </Grid>
  )
}

export default function ChangePassword({ setAlerts } : Props) {
  return <ChangePasswordContent setAlerts={setAlerts} />
}