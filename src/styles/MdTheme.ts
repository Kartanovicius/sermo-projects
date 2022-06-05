import { createTheme } from "@mui/material";
import { Shadows } from "@mui/material/styles/shadows";

const mdTheme = createTheme({
  palette: {
    primary: {
      light: '#f4f9fc',
      main: '#056DFF',
    },
    background: {
      default: '#eef6f8',
      paper: '#fff'
    },
    text: {
      secondary: '#79778f',
      primary: '#28234A',
    },
    action: {
      hover: '#e6f0fe',
    }
  },
  typography: {
    fontFamily: [
      'Inter',
      'sans-serif',
    ].join(','),
  },
  shadows: Array(25).fill("none") as Shadows,
});

export default mdTheme;