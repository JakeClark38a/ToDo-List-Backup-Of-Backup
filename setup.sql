create database todolist;
CREATE USER 'todolist'@'localhost' IDENTIFIED BY 'Todolist<123456789';
GRANT ALL PRIVILEGES ON todolist.* TO 'todolist'@'localhost' WITH GRANT OPTION;
Flush privileges;
exit;



/// Do not copy the below code
set foreign_key_checks=0;
drop table tags;
set foreign_key_checks=1;