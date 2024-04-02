create user 'todolist'@'localhost' identified by 'Todolist@123456789';
create database todolist;
grant all privileges on todolist.* on 'todolist'@'localhost' with grant option;
flush privileges;
