import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import { DesktopDatePicker, LocalizationProvider, PickersLayout } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';

import styled from 'styled-components';
import { useState } from 'react';
import dayjs from 'dayjs';
import { formatTimestampToDate } from '../utils/helpers';

const commonBordersetStyles = {
  border: '2px solid var(--color-grey-300)',
  borderRadius: 'var(--border-radius-sm)'
};

const StyledCustomDatePicker = styled.div``;
// to stlye the input date element
const StyledTextField = styled(TextField)({
  '& .MuiInputBase-root': {
    backgroundColor: 'var(--color-grey-0)',
    boxShadow: 'var(--shadow-sm)',
    color: 'var(--color-grey-700)',
    '& fieldset': {
      ...commonBordersetStyles
    },
    '&:hover fieldset': {
      ...commonBordersetStyles
    },
    '&.Mui-focused fieldset': {
      border: '2px solid var(--color-brand-600)'
    }
  },
  '& .MuiInputBase-root svg': {
    color: 'var(--color-brand-600)',
    width: '16px',
    height: '16px'
  },
  '& .MuiInputBase-input': {
    fontSize: '1.2rem', // Increase font size
    padding: '12px' // Adjust padding for better alignment
  }
});

//to style the date picker
const StyledPickersLayout = styled(PickersLayout)({
  '.MuiDateCalendar-root': {
    direction: 'ltr',
    backgroundColor: 'var(--color-grey-0)',
    color: 'var(--color-grey-700)'
  },
  // any svg
  '.MuiPickersCalendarHeader-root svg': {
    width: '1.8rem',
    height: '1.8rem',
    color: 'var(--color-brand-600)'
  },

  //header
  '.MuiPickersCalendarHeader-root': {},
  '.MuiPickersCalendarHeader-label': {
    fontSize: '1.4rem',
    color: 'var(--color-grey-700)'
  },
  // day styling
  '& .MuiPickersDay-root': {
    fontSize: '1.2rem', // Increases font size of the day cells
    color: 'var(--color-grey-700)'
  },

  '& .MuiPickersDay-root.Mui-selected': {
    background: 'var(--color-brand-600)'
  },

  '& .MuiPickersDay-today': {
    borderColor: 'var(--color-grey-700)' // Change default border color to blue
  },
  '& .MuiPickersDay-today:not(.Mui-selected)': {
    borderColor: 'var(--color-grey-700)' // Ensure blue border when today is not selected
  },
  // weeks shortcut
  '& .MuiTypography-root': {
    fontSize: '1.2rem', // General typography size adjustment
    color: 'var(--color-grey-700)'
  }
});
function CustomDatePicker() {
  const [value, setValue] = useState(dayjs('2024-11-17'));
  try {
    console.log(value.toISOString());
  } catch (e) {
    console.log(e);
  }
  const handleDatePickerClick = (event) => {
    event.stopPropagation(); // Prevent the click event from reaching the parent modal
  };
  return (
    <StyledCustomDatePicker>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          onClick={handleDatePickerClick}
          format="YYYY-MM-DD"
          value={value}
          onChange={(newValue) => setValue(newValue)}
          // slotProps={{
          //   field: { clearable: true, onClear: () => {} }
          // }}
          slots={{
            textField: StyledTextField,
            layout: StyledPickersLayout
          }}
        />
      </LocalizationProvider>
    </StyledCustomDatePicker>
  );
}

export default CustomDatePicker;
