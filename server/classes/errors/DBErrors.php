<?php

class DBErrors
{
    public string $traceID;
    public array $errors;
    private string $logFilePath = '/server/logs/db_errors.txt';

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

    public function saveError(): void
    {
        global $CONSTANTS;
        $errorLoggingFile = $CONSTANTS['BASE_PATH'].$this->logFilePath;

        // write error message
        $logMessage = "\n--------------- Error -------------\n";
        $logMessage .= "Trace ID: $this->traceID\n";
        $logMessage .= 'Date: '. date('d/m/Y H:i:s') ."\n";
        $logMessage .= 'details: ' . json_encode($this->errors) . "\n";
        $logMessage .= "-----------------------------------\n";

        $error_file = fopen($errorLoggingFile, "a");
        fwrite($error_file, $logMessage);
        fclose($error_file);
    }
}