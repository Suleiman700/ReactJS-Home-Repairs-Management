<?php

class Debts_Model extends Model
{
    function __construct()
    {
        $this->db = new DB();
        $this->table = "debts";
    }

    /**
     * search for data
     * @param array $_params
     * @param array $array_search
     * @return array|string
     */
    public function filter($_params = [], $array_search = [])
    {
        $array_search = array(
            'id' => ['i'],
            'personId' => ['i'],
        );
        return parent::filter($_params, $array_search);
    }

    /**
     * get language translations
     * @return Repairs_Model
     */
    public function getRecords() {
        global $ERROR_CODES, $Errors;

        $data = $this->db->mysqli->query("SELECT * FROM $this->table")->fetch_all(MYSQLI_ASSOC);

        if (!$data || empty($data)) {
            $errorText = $ERROR_CODES['DEBTS']['GET']['RESULTS']['NO_RESULTS']['NAME'];
            $errorCode = $ERROR_CODES['DEBTS']['GET']['RESULTS']['NO_RESULTS']['CODE'];
            $this->errors[] = $Errors->setErrorText($errorText)->setErrorCode($errorCode)->setErrorClass(__CLASS__)->setErrorFunction(__FUNCTION__)->setErrorFile(__FILE__)->setErrorVariable('')->setErrorDetails('')->gen();
            return $this;
        } else {
            return $data;
        }
    }

    /**
     * update record specific columns
     * @param $_ID - E.g. 1
     * @param array $_columnsToUpdate
     * Pass the columns you want to update
     * $columnsToUpdate = [
     *      'name' => ['s', 'New Name']
     * ];
     * @return $this
     */
    function updateRecordData($_ID, array $_columnsToUpdate)
    {
        global $ERROR_CODES, $Errors, $DBErrors;

        return $this->db->update($_columnsToUpdate, $this->table, " WHERE id='$_ID'");
    }

    /**
     * delete record from DB
     * @param $_ID - E.g. 1
     * @return bool
     */
    public function deleteRecord($_ID) {
        global $ERROR_CODES, $Errors;

        $deleteResponse = $this->db->mysqli->query("DELETE FROM $this->table WHERE id = '$_ID'");

        if (isset($deleteResponse) && ($deleteResponse == 1 || $deleteResponse == true)) {
            return true;
        }
        else {
            return false;
        }
    }

    /**
     * create new record
     * @param array $_personData - E.g. {name: '', description: '', ...etc}
     * @return array
     */
    function createNewRecord(array $_personData)
    {
        global $ERROR_CODES, $Errors, $DBErrors;

        // prepare default customer data array
        $personColumn = $this->createDefaultColumns($_personData);
        $createdResult = $this->db->insert($personColumn, $this->table);

        if (isset($createdResult) && is_numeric($createdResult) && $createdResult > 0) {
            return [
                'state' => true,
                'newID' => $createdResult
            ];
        }
        else {
            return [
                'state' => false,
            ];
        }
    }

    private function createDefaultColumns(array $_yourColumns): array
    {
        date_default_timezone_set('Asia/Jerusalem');

        $defaultColumns = [
            'personId' => ['i', isset($_yourColumns['personId'])?$_yourColumns['personId']:''],
            'itemName' => ['s', isset($_yourColumns['itemName'])?$_yourColumns['itemName']:''],
            'itemPrice' => ['s', isset($_yourColumns['itemPrice'])?$_yourColumns['itemPrice']:''],
            'itemQuantity' => ['s', isset($_yourColumns['itemQuantity'])?$_yourColumns['itemQuantity']:''],
            'itemDescription' => ['s', isset($_yourColumns['itemDescription'])?$_yourColumns['itemDescription']:''],
            'itemStatus' => ['s', isset($_yourColumns['itemStatus'])?$_yourColumns['itemStatus']:''],
            'comment' => ['s', isset($_yourColumns['comment'])?$_yourColumns['comment']:''],
            'takenBy' => ['s', isset($_yourColumns['takenBy'])?$_yourColumns['takenBy']:''],
            'isPaid' => ['s', isset($_yourColumns['isPaid'])?$_yourColumns['isPaid']:''],
            'created_at' => ['s', date('Y-m-d H:i:s')],
            'updated_at' => ['s', date('Y-m-d H:i:s')],
        ];

        return $defaultColumns;
    }

}

?>
