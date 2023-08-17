import React from 'react';
import {FormControl, FormLabel, Input, Text, Textarea, useColorModeValue} from '@chakra-ui/react';

const PaymentNoteField = ({ value, onChange, isRequired }) => {
    const textColor = useColorModeValue("secondaryGray.900", "white");

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        onChange(newValue); // Pass the updated value to the parent component
    };

    return (
        <FormControl>
            <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500'>
                Note {isRequired? <Text color='brand.500'><code>*</code></Text>:''}
            </FormLabel>
            <Textarea
                rows={8}
                isRequired={isRequired}
                variant='auth'
                fontSize='md'
                ms={{ base: '0px', md: '0px' }}
                type='text'
                placeholder='Payment notes like recording, or document link...'
                mb='24px'
                fontWeight='500'
                border='1px solid gray'
                color={textColor}
                background='transparent'
                size='lg'
                dir='auto'
                value={value}
                onChange={handleInputChange}
            />
        </FormControl>
    );
};

export default PaymentNoteField;
