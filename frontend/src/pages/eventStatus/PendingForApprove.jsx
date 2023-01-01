import { Button, Card, Grid, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getBookingAPI, getPendingApprovalAPI, updateBookingAPI } from '../../redux/booking/actions';

const PendingForApprove = () => {
    const { myPendingApprovalBookings, isloading } = useSelector((store) => store.booking);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getPendingApprovalAPI());
    }, []);

    const handleBooking = (eventid, status) => {
        dispatch(updateBookingAPI(eventid, { status }))
            .then(() => {
                dispatch(getPendingApprovalAPI());
                dispatch(getBookingAPI());
            })
    };

    console.log(myPendingApprovalBookings, isloading," myPendingApprovalBookings ");
    
    if (isloading) {
        return <p>...Loading</p>
    }

    return (
        <div>
            {
                myPendingApprovalBookings?.length ?
                    <Grid container spacing={3} pb={5}>
                        {
                            myPendingApprovalBookings?.map((event) => (
                                <Grid key={event._id} item xs={12} sm={6} md={4}>
                                    <Card>
                                        <Box sx={{ position: 'relative' }}>
                                            <img width={'100%'} alt={event.event.title} src={event.event.image} />
                                        </Box>
                                        <Stack spacing={2} sx={{ p: 3 }}>
                                            <Typography variant="subtitle2" noWrap>
                                                {event.event.title}
                                            </Typography>
                                            <Typography variant="subtitle2" noWrap>
                                                {event.requester.firstName + event.requester.lastName}
                                            </Typography>
                                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                                <Typography variant="subtitle1">
                                                    {event.event.playersLimit}
                                                </Typography>
                                                <Typography variant="subtitle1">
                                                    {event.event.schedule}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                        <Box display={'flex'} justifyContent='space-around' mb={5}>
                                            <Button size="sm"
                                            variant="contained"
                                            onClick={() => handleBooking(event._id, "Accept")}>
                                                Accept
                                            </Button>
                                            <Button size="sm"
                                            variant="contained"
                                            onClick={() => handleBooking(event._id, "Reject")}>
                                                Reject
                                            </Button>
                                        </Box>
                                    </Card>
                                </Grid>
                            ))
                        }
                    </Grid>
                    : <Typography variant="subtitle1">
                        No Pending
                    </Typography>
            }
        </div>
    )
}

export default PendingForApprove