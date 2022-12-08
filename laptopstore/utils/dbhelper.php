<?php
    function execute($sql,$multi=false){
        $conn = empty($conn) ? mysqli_connect(host,user,password,database) : $conn;
        mysqli_set_charset($conn,'utf8');
        if($multi){
            mysqli_multi_query($conn, $sql);
        }else{
            mysqli_query($conn,$sql);
        }
        mysqli_close($conn);
    }
    function executeResult($sql,$resultOne=false){
        $conn = empty($conn) ? mysqli_connect(host,user,password,database) : $conn;
        mysqli_set_charset($conn,'utf8');
        $resultset = mysqli_query($conn, $sql);
        mysqli_close($conn);
        $data      = [];
        if($resultOne){
            $data=mysqli_fetch_array($resultset,1);
            return $data;
        }
        while (($row = mysqli_fetch_array($resultset, 1))!=null) {
            $data[] = $row;
        }
        return $data;
    }
?>