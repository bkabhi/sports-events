import styled from '@emotion/styled';
import { Box, Button, Card, CardContent, CardHeader, CardMedia, CssBaseline, Typography } from '@mui/material'
import { Container, Stack } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createBookingAPI, getApprovedPlayerListAPI } from '../../redux/booking/actions';
import { getEventDetailsAPI } from '../../redux/event/action';
import SingleEventCard from '../eventsList/SingleEventCard'

const StyledProductImg = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
});

const EventDetails = () => {
    const { eventDetails, isloading } = useSelector((store) => store.event);
    const { approvedPlayerList } = useSelector((store) => store.booking);
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEventDetailsAPI(id));
    }, []);

    useEffect(() => {
        eventDetails._id && dispatch(getApprovedPlayerListAPI(eventDetails._id));
    }, [eventDetails._id]);

    const handleBooking = () => {
        dispatch(createBookingAPI({ status: "approve", event: eventDetails._id }))
            .then((res) => { })
            .catch((error) => { });
    };

    console.log(eventDetails, " eventDetails ", id);

    let { title, image, category, schedule, playersLimit, description, city='Bangalore' } = eventDetails;

    if(isloading){
        return <h1>...Loading</h1>
    }
    return (
        <Container>
            <CssBaseline />
            <Box display={'flex'} gap={5} pt={5}>
                <Box width='50%'>
                    <CardHeader
                        title={title}
                        subheader={city}
                    />
                    <Card>
                        <CardMedia
                            component="img"
                            height="430px"
                            image={image}
                            alt="Paella dish"
                        />
                    </Card>
                </Box>
                <Box width='50%'>
                    <CardContent>
                        <Typography variant="h3" gutterBottom mb={5} mt={5}>
                            {title}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                        Description : {description}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            location : {city}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Event Time : {schedule}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Players Limit : {playersLimit}
                        </Typography>
                    </CardContent>
                    <Button
                        type='submit'
                        variant="contained"
                        sx={{ mt: 3, ml: 1 }}
                        onClick={handleBooking}
                    >
                        Book Now
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default EventDetails