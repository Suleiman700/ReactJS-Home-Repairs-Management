<?php

class ValidatorIMEI extends Validator
{

    public function __construct(string $_value)
    {
        $this->value = $_value;
    }

    public function validate(): void
    {
        // $this->checkResult['warnings'][] = 'Email is weak';

        // Remove any non-numeric characters from the IMEI
        $imei = preg_replace('/[^0-9]/', '', $this->value);

        // Check if the IMEI is exactly 15 digits long
        if (strlen($imei) != 15) {
            $this->checkResult['errors'][] = 'Invalid IMEI';
        }

        // Calculate the Luan checksum
        $sum = 0;
        for ($i = 0; $i < 15; $i++) {
            $digit = (int)$imei[$i];
            if ($i % 2 === 0) {
                $digit *= 2;
                if ($digit > 9) {
                    $digit = ($digit % 10) + 1;
                }
            }
            $sum += $digit;
        }
        if ($sum % 10 !== 0) {
            $this->checkResult['errors'][] = 'Invalid IMEI';
        }
        // return true;
    }
}