import mysql.connector
import random

class ToDoDatabase():
    def __init__(self):
        self.connection = mysql.connector.connect(
            host='localhost',
            user='todolist',
            password='Todolist@123456789',
            database='todolist'
        )
        self.cursor = self.connection.cursor()
    def create_table(self):
            self.cursor.execute("""
                                CREATE TABLE IF NOT EXISTS users (user_id nvarchar(20) PRIMARY KEY, username nvarchar(100), password nvarchar(100), email nvarchar(100))
                                """)
            self.connection.execute("""
                                CREATE TABLE IF NOT EXISTS tasks (task_id nvarchar(20) PRIMARY KEY, title nvarchar(100), description nvarchar(500), tag_id nvarchar(20), user_id nvarchar(20), deadline int, points int, isCompleted boolean, FOREIGN KEY (user_id) REFERENCES users(id))
                                """)
            self.connection.execute("""
                                CREATE TABLE IF NOT EXISTS tags (tag_id nvarchar(20) PRIMARY KEY, tag_name nvarchar(100), user_id nvarchar(20), FOREIGN KEY (user_id) REFERENCES users(id))
                                    """)
    def insert_user(self,username,password,email):
        sqlquery = "INSERT INTO users (id,username,password,email) VALUES (%s,%s,%s,%s)"
        id = random.randbytes(4).hex()
        values = (id,username,password,email)
        self.cursor.execute(sqlquery,values)
        self.connection.commit()

    def show_user(self, username, password):
        sqlquery = "SELECT * FROM users WHERE email=%s and password=%s"
        values = (username,password)
        self.cursor.execute(sqlquery,values)
        result = self.cursor.fetchone()
        if result:
            return result
        else: return None
    def __del__(self):
        self.connection.close()
