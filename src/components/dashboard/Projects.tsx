import { ListItemText, ListItemButton, List, ListSubheader, Divider } from '@mui/material';

function ProjectsContent() {
  
  return (
    <List
    sx={{bgcolor: "background.paper", borderRadius: 1, padding: 0}}
    subheader={
      <ListSubheader component="div" id="list-subheader" sx={{borderRadius: 1}}>
        Projects
      </ListSubheader>
    }>
      <Divider/>
      <ListItemButton component="div">
        <ListItemText primary={`Project number - project client - project name`} />
      </ListItemButton>
    </List>
  );
}

export default function Projects() {
  return <ProjectsContent />;
}