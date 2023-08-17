import React from 'react';
import { FormControl, FormLabel, Input, Text } from '@chakra-ui/react';

const RepairQuotePriceField = ({ value, onChange, isRequired }) => {
    const handleInputChange = (event) => {
        const newValue = event.target.value;
        onChange(newValue); // Pass the updated value to the parent component
    };

    return (
        <FormControl>
            <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500'>
                Price {isRequired? <Text color='brand.500'><code>*</code></Text>:''}
            </FormLabel>
            <Input
                isRequired={isRequired}
                variant='auth'
                fontSize='md'
                ms={{ base: '0px', md: '0px' }}
                type='number'
                placeholder='Quote price'
                mb='24px'
                fontWeight='500'
                size='lg'
                dir='auto'
                value={value}
                onChange={handleInputChange}
            />
        </FormControl>
    );
};

export default RepairQuotePriceField;
