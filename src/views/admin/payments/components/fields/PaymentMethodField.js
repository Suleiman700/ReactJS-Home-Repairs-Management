import React from 'react';
import { FormControl, FormLabel, Select, Text } from '@chakra-ui/react';
import { PAYMENT_METHODS } from '../../../../../settings/PAYMENT_CONSTS.js';

const PaymentMethodField = ({ value, onChange, isRequired }) => {
    const handleInputChange = (event) => {
        const newValue = event.target.value;
        onChange(newValue); // Pass the updated value to the parent component
    };

    return (
        <FormControl>
            <FormLabel display='flex' ms='4px' fontSize='sm' fontWeight='500'>
                Payment Method {isRequired ? <Text color='brand.500'><code>*</code></Text> : ''}
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
                style={{ paddingRight: '40px' }} // Add custom style to increase right padding for the caret space
            >
                <option key='' value='' selected={''==value?true:false} >
                    None
                </option>
                {PAYMENT_METHODS.map((method) => (
                    <option key={method.key} value={method.key} selected={method.value==value?true:false}>
                        {method.name}
                    </option>
                ))}
            </Select>
        </FormControl>
    );
};

export default PaymentMethodField;
