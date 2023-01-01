import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { ColorModeContext } from '../../App';
import { Badge } from '@mui/material';
import styled from '@emotion/styled';

const StyledRoot = styled('div')(({ theme }) => ({
    zIndex: 999,
    right: 25,
    bottom: 25,
    display: 'flex',
    cursor: 'pointer',
    position: 'fixed',
    backgroundColor: theme.palette.background.paper,
    borderTopLeftRadius: Number(theme.shape.borderRadius) * 2,
    borderBottomLeftRadius: Number(theme.shape.borderRadius) * 2,
}));

function ThemeChanger() {
    const theme = useTheme();
    const colorMode = React.useContext(ColorModeContext);
    return (
        <StyledRoot>
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit" size="large" aria-label="show 4 new mails">
                <Badge color="error">
                    {theme.palette.mode === 'dark' ? <Brightness7Icon color="primary" /> : <Brightness4Icon color="primary" />}
                </Badge>
            </IconButton>
        </StyledRoot>
    );
}

export default ThemeChanger;