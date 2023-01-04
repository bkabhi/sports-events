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
        <Card>
            <Box sx={{ pt: '60%', position: 'relative' }}>
                <StyledProductImg alt={title} src={cover} />
            </Box>
            <Stack spacing={2} sx={{ p: 3 }}>
                    <Typography variant="subtitle2" noWrap>
                        Title: {title}
                    </Typography>
                    <Typography variant="subtitle2" noWrap>
                        City: {city}
                    </Typography>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle1">
                        Players Limit: {playersLimit}
                    </Typography>
                    <Typography variant="subtitle1">
                        Event Timing : {schedule}
                    </Typography>
                </Stack>
            </Stack>
        </Card>
    );
}
