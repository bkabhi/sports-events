import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar';
import AllRoutes from './components/AllRoutes';
import { Container } from '@mui/system';
import { Box } from '@mui/material';
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
        <Box backgroundColor={theme.palette.background.paper} height="100%">
          <Navbar/>
          <Container>
            <AllRoutes/>
          </Container>
        </Box>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}