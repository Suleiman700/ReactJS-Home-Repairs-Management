<?php
class DB
{
    public $mysqli;
    public array $error_list = [];
    public string $traceID;

    function __construct()
    {
        global $conn;
        $this->mysqli = $conn;
    }

    function select($MySQLSelectArray, $TBName, $isNum = true, $fields = '*', $Condition = null)
    {
        if ($Condition != null)
        {
            $Condition = ($MySQLSelectArray == null && $Condition != null) ?  " where " . $Condition : " and " . $Condition;
        }
        if ($MySQLSelectArray == null)
        {
            $stmt = $this->mysqli->prepare("SELECT $fields FROM " . $TBName . $Condition);
        }
        else
        {
            $ColumnList = implode(" = ? AND ", array_keys($MySQLSelectArray));
            $ColumnList .= ' = ?';
            $stmt = $this->mysqli->prepare("SELECT $fields FROM " . $TBName . " WHERE " . $ColumnList . $Condition. " Order by id desc");
            $ValueList = array_values($MySQLSelectArray);
            $types = array_column($ValueList, 0);
            $bind = implode("", $types);
            $ValueToInsert = array_column($ValueList, 1);
            $stmt->bind_param($bind, ...$ValueToInsert);
        }

        $stmt->execute();
        $result = $stmt->get_result();

        return ($isNum) ? $result->num_rows : $result;
    }

    function insert($MySQLInsertArray, $TBName)
    {
        global $Errors, $DBErrors;

        $ColumnList = implode(",", array_keys($MySQLInsertArray));
        $ValueList = array_values($MySQLInsertArray);
        $is = array_column($ValueList, 0);
        $bind = implode("", $is);
        $MySQLQs = str_repeat("?,", strlen($bind) - 1) . "?";
        $ValueToInsert = array_column($ValueList, 1);

        try
        {
            $stmtinsert = $this->mysqli->prepare("INSERT INTO " . $TBName . " (" . $ColumnList . ") VALUES (" . $MySQLQs . ")");

            $stmtinsert->bind_param($bind, ...$ValueToInsert);
            $stmtinsert->execute();


        }
        catch (Exception $e)
        {
            echo 'Caught exception: ',  $e->getMessage(), "\n";
        }

        // store query error list
        if ($stmtinsert->error_list) {
            $this->error_list = $stmtinsert->error_list;
        }

        if ($stmtinsert->affected_rows)
        {
            $last_id = $this->mysqli->insert_id;
            $stmtinsert->close();
            return $last_id;
        }

        $stmtinsert->close();
        return false;
    }

    function update($MySQLUpdateArray, $TBName, $Condition)
    {
        $ColumnList = implode(" = ?, ", array_keys($MySQLUpdateArray));
        $ColumnList .= ' = ?';

        $stmtUpdate = $this->mysqli->prepare("UPDATE " . $TBName . " SET " . $ColumnList . " " . $Condition);
        $ValueList = array_values($MySQLUpdateArray);
        $types = array_column($ValueList, 0);
        $bind = implode("", $types);

        $ValueToInsert = array_column($ValueList, 1);

        $stmtUpdate->bind_param($bind, ...$ValueToInsert);
        $stmtUpdate->execute();

        if ($stmtUpdate->affected_rows)
        {
            $stmtUpdate->close();
            return true;
        }
        else if ($stmtUpdate->errno === 0) {
            $stmtUpdate->close();
            return true;
        }

        $stmtUpdate->close();
        return false;
    }
}
?>
