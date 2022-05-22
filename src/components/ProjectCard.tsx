import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

interface ProjectCardInterface {
  code: string, 
  clientName: string,
  projectName: string
}

export default function ProjectCard(props: ProjectCardInterface) {
  return (
    <Box>
      <Card variant="outlined" sx={{ py: 1.5}}>
        <Typography variant="h5" gutterBottom>
          {props.code} - {props.clientName} - {props.projectName}
        </Typography>
      </Card>
    </Box>
  )
}
