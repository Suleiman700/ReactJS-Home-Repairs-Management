
export const PhoneValidator = (value) => {
    // Remove any non-numeric characters from the input
    const cleanedValue = value.replace(/\D/g, '');

    // Check if the cleaned value has exactly 10 digits
    if (cleanedValue.length !== 0) {
        return { valid: true, errors: {} };
    }
    else {
        return { valid: false, errors: [{message: 'Phone cannot be empty'}] };
    }
};

export const isNotEmpty = (_value) => {
    if (!_value.length || _value === undefined || _value === null || _value==='') {
        return { valid: false, errors: [{message: 'Phone cannot be empty'}] };
    }
}
