import React from 'react';
import { FormControl, FormLabel, Select, Text } from '@chakra-ui/react';

const PaymentRepairField = ({ value, onChange, isRequired, repairs }) => {
    const handleInputChange = (event) => {
        const newValue = event.target.value;
        onChange(newValue); // Pass the updated value to the parent component
    };

    // sort repairs DESC (newest first)
    repairs.sort(function(a, b) {
        return parseFloat(b.id) - parseFloat(a.id);
    });

    // sort repairs by isCompleted
    repairs.sort(function(a, b) {
        return parseFloat(a.isCompleted) - parseFloat(b.isCompleted);
    });

    // Function to check if the content contains RTL characters
    const hasRTLCharacters = (content) => {
        const rtlRegex = /[\u0600-\u06FF\u0590-\u05FF\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
        return rtlRegex.test(content);
    };
    // Determine the direction based on the content of options
    const isRTL = repairs.some((option) => hasRTLCharacters(option.name));

    return (
        <FormControl>
            <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500'>
                Repair {isRequired ? <Text color='brand.500'><code>*</code></Text> : ''}
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
                {repairs.map((repair) => (
                    <option key={repair.id} value={repair.id} selected={repair.id==value?true:false} style={{color: repair.isCompleted==1?'green':''}} >
                        {repair.isCompleted==1?'[✓]':'[X]'} {repair.name}
                    </option>
                ))}
            </Select>
        </FormControl>
    );
};

export default PaymentRepairField;
