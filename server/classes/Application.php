<?php

class Application
{
    private $controller;
    private string $method;
    public array $errors = array();
    public bool $state = false;
    public array $data = [];

    /**
     * @param string $_controllerName E.g. session_controller
     * @param string $_method E.g. clearSessions
     * @param array $_params E.g. {'id': 0}
     */
    function __construct($_controllerName, $_method, $_params)
    {
        global $CONSTANTS, $Errors;

        if (is_null($_params)) {
            $_params = [];
        }

        $controllerFilePath = CONTROLLERS_ROUTE . '/' . $_controllerName . ".php"; // E.g. /MyProject/server/controllers/Session_Controller.php

        // check if system controller and its file exists
        if (isset($CONSTANTS['SYS_CONTROLLERS'][$_controllerName]) && file_exists($controllerFilePath)) {
            require_once $controllerFilePath;
            $this->controller = new $CONSTANTS['SYS_CONTROLLERS'][$_controllerName]['className']($_params);

            if (method_exists($this->controller, $_method)) {
                $this->method = $_method;
            }
            else {
                // generate error
                $this->errors[] = $Errors->setErrorText('method_doesnt_exist')->setErrorCode('123ABC')->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable($_method)->setErrorDetails('')->gen();
            }
        }
        else {
            // generate error
            $this->errors[] = $Errors->setErrorText('controller_doesnt_exist')->setErrorCode('123ABC')->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable($_controllerName)->setErrorDetails('')->gen();
        }
    }

    public function execute()
    {
        if (empty($this->errors)) {
            $method = $this->method;
            $this->controller->$method();

            // check controller errors
            if (!empty($this->controller->errors)) {
                // get errors from controller
                $this->errors = $this->controller->errors;
            }

            // get state from controller
            $this->state = $this->controller->state;

            // get data from controller
            $this->data = $this->controller->data;
        }

        return array(
            "data" => $this->data,
            "state" => $this->state,
            'errors' => $this->errors,
        );
    }
}

?>
