import React from 'react';
import {FormControl, FormLabel, Select, Text, useColorModeValue} from '@chakra-ui/react';

const RepairQuoteRepairIdField = ({ value, onChange, isRequired, isDisabled, options }) => {
    const textColor = useColorModeValue("secondaryGray.900", "white");

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        onChange(newValue); // Pass the updated value to the parent component
    };

    // Sort options DESC (newest first)
    options.sort(function(a, b) {
        return parseInt(b.id) - parseInt(a.id);
    });

    // Sort options by isCompleted
    options.sort(function(a, b) {
        return parseInt(a.isCompleted) - parseInt(b.isCompleted);
    });

    // Function to check if the content contains RTL characters
    const hasRTLCharacters = (content) => {
        const rtlRegex = /[\u0600-\u06FF\u0590-\u05FF\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
        return rtlRegex.test(content);
    };
    // Determine the direction based on the content of options
    const isRTL = options.some((option) => hasRTLCharacters(option.name));

    return (
        <FormControl>
            <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500'>
                Repair {isRequired ? <Text color='brand.500'><code>*</code></Text> : ''}
            </FormLabel>
            <Select
                isRequired={isRequired}
                isDisabled={isDisabled}
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
                {options.map((option) => (
                    <option key={option.id} value={option.id} selected={option.id==value?true:false} style={{color: option.isCompleted==1?'green':textColor}} >
                        {option.isCompleted==1?'[✓]':'[X]'} {option.name}
                    </option>
                ))}
            </Select>
        </FormControl>
    );
};

export default RepairQuoteRepairIdField
