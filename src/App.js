import React from 'react';
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#020431",
    },
    secondary: {
      main: "#DB4922",
    },
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
