import React from 'react';
import { FormControl, FormLabel, Select, Text } from '@chakra-ui/react';

const WorklogPersonField = ({ value, onChange, isRequired, persons }) => {
    const handleInputChange = (event) => {
        const newValue = event.target.value;
        onChange(newValue); // Pass the updated value to the parent component
    };

    // Function to check if the content contains RTL characters
    const hasRTLCharacters = (content) => {
        const rtlRegex = /[\u0600-\u06FF\u0590-\u05FF\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
        return rtlRegex.test(content);
    };
    // Determine the direction based on the content of options
    const isRTL = persons.some((option) => hasRTLCharacters(option.name));

    return (
        <FormControl>
            <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500'>
                Person {isRequired ? <Text color='brand.500'><code>*</code></Text> : ''}
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
                dir={isRTL ? 'rtl' : 'ltr'} // Set the direction based on content
                onChange={handleInputChange}
                value={value}
                style={{ paddingRight: '40px' }} // Add custom style to increase right padding for the caret space
            >
                <option key='' value='' selected={''==value?true:false} >
                    None
                </option>
                {persons.map((person) => (
                    <option key={person.id} value={person.id} selected={person.id==value?true:false}>
                        {person.name}
                    </option>
                ))}
            </Select>
        </FormControl>
    );
};

export default WorklogPersonField;
