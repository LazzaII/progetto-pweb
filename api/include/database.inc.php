<?php
    #database interface file, cotains connection to database and api

    # import
    require_once "./config.inc.php";

    $con = null;
    /**
     * used to establish connection to the database
     * set the var $con
     */
    function connection() {
        $con = new PDO("mysql:host=". BB_HOST .";dbname=". BB_DB , BB_USER , BB_PWD);
    }

    /**
     * used to close the connection
     * reset the var &con
     */
    function close_connection() {
        $con = null;
    }

    /**
     * search account
     * @param int id that we are searching
     * @param char type of account searc (admin, donator, hospital) [usre stored procedure differenti]
     * @return bool true if find, otherwise false
     */

    /**
     * registration function
     */

     /**
      * login function
      */

      
?>