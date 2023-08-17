import React from 'react';
import {FormControl, FormLabel, Text} from '@chakra-ui/react';
import {DatePicker} from 'antd';
import dayjs from 'dayjs';

const DatePickerComponent = (props) => {

    const {fieldName='Date', placeholder='Select date', value, onChange, isRequired, isDisabled} = props
    const handleInputChange = (_x, _dateString) => {
        onChange(_dateString); // Pass the updated value to the parent component - E.g. 2023-08-17
    };

    // Get current date if value not set
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd

    return (
        <FormControl>
            <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500'>
                {fieldName} {isRequired? <Text color='brand.500'><code>*</code></Text>:''}
            </FormLabel>
            <DatePicker onChange={handleInputChange} placeholder={placeholder} disabled={isDisabled} style={{fontSize: '30px', width: '100%', height: '3rem', borderRadius: '15px'}} value={value.length>0? dayjs(value, 'YYYY-MM-DD'):''} format={'YYYY-MM-DD'} />
        </FormControl>
    );
};

export default DatePickerComponent;
