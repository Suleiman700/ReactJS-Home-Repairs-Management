<?php

class ValidatorMobile extends Validator
{

    public function __construct(string $_value)
    {
        $this->value = $_value;
    }

    public function validate(): void
    {
        $number = preg_replace('/[^0-9]/', '', $this->value);
        if (strlen($number) !== 10 || strpos($number, '05') !== 0) {
            $this->checkResult['errors'][] = 'Invalid mobile number';
        }
        // $this->checkResult['warnings'][] = 'Email is weak';
    }
}