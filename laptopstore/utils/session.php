<?php

use function PHPSTORM_META\type;

    class Session{
        public static function init(){
            if(session_status()===PHP_SESSION_NONE){
                session_start();
            }
        }

        public static function set($key, $val){
            self::init();
            $_SESSION[$key]=$val;
        }

        public static function get($key){
            self::init();
            if(isset($_SESSION[$key])){
                return $_SESSION[$key];
            }else{
                return false;
            }
        }
        
        public static function destroy(){
            self::init();
            session_destroy();
        }
    }

?>