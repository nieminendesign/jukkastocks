import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#ff4081" },
    secondary: { main: "#00e5ff" },
    background: {
      default: "#121212",
      paper: "#1e1e1e",
    },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container>
        <Typography variant="h4" gutterBottom>
          Jukkastocks – Tulossa pian
        </Typography>
        <Typography variant="body1">
          Tämä on alustava versio. Toiminnot lisätään pian.
        </Typography>
      </Container>
    </ThemeProvider>
  );
}

export default App;
