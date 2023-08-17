<?php

require_once './config/CONSTANTS.php';

class FatalErrors
{
    private string $logFilePath = LOGS_ROUTE . '/fatal_errors.txt';
    private string $traceID = '';

    public function __construct()
    {
        // Rest of the code...
    }

    public function register()
    {
        set_error_handler([$this, 'handleError']);
        register_shutdown_function([$this, 'handleShutdown']);
    }

    public function handleError($errno, $errstr, $errfile, $errline)
    {
        $this->traceID = 'FE_' . round(microtime(true) * 1000);
        $this->writeToFile($errstr, $errfile, $errline);
    }

    public function handleShutdown()
    {
        $error = error_get_last();
        if ($error && in_array($error['type'], [E_ERROR, E_PARSE, E_CORE_ERROR, E_COMPILE_ERROR])) {
            $errorString = "{$error['message']} in {$error['file']} on line {$error['line']}";
            $this->traceID = 'FE_' . round(microtime(true) * 1000);
            $this->writeToFile($errorString, $error['file'], $error['line']);
            $this->returnErrorMessage();
        }
    }

    private function returnErrorMessage()
    {
        global $CONSTANTS;

        $traceID = $this->traceID;

        // Set the HTTP response code to 500
        http_response_code(500);

        if (CONST_FATAL_ERRORS['OB_CLEAN_ON_FATAL']) {
            ob_end_clean();
        }

        $res = [
            'errors' => [
                [
                    'message' => 'An error occurred while processing your request.<br>Please contact support team and provide the following code:<br>',
                    'errorCode' => $traceID
                ]
            ]
        ];
        // Set the responseText
        $responseText = json_encode($res);
        echo $responseText;
        exit;

    }

    private function writeToFile($errstr, $errfile, $errline)
    {
        $datetime = date('Y-m-d H:i:s');

        // write error message
        $logMessage = "\n-------------- Fatal Error -------------\n";
        $logMessage .= "Trace ID: $this->traceID\n";
        $logMessage .= "Date: $datetime\n";
        $logMessage .= 'Request type: ' . $_SERVER['REQUEST_METHOD'] . "\n";
        $logMessage .= 'Request: ' . json_encode($_REQUEST, JSON_THROW_ON_ERROR) . "\n";
        $logMessage .= "Error Message: $errstr\n";
        $logMessage .= "Error File: $errfile($errline)\n";
        $logMessage .= "----------------------------------------\n";

        $error_file = fopen($this->logFilePath, "a");
        fwrite($error_file, $logMessage);
        fclose($error_file);

        $this->returnErrorMessage();
    }
}
