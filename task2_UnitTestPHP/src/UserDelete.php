<?php
namespace App;

class UserDelete extends UserCreate {


    public static function delete($user) {
        $key = array_search($user, self::$users, true);
        if ($key !== false) {
            unset(self::$users[$key]);
        }
    }
}