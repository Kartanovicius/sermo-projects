import React from 'react';
// Material-ui
import { Grid, Container, Typography, Box } from '@mui/material';
import { useAuth } from '../context/authContext';
import { createProject, getUserProjects } from '../services/firebase';
// components


function CreateProjectContent() {
  const { currentUser } = useAuth()

  function createProjectHandler() {
    createProject(currentUser.uid, 123456, 'novartis', 'fat')
    getUserProjects(currentUser.uid)
    console.log(getUserProjects(currentUser.uid))
  }

  return (
    <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
      <Typography style={{fontWeight:'700'}} sx={{ typography: { sm: 'h4', xs: 'h6' } }}>
        Create new project
      </Typography>
      <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',

      }}>

      </Box>
    </Container>
  );
}

export default function CreateProject() {
  return <CreateProjectContent />;
}