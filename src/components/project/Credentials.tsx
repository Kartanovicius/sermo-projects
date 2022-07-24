// Material-ui
import { ListItem, ListItemText, Skeleton, Card, Typography, Divider, Grid, List } from '@mui/material'
// npm packages
import dateFormat from 'dateformat'
// Types
import { IProject } from '../../store/features/project/project.types'
import { IUser } from '../../types'

interface Props {
  projectUser: IUser,
  project: IProject
}

export default function Credentials({projectUser, project}: Props) {

  const column1 = [
    {primary: `${projectUser.name} ${projectUser.surname}`, secondary: 'Project owner'},
    {primary: projectUser.emailAddress, secondary: 'Project owner Email'},
    {primary: dateFormat(new Date(project.dateCreated), 'isoDate'), secondary: 'Project created'},
  ]
  const column1List = column1.map((element, index) => (
    <ListItem disableGutters key={index}>
      <ListItemText
        primary={element.primary}
        secondary={element.secondary}
      />
    </ListItem>
  ))

  const column2 = [
    {primary: project.code, secondary: 'Project code'},
    {primary: project.client, secondary: 'Project client'},
    {primary: project.name, secondary: 'Project Name'},
  ]
  const column2List = column2.map((element, index) => (
    <ListItem disableGutters key={index}>
      <ListItemText
        primary={element.primary}
        secondary={element.secondary}
      />
    </ListItem>
  ))
  
  return (
    <>
      {project.code === null ? <Skeleton height={350}/> :
        <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: {
            xs: 2,
            sm: 3
          },
        }}
        >
          <Typography variant='h6' sx={{ mb: 1 }}>
            Credentials
          </Typography>
          <Divider />
          <Grid container spacing={0}>
            <Grid item xs={12} md={6}>
              <List dense sx={{ py:0 }}>
                {column1List}
              </List>
            </Grid>
            <Grid item xs={12} md={6}>
              <List dense sx={{ py:0 }}>
                {column2List}
              </List>
            </Grid>
          </Grid>
        </Card>
      }
    </>
  )
}
