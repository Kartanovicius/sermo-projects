import React, { useEffect, useState } from 'react'
import Alert, { AlertColor } from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import CloseIcon from '@mui/icons-material/Close'

type Props = {
  status: boolean, 
  message: string, 
  variant: AlertColor 
}

export default function FormAlert ({ status, message, variant } : Props) {
  const [alertStatus, setAlertStatus] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const [alertVariant, setAlertVariant] = useState<AlertColor>('success')

  useEffect(() => {
    setAlertStatus(status)
    setAlertMessage(message)
    setAlertVariant(variant)
  }, [status, message, variant])
  

  return (
    <>
      <Collapse in={alertStatus}>
        <Alert
        severity={alertVariant}
        action={
          <IconButton
            aria-label='close'
            color='inherit'
            size='small'
            onClick={() => {
              setAlertStatus(false)
            }}
          >
            <CloseIcon fontSize='inherit' />
          </IconButton>
        }
        sx={{ mb: 2 }}
        >
          {alertMessage}
        </Alert>
      </Collapse>
    </>
  )
}