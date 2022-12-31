import { Button, Grid, Stack, Typography } from '@mui/material';
import React from 'react'
import { useEffect } from "react"
import { useState } from "react"
import { Link } from 'react-router-dom';
import ThemeChanger from '../components/DarkTheme';
import Iconify from '../components/iconify/Iconify';
import CartWidget from '../components/ProductCartWidget';
import EventSearch from './EventSearch';
import EventSort from './EventSort';
import SingleEventCard from './SingleEventCard';

const baseUrl = 'http://localhost:4000';

const SORT_OPTIONS = [
    { value: 'latest', label: 'Latest' },
    { value: 'popular', label: 'Popular' },
    { value: 'oldest', label: 'Oldest' },
];

const Home = () => {
    const [events, setEvents] = useState([])

    useEffect(() => {
        fetchEvent()
    }, [])

    const fetchEvent = async () => {
        const res = await fetch(`${'https://sports-event-server.onrender.com/api/event'}/`)
        const res2 = await res.json()
        console.log(res2.data.events);
        setEvents(res2.data.events)
    }
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
                <EventSearch events={events} />
                <EventSort options={SORT_OPTIONS} />
            </Stack>

            <Grid container spacing={3} pb={5}>
                {events.map((event) => (
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