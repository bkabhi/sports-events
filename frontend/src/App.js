import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from './components/navbar/Navbar';
import { Container } from '@mui/system';
import { Box, CssBaseline } from '@mui/material';
import AllRoutes from './routes/All.routes';
export const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

export default function App() {
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Box>
          <CssBaseline/>
          <Navbar/>
          <Container>
            <AllRoutes/>
          </Container>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}