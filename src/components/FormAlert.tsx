import React, { useEffect, useState } from 'react'
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';


export default function FormAlert (props: { status: boolean; message: string; }) {
  const [alertStatus, setAlertStatus] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')

  useEffect(() => {
    setAlertStatus(props.status)
    setAlertMessage(props.message)
  }, [props.status, props.message])
  

  return (
    <>
      <Collapse in={alertStatus}>
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setAlertStatus(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
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