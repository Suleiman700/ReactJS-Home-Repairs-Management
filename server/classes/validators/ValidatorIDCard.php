<?php

class ValidatorIDCard extends Validator
{

    public function __construct(string $_value)
    {
        $this->value = $_value;
    }

    public function validate(): void
    {
        // Check if the ID number format is valid
        if (!preg_match('/^[0-9]{9}$/', $this->value)) {
            $this->checkResult['errors'][] = 'Invalid ID number format';
        }

        // Calculate the check digit
        $check_digit = 0;
        for ($i = 0; $i < 8; $i++) {
            $digit = (int)$this->value[$i];
            if ($i % 2 === 0) {
                $digit *= 1;
            } else {
                $digit *= 2;
                if ($digit > 9) {
                    $digit = (int)substr((string)$digit, 0, 1) + (int)substr((string)$digit, 1, 1);
                }
            }
            $check_digit += $digit;
        }

        $check_digit = (10 - ($check_digit % 10)) % 10;

        // Check if the check digit is valid
        if ((int)$this->value[8] !== $check_digit) {
            $this->checkResult['errors'][] = 'Invalid ID number check digit';
        }

        // $this->checkResult['warnings'][] = 'Email is weak';
    }
}