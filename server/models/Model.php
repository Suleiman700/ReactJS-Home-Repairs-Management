<?php

class Model
{
    public $db, $table;
    public array $errors = [];

    /**
     * @param array $_params example: array('Mobile' => $_GET['id'])<br>
     * @param array $_array_search example: array('id' => ['i'], 'IDCard' => ['s'], 'Mobile' => ['s']);<br>
     * @return array|string
     */
    public function filter(array $_params, array $_array_search)
    {
        $response = "No filters has been applied";

        foreach ($_array_search as $key => $val) {
            if (isset($_params[$key])) {
                $_array_search[$key][] = $_params[$key]; // old: array_push($_array_search[$key], $_params[$key]);
            } else {
                unset($_array_search[$key]);
            }
        }

        if (count($_array_search)) {
            $query = $this->db->select($_array_search, $this->table, false)->fetch_all(MYSQLI_ASSOC);
            $response = (count($query)) ? $query : [];
        }

        return $response;
    }

    public function setTable(string $_tableName): void
    {
        $this->table = $_tableName;
    }
}

?>