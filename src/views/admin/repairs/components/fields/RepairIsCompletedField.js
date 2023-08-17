import React from 'react';
import { FormControl, FormLabel, Select, Text } from '@chakra-ui/react';

const RepairIsCompletedField = ({ value, onChange, isRequired }) => {
    const handleInputChange = (event) => {
        const newValue = event.target.value;
        onChange(newValue); // Pass the updated value to the parent component
    };

    const options = [
        { value: '1', label: 'Yes' },
        { value: '0', label: 'No' },
    ];

    return (
        <FormControl>
            <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500'>
                Completed {isRequired ? <Text color='brand.500'><code>*</code></Text> : ''}
            </FormLabel>
            <Select
                isRequired={isRequired}
                variant='auth'
                fontSize='md'
                ms={{ base: '0px', md: '0px' }}
                type='text'
                mb='24px'
                fontWeight='500'
                size='lg'
                dir='auto'
                onChange={handleInputChange}
                value={value}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value} selected={option.value==value?true:false}>
                        {option.label}
                    </option>
                ))}
            </Select>
        </FormControl>
    );
};

export default RepairIsCompletedField;
