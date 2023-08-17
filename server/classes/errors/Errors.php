<?php

class Errors
{
    public string $traceID;

    public string $errorText;
    public string $errorCode;
    public string $errorVariable; // the variable that found error in
    public string $errorClass;
    public string $errorFunction;
    public string $errorFile;
    public $errorDetails;

    private string $logFilePath = '/server/logs/errors.txt';

    public function __construct() {
        global $CONSTANTS;

        // create .txt logging file if not found
        $logDirectory = dirname($CONSTANTS['BASE_PATH'].$this->logFilePath);
        if (!file_exists($logDirectory)) {
            if (!mkdir($logDirectory, 0777, true) && !is_dir($logDirectory)) {
                throw new \RuntimeException(sprintf('Directory "%s" was not created', $logDirectory));
            }
        }

        if (!file_exists($CONSTANTS['BASE_PATH'].$this->logFilePath)) {
            $errorFile = fopen($CONSTANTS['BASE_PATH'].$this->logFilePath, 'w');
            fclose($errorFile);
            chmod($CONSTANTS['BASE_PATH'].$this->logFilePath, 0777);
        }
    }

    /**
     * set error text
     * @param string $_errorText E.g. Invalid variable
     * @return $this
     */
    public function setErrorText(string $_errorText): Errors
    {
        $this->errorText = $_errorText;
        return $this;
    }

    /**
     * set error code
     * @param string $_errorCode E.g. ABC-123
     * @return $this
     */
    public function setErrorCode(string $_errorCode): Errors
    {
        $this->errorCode = $_errorCode;
        return $this;
    }

    public function setErrorVariable($_errorVariable): Errors
    {
        $this->errorVariable = $_errorVariable;
        return $this;
    }

    public function setErrorClass(string $_errorClass): Errors
    {
        $this->errorClass = $_errorClass;
        return $this;
    }

    public function setErrorFunction(string $_errorFunction): Errors
    {
        $this->errorFunction = $_errorFunction;
        return $this;
    }

    public function setErrorFile(string $_errorFile): Errors
    {
        $this->errorFile = $_errorFile;
        return $this;
    }

    /**
     * set error details
     * @param array $_errorDetails E.g. error happened because xyz...etc
     * @return $this
     */
    public function setErrorDetails($_errorDetails): Errors
    {
        $this->errorDetails = $_errorDetails;
        return $this;
    }

    /**
     * generate error array
     * @return array
     */
    public function gen(): array
    {
        $this->traceID = round(microtime(true)*1000);

        $errorArray = [
            'errorText' => $this->errorText,
            'errorTraceID' => $this->traceID
        ];

        if (!empty($this->errorCode)) {
            $errorArray['errorCode'] = $this->errorCode;
        }

        // check if errorVariable contains data and push it to the error array
        if (!empty($this->errorVariable)) {
            $errorArray['errorVariable'] = $this->errorVariable;
        }

        $this->saveError();

        return $errorArray;
    }

    public function saveError(): void
    {
        global $CONSTANTS;
        $errorLoggingFile = $CONSTANTS['BASE_PATH'].$this->logFilePath;

        // write error message
        $logMessage = "\n--------------- Error -------------\n";
        $logMessage .= "Trace ID: $this->traceID\n";
        $logMessage .= 'Date: '. date('d/m/Y H:i:s') ."\n";
        $logMessage .= "Error text: $this->errorText\n";
        if (!empty($this->errorCode)) $logMessage .= "Error code: $this->errorCode\n";
        $logMessage .= 'Request type: ' . $_SERVER['REQUEST_METHOD'] . "\n";
        $logMessage .= json_encode($_REQUEST, JSON_THROW_ON_ERROR) . "\n";
        $logMessage .= "Error:\n";
        if (!empty($this->errorClass)) $logMessage .= "Class: $this->errorClass\n";
        if (!empty($this->errorFunction)) $logMessage .= "Function: $this->errorFunction\n";
        if (!empty($this->errorVariable)) $logMessage .= "Variable: $this->errorVariable\n";
        if (!empty($this->errorDetails)) $logMessage .= 'details: ' . json_encode($this->errorDetails) . "\n";
        if (!empty($this->errorFile)) $logMessage .= "File: $this->errorFile\n";
        $logMessage .= "-----------------------------------\n";

        $error_file = fopen($errorLoggingFile, "a");
        fwrite($error_file, $logMessage);
        fclose($error_file);
    }
}
