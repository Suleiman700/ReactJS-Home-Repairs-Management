<?php

class ValidatorEmail extends Validator
{

    public function __construct(string $_value)
    {
        $this->value = $_value;
    }

    public function validate(): void
    {
        if (!filter_var($this->value, FILTER_VALIDATE_EMAIL)) {
            $this->checkResult['errors'][] = 'Invalid email address';
        }
        // $this->checkResult['warnings'][] = 'Email is weak';

    }
}