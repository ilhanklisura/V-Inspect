<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL ^ (E_NOTICE | E_DEPRECATED));

class Config {
    public static function get_env($name, $default = null) {
        return isset($_ENV[$name]) && trim($_ENV[$name]) !== "" ? $_ENV[$name] : $default;
    }

    public static function DB_NAME() {
        return self::get_env("DB_NAME", "vinspect");
    }

    public static function DB_PORT() {
        return self::get_env("DB_PORT", 3306);
    }

    public static function DB_USER() {
        return self::get_env("DB_USER", "root");
    }

    public static function DB_PASSWORD() {
        return self::get_env("DB_PASSWORD", "12345678");
    }

    public static function DB_HOST() {
        return self::get_env("DB_HOST", "127.0.0.1");
    }

    public static function JWT_SECRET() {
        return self::get_env("JWT_SECRET", "a44536575f884d672ad9180d896281aac7057b37166cc3e68345646512c791ef");
    }
}
