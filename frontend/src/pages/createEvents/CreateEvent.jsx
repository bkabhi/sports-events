import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button, Container, CssBaseline, FormControl, InputLabel, MenuItem, Paper, Select } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { Box } from '@mui/system';
import { createEventAPI } from '../../redux/event/action';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ampm = undefined;
let date = new Date().toJSON();

export const CreateEvent = () => {
    const [value, setValue] = React.useState(dayjs(date));
    const [sport_type, setSport_type] = React.useState('');
    const [city, setCity] = React.useState('');

    const { isLoading } = useSelector((store) => store.event);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCreateEvent = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const formData = {
            title: data.get('event_title'),
            playersLimit: Number(data.get('players_limit')),
            description: data.get('description'),
            image: data.get('image'),
            schedule: data.get('datetime'),
            city: data.get('city'),
            category: data.get('sport_type'),
        }
        dispatch(createEventAPI(formData))
            .then((res) => {
                // navigate('/');
            })
            .catch((err) => {
                console.log(err, " errr ");
            })
    }
    return (
        <Container component="main" maxWidth="sm" sx={{ mb: 4, mt: 8 }}>
            <CssBaseline />
            <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                <Typography variant="h6" gutterBottom>
                    Create New Event
                </Typography>
                <Box component="form" noValidate onSubmit={handleCreateEvent} sx={{ mt: 3 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="event_title"
                                name="event_title"
                                label="Event title"
                                fullWidth
                                autoComplete="event_title"
                                variant="standard"
                            />

                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="players_limit"
                                name="players_limit"
                                label="Players limit"
                                fullWidth
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="description"
                                name="description"
                                label="Short description"
                                fullWidth
                                autoComplete="shipping address-line1"
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                id="image"
                                name="image"
                                label="Image url"
                                type={'url'}
                                fullWidth
                                autoComplete="shipping address-line1"
                                variant="standard"
                            />
                        </Grid>
                        {/* <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="city"
                                name="city"
                                label="City"
                                fullWidth
                                autoComplete="shipping address-line1"
                                variant="standard"
                            />
                        </Grid> */}
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="standard" sx={{ minWidth: '100%' }}>
                                <InputLabel id="demo-simple-select-standard-label">City</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={city}
                                    onChange={(event) => setCity(event.target.value)}
                                    name='city'
                                    label="City"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'Bangalore'}>Bangalore</MenuItem>
                                    <MenuItem value={'Chennai'}>Chennai</MenuItem>
                                    <MenuItem value={'Patna'}>Patna</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl variant="standard" sx={{ minWidth: '100%' }}>
                                <InputLabel id="demo-simple-select-standard-label">Sport Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-standard-label"
                                    id="demo-simple-select-standard"
                                    value={sport_type}
                                    onChange={(event) => setSport_type(event.target.value)}
                                    name='sport_type'
                                    label="Sport Type"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'Badminton'}>Badminton</MenuItem>
                                    <MenuItem value={'Football'}>Football</MenuItem>
                                    <MenuItem value={'Cricket'}>Cricket</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'en'}>
                                <DateTimePicker
                                    value={value}
                                    onChange={(newValue) => setValue(newValue)}
                                    renderInput={(params) =>
                                        <TextField {...params}
                                            label="Date and Time"
                                            required
                                            fullWidth
                                            id="datetime"
                                            name="datetime"
                                            autoComplete="shipping address-line1"
                                            variant="standard" />
                                    }
                                    ampm={ampm}
                                />
                            </LocalizationProvider>
                        </Grid>
                    </Grid>
                    <Box display={'flex'} justifyContent='flex-end'>
                        <Button
                            type='submit'
                            variant="contained"
                            sx={{ mt: 3, ml: 1 }}
                        >
                            Create Event
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
}
