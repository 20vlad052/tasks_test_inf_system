<?php
namespace App;

use PHPUnit\Framework\TestCase;

class UserTest extends TestCase {
    protected function setUp(): void {
        // Сбрасываем массив пользователей перед каждым тестом
        UserCreate::setUsers([]); // Предполагая, что у вас есть метод setUsers()
    }

    public function testCreateUser() {
        $user = UserCreate::create('Vlad');
        $this->assertNotNull($user);
        $this->assertEquals('Vlad', $user->getName());
        $users = UserCreate::getUsers();
        $this->assertCount(1, $users);
        $this->assertSame($user, $users[0]);
    }
    public function testReadUser() {
        $user = UserCreate::create('Vlad');
        $foundUser = UserCreate::findByName('Vlad');
        $this->assertNotNull($foundUser);
        $this->assertEquals('Vlad', $foundUser->getName());
        $notFoundUser = UserCreate::findByName('Omar');
        $this->assertNull($notFoundUser);

    }
    public function testCreateAndDeleteUser() {
     
        $user = UserCreate::create('Vlad');
        $this->assertNotNull($user);
        $this->assertEquals('Vlad', $user->getName());

    
        $users = UserCreate::getUsers();
        $this->assertCount(1, $users);
        $this->assertSame($user, $users[0]);

    
        UserDelete::delete($user);

      
        $users = UserCreate::getUsers();
        $this->assertCount(0, $users);
    }
    public function testUpdateUserName() {
       
        $user = UserCreate::create('John Doe');

      
        $user->setName('Vlad');

       
        $this->assertEquals('Vlad', $user->getName());

        
        $foundUser = UserCreate::findByName('Vlad');
        $this->assertSame($user, $foundUser);

        $notFoundUser = UserCreate::findByName('John Doe');
        $this->assertNull($notFoundUser);
    }
}