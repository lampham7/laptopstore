<?php
    function fixSqlInjection($str) {
        $str = str_replace("\\", "\\\\", $str);
        $str = str_replace("'", "\'", $str);
        return $str;
    }
    function getGET($key) {
        $value = null;
        if (!empty($_GET[$key])) {
            $value = $_GET[$key];
        }
        $value = fixSqlInjection($value);
    
        return $value;
    }
    function getPOST($key) {
        $value = null;
        if (!empty($_POST[$key])) {
            $value = $_POST[$key];
        }
        $value = fixSqlInjection($value);
        return $value;
    }
    function validateFile($files){
        $resTex="";
        $currentName = $files['name'];
        $allowTypes = array('jpg','png','PNG','jpeg','gif','webp');
        $imageFileType=pathinfo($currentName,PATHINFO_EXTENSION);
        $maxFileSizes = 800000;
        $check = getimagesize($files["tmp_name"]);
        if($check==false){
            $resTex= "This is not a picture(jpg, png, jpeg, gif,webp). ";
        }
        if($files['size']>$maxFileSizes){
            $resTex=$resTex."Kich thuoc khong hop le(<=0.8MB). ";
        }
        if(!in_array($imageFileType,$allowTypes)){
            $resTex=$resTex." Loại file không hợp lệ. ";
        }
        return $resTex;
    };
