create database todolist;
CREATE USER 'todolist'@'localhost' IDENTIFIED BY 'Todolist@123456789';
GRANT ALL PRIVILEGES ON todolist.* TO 'todolist'@'localhost' WITH GRANT OPTION;
Flush privileges;
exit;