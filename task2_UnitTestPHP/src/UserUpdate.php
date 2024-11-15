<?php

namespace App;

class UserUpdate extends UserCreate
{
    public function setName($name)
    {
        $this->name = $name;
    }
}