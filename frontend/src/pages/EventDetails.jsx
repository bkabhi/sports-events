import styled from '@emotion/styled';
import { Box, Button, Card, CardContent, CardHeader, CardMedia, CssBaseline, Typography } from '@mui/material'
import { Container, Stack } from '@mui/system';
import React, { useEffect, useState } from 'react'
import SingleEventCard from './SingleEventCard'

const StyledProductImg = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
});

const EventDetails = () => {
    const [event, setEvent] = useState({})

    useEffect(() => {
        fetchEvent()
    }, [])

    const fetchEvent = async () => {
        const res = await fetch(`${'https://sports-event-server.onrender.com/api/event'}/`)
        const res2 = await res.json()
        console.log(res2.data.events);
        setEvent(res2.data.events[5])
    }
    let { title, image, timming, colors, playerLimit, description, address } = event;
    return (
        <Container>
            <CssBaseline />
            <Box display={'flex'} gap={5} pt={5}>
                <Box width='50%'>
                    <CardHeader
                        title={title}
                        subheader={address}
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
                        <Typography variant="h4" gutterBottom>
                            {title}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            {description}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            location:{address}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            timming: {timming}
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            playerLimit:{playerLimit}
                        </Typography>
                    </CardContent>
                    <Button
                        type='submit'
                        variant="contained"
                        sx={{ mt: 3, ml: 1 }}
                    >
                        Book Now
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}

export default EventDetails