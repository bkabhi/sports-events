import PropTypes from 'prop-types';
import { Box, Card, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledProductImg = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
});

// ----------------------------------------------------------------------

SingleEventCard.propTypes = {
    product: PropTypes.object,
};

export default function SingleEventCard({ event }) {
    
    let { title, image: cover, schedule , playersLimit, city, organizer, category } = event;

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
        </Card>
    );
}
