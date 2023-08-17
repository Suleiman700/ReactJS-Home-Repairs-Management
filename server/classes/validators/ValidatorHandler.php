<?php

class ValidatorHandler
{
    private array $validators;

    public function __construct(array $_validators)
    {
        $this->validators = $_validators;
    }

    /**
     * validate all validators
     * @return array
     * example of return:
     * array(<br>
     *   array(<br>
     *      'state' => true,<br>
     *      'errors' => array('Invalid email address'),<br>
     *      'warnings' => array(''),<br>
     *      'value' => 'value'<br>
     *      ),<br>
     * );<br>
     */
    public function validate(): array
    {
        $response = array();

        foreach ($this->validators as $validator) {
            $validator->validate();
            $validator->checkResult['value'] = $validator->value;
            if ($validator->checkResult['errors']) {
                $validator->checkResult['state'] = false;
            }
            $response[] = $validator->checkResult;
        }

        return $response;
    }
}