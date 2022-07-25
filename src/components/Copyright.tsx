import React from 'react'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'

export default function Copyright(props: any) {
  return (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
      {'Copyright © '}
      <Link color='inherit' href='https://github.com/Kartanovicius'>
        Yogurt/Kartanovicius
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
