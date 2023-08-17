<?php
class Controller
{
    public $model;
    public array $errors = [];
    public array $data = [];
    public bool $state = false;

    protected array $params = [];

    public function __construct($_model)
    {
        $this->setModel($_model);
    }

    function setModel($_modelClassName): void
    {
        global $CONSTANTS, $Errors;

        $modelFile = MODELS_ROUTE.'/'.$_modelClassName.".php";

        // check if model file exists
        if (file_exists($modelFile)) {
            require_once $modelFile;

            $this->model = new $CONSTANTS['SYS_MODELS'][$_modelClassName]['className']();
        }
        else 
        {
            $this->errors[] = $Errors->setErrorText('Model doesnt exists')->setErrorCode('123ABC')->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('')->setErrorDetails('')->gen();
        }
    }
}
?>