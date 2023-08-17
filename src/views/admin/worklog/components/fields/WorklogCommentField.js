import React from 'react';
import {FormControl, FormLabel, Text, Textarea, useColorModeValue} from '@chakra-ui/react';

const WorklogCommentField = ({ value, onChange, isRequired }) => {
    const textColor = useColorModeValue("secondaryGray.900", "white");

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        onChange(newValue); // Pass the updated value to the parent component
    };

    return (
        <FormControl>
            <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500'>
                Comment {isRequired? <Text color='brand.500'><code>*</code></Text>:''}
            </FormLabel>
            <Textarea
                rows={8}
                isRequired={isRequired}
                variant='auth'
                fontSize='md'
                ms={{ base: '0px', md: '0px' }}
                type='text'
                placeholder='Comments like document link or image link... etc'
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

export default WorklogCommentField;
