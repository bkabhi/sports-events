import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ThemeChanger from './DarkTheme';
import logo from '../assets/sports.png'
import { NavLink } from 'react-router-dom'
import { Avatar, Container, Divider, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { BsFillCalendarPlusFill } from 'react-icons/bs'
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

const menuId = 'primary-search-account-menu';

export default function Navbar() {
    const [isAuth, setIsAuth] = React.useState(true)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                    '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem>
                <Avatar /> Profile
            </MenuItem>
            <MenuItem>
                <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem>
                <ListItemIcon>
                    <PersonAdd fontSize="small" />
                </ListItemIcon>
                Add another account
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                Settings
            </MenuItem>
            <MenuItem>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Container>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                        >
                            <NavLink to={'/'}>
                                <img width={'100rem'} src={logo} alt="sports events" />
                            </NavLink>
                        </IconButton>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: 'flex', gap: '2rem' }}>
                            <IconButton
                                size="small"
                                aria-label="show 17 new notifications"
                                color="inherit"
                            >
                                <NavLink to={'/EventsStatus'}>
                                    <Typography fontSize={'1.1rem'} color='#fff' >
                                        Status
                                    </Typography>
                                </NavLink>
                            </IconButton>
                            {
                                isAuth ?
                                    <IconButton
                                        size="large"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        color="inherit"
                                        onClick={handleClick}
                                    >
                                        <AccountCircle />
                                    </IconButton>
                                    :
                                    <IconButton
                                        size="small"
                                        aria-label="show 17 new notifications"
                                        color="inherit"
                                    >
                                        <NavLink to='/login'>
                                            <Typography fontSize={'1.1rem'} color='#fff' >
                                                Login / Register
                                            </Typography>
                                        </NavLink>
                                        {/* <NavLink to='/register'>
                                                <Typography fontSize={'1.1rem'} color='#fff' >
                                                    Register
                                                </Typography>
                                            </NavLink> */}
                                    </IconButton>
                            }
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {renderMenu}
            <ThemeChanger />
        </Box>
    );
}