import PropTypes from 'prop-types';
// @mui
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
// import { fCurrency } from '../../../utils/formatNumber';
// components
// import Label from '../../../components/label';
// import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

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
                        {title}
                    </Typography>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography variant="subtitle1">
                        {playersLimit}
                    </Typography>
                    <Typography variant="subtitle1">
                        {schedule}
                    </Typography>
                </Stack>
            </Stack>
        </Card>
    );
}
