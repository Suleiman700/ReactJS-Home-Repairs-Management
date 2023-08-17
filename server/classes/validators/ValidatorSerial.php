<?php

class ValidatorSerial extends Validator
{

    public function __construct(string $_value)
    {
        $this->value = $_value;
    }

    public function validate(): void
    {
        $regex = '/^[0-9a-zA-Z]{8,18}$/';
        if (preg_match($regex, $this->value) !== 1) {
            $this->checkResult['errors'][] = 'Invalid serial number';
        }
    }
}