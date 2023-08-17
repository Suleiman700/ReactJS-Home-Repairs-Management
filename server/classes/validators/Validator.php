<?php

abstract class Validator
{
    public string $value = '';
    public array $checkResult = array(
        'state' => true,
        'value' => '',
        'errors' => array(),
        'warnings' => array(),
    );

    abstract public function validate();

}