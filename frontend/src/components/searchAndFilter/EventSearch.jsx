import PropTypes from 'prop-types';

// @mui
import { Autocomplete, InputAdornment, Popper, TextField, styled } from '@mui/material';

// components
import Iconify from '../iconify/Iconify';
import { useState } from 'react';


const StyledPopper = styled((props) => <Popper placement="bottom-start" {...props} />)({
  width: '280px !important',
});

EventSearch.propTypes = {
  events: PropTypes.array.isRequired,
};

export default function EventSearch({ events }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

const handleChange = (event, value) => setSelectedOptions(value);

  return (
    <Autocomplete
      sx={{ width: 280 }}
      autoHighlight
      popupIcon={null}
      onChange={handleChange}
      PopperComponent={StyledPopper}
      options={events}
      getOptionLabel={(post) => post.title}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder="Search post..."
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon={'eva:search-fill'} sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
}
