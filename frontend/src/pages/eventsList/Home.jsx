import { Button, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { useEffect } from "react"
import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ThemeChanger from '../../components/theme/DarkTheme';
import Iconify from '../../components/iconify/Iconify';
import { getEventsAPI } from '../../redux/event/action';
import EventSearch from '../../components/searchAndFilter/EventSearch';
import EventSort from '../../components/searchAndFilter/EventSort';
import SingleEventCard from './SingleEventCard';

const SORT_OPTIONS = [
    { value: 'Badminton', label: 'Badminton' },
    { value: 'Football', label: 'Football' },
    { value: 'Cricket', label: 'Cricket' },
];

let debounceid = 0;

const Home = () => {
    const { events, isloading } = useSelector((store) => store.event);
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const [filter, setFilter] = useState("");

    useEffect(() => {
        dispatch(getEventsAPI({ q: searchQuery, category: filter }));
    }, [searchQuery, filter]);

    const handleSearch = (e) => {
        debounceid && clearTimeout(debounceid);
        debounceid = setTimeout(() => setSearchQuery(e.target.value), 400);
    };

    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5} mt={5}>
                <Typography variant="h4" gutterBottom>
                    Events
                </Typography>
                <Link to={'/CreateEvent'}>
                    <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                        New Event
                    </Button>
                </Link>
            </Stack>
            <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
                {/* <EventSearch events={events} />
                <EventSort options={SORT_OPTIONS} /> */}
                <TextField
                    label= 'Search events'
                    onChange={handleSearch} />
                <Box width={'10rem'}>
                    <TextField select size="small" label="Filter by Sports" fullWidth value={filter} onChange={(e) => setFilter(e.target.value)}>
                        {SORT_OPTIONS.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
            </Stack>
            <Grid container spacing={3} pb={5}>
                {
                isloading ? <h1>...Loading</h1>:
                events.length===0 ? <h1>Not Found</h1>:
                events.map((event) => (
                    <Grid key={event._id} item xs={12} sm={6} md={4}>
                        <Link to={`event/${event._id}`}>
                            <SingleEventCard event={event} />
                        </Link>
                    </Grid>
                ))}
            </Grid>
        </>
    )
}

export default Home