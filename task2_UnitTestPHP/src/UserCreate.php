<?php
namespace App;

class UserCreate {
    private $name;
    protected static $users = [];

    public function __construct($name) {
        $this->name = $name;
    }

    public function getName() {
        return $this->name;
    }
    public function setName($name)
    {
        $this->name = $name;
    }
    public static function create($name){
        $user = new self($name);
        self::$users[] = $user;
        return $user;
    }
    public static function getUsers()
    {
        return self::$users;

    }
    public static function setUsers(array $users) {
        self::$users = $users; // Обновляем массив пользователей
    }
    public static function findByName($name) {
        foreach (self::$users as $user) {
            if ($user->getName() === $name) {
                return $user;
            }
        }
        return null; // Возвращаем null, если пользователь не найден
    }



}