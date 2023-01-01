import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container, CssBaseline, Grid } from '@mui/material';
import { getBookingAPI } from '../../redux/booking/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import SingleEventCard from '../eventsList/SingleEventCard';
import PendingForApprove from './PendingForApprove';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography component={'h1'}>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

export default function FullWidthTabs() {
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const { bookings } = useSelector((store) => store.booking);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(getBookingAPI());
    }, []);

    return (
        <>
            <CssBaseline />
            <Box sx={{ bgcolor: 'background.paper', mt: 2 }}>
                <AppBar position="static">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Accepted" {...a11yProps(0)} />
                        <Tab label="Requested" {...a11yProps(1)} />
                        <Tab label="Rejected" {...a11yProps(2)} />
                        <Tab label="Pending For Approve" {...a11yProps(2)} />
                    </Tabs>
                </AppBar>
                <SwipeableViews
                    axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                    index={value}
                    onChangeIndex={handleChangeIndex}
                >
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        
                        <Grid container spacing={3} pb={5}>
                            {
                                bookings.filter((booking) => booking.status === "Approved").map((event) => (
                                    <Grid key={event._id} item xs={12} sm={6} md={4}>
                                        <Link to={`/event/${event.event._id}`}>
                                            <SingleEventCard event={event.event} />
                                        </Link>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        
                        <Grid container spacing={3} pb={5}>
                            {
                                bookings.filter((booking) => booking.status === "Pending").map((event) => (
                                    <Grid key={event._id} item xs={12} sm={6} md={4}>
                                        <Link to={`/event/${event.event._id}`}>
                                            <SingleEventCard event={event.event} />
                                        </Link>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        
                        <Grid container spacing={3} pb={5}>
                            {
                                bookings.filter((booking) => booking.status === "Rejected").map((event) => (
                                    <Grid key={event._id} item xs={12} sm={6} md={4}>
                                        <Link to={`/event/${event.event._id}`}>
                                            <SingleEventCard event={event.event} />
                                        </Link>
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={3} dir={theme.direction}>
                        <PendingForApprove />
                    </TabPanel>
                </SwipeableViews>
            </Box>
        </>
    );
}
