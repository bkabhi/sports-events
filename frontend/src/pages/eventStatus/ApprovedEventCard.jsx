import PropTypes from 'prop-types';
import { Box, Card, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getApprovedPlayerListAPI } from '../../redux/booking/actions';
import { useEffect } from 'react';
import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state';

const StyledProductImg = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
});

// ----------------------------------------------------------------------

ApprovedEventCard.propTypes = {
    product: PropTypes.object,
};

export default function ApprovedEventCard({ event }) {
    const dispatch = useDispatch();
    const { approvedPlayerList } = useSelector((store) => store.booking);
    let { title, _id, image: cover, schedule, playersLimit, city, organizer, category } = event;
    useEffect(() => {
        _id && dispatch(getApprovedPlayerListAPI(_id));
    }, [_id]);
    
    return (
        <Card sx={{ boxShadow: 3 }} className='singleCardList'>
            <Box sx={{ pt: '60%', position: 'relative' }}>
                <StyledProductImg alt={title} src={cover} />
                <Typography variant="subtitle2" position={'absolute'} fontWeight='800' fontSize={12} color='white'
                    zIndex='10' top={0} borderRadius='4px 0px' backgroundColor='#1776d2' p='5px' >
                    Sports : {category}
                </Typography>
            </Box>
            <Stack spacing={2} sx={{ p: 3 }} >
                <Typography variant="subtitle2" fontWeight={'600'} noWrap>
                    {title}
                </Typography>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle2" noWrap>
                        City: {city}
                    </Typography>
                    <Typography variant="subtitle2" noWrap>
                        Players Limit: {playersLimit}
                    </Typography>
                </Stack>
                <Typography variant="subtitle2" noWrap>
                    Event Timing : {schedule}
                </Typography>
            </Stack>
            <Box display={'flex'} justifyContent='space-around' mb={5}>
                <Link to={`/event/${_id}`}>
                    <Button size="sm"
                        variant="contained">
                        More Details
                    </Button>
                </Link>
                <PopupState variant="popover" popupId="demo-popup-menu">
                {(popupState) => (
                    <React.Fragment>
                    <Button variant="contained" {...bindTrigger(popupState)}>
                        Accepted users
                    </Button>
                    <Menu {...bindMenu(popupState)}>
                        {
                            approvedPlayerList.length<1?"":
                            approvedPlayerList.map((player) => (
                                <MenuItem key={player._id} onClick={popupState.close}>{player.firstName} {player.lastName}</MenuItem>
                            ))
                        }
                    </Menu>
                    </React.Fragment>
                )}
                </PopupState>
            </Box>
        </Card>
    );
}
