import React from 'react';
import {FormControl, FormLabel, Input, Text} from '@chakra-ui/react';
import {TimePicker} from 'antd';
import dayjs from 'dayjs';

const WorklogStartHourField = ({ value, onChange, isRequired }) => {
    const handleInputChange = (_x, _hourString) => {
        onChange(_hourString); // Pass the updated value to the parent component
    };

    // Get current time if value not set
    var currentdate = new Date();
    var time = currentdate.getHours() + ":" + currentdate.getMinutes();

    return (
        <FormControl>
            <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500'>
                Start Hour {isRequired? <Text color='brand.500'><code>*</code></Text>:''}
            </FormLabel>
                <TimePicker onChange={handleInputChange} style={{fontSize: '26px', width: '100%', height: '3rem'}} value={value.length? dayjs(value, 'HH:mm'): ''} format={'HH:mm'} placeholder='Select start hour' />
        </FormControl>
    );
};

export default WorklogStartHourField;
