import mysql.connector
import uuid, hashlib, time

class ToDoDatabase():
    def __init__(self):
        self.connection = mysql.connector.connect(
            host='todolist-database-do-user-16128636-0.c.db.ondigitalocean.com',#todolist-db-todolist-database.a.aivencloud.com',
            user='todolist',
            password='Todolist<123456789',
            database='todolist',
            port='25060'
            #21132
        )
        self.cursor = self.connection.cursor()
    def create_table(self):
            self.cursor.execute("""
                                CREATE TABLE IF NOT EXISTS users (
                                user_id nvarchar(40) PRIMARY KEY, 
                                email nvarchar(100), 
                                password nvarchar(100),
                                name nvarchar(256),
                                bio nvarchar(2000),
                                location nvarchar(100), 
                                image nvarchar(200),
                                type_account nvarchar(10),
                                external_id nvarchar(40),
                                isFillForm bit(1) DEFAULT 0
                                )
                                """)
            self.cursor.execute("""
                                CREATE TABLE IF NOT EXISTS groupss (
                                group_id nvarchar(40), 
                                group_title nvarchar(100), 
                                user_id nvarchar(40), 
                                colors nvarchar(100),
                                foreign key (user_id) references users(user_id) ON DELETE CASCADE,
                                primary key (group_id, user_id)
                                )
                                """)
            self.cursor.execute("""
                                CREATE TABLE IF NOT EXISTS tags (
                                tag_id nvarchar(40), 
                                tag_title nvarchar(100),
                                tag_color nvarchar(100),
                                user_id nvarchar(40),
                                group_id nvarchar(40),
                                foreign key (user_id) references users(user_id) ON DELETE CASCADE,
                                foreign key (group_id) references groupss(group_id) ON DELETE CASCADE,
                                primary key (tag_id, user_id)
                                )
                                """)

            self.cursor.execute("""
                                CREATE TABLE IF NOT EXISTS tasks (
                                task_id nvarchar(40), 
                                title nvarchar(100), 
                                description nvarchar(500), 
                                tags_id nvarchar(40), 
                                user_id nvarchar(40), 
                                deadline datetime, 
                                points int, 
                                isCompleted bit(1),
                                foreign key (user_id) references users(user_id) ON DELETE CASCADE,
                                foreign key (tags_id) references tags(tag_id) ON DELETE CASCADE,
                                primary key (task_id, user_id)
                                )
                                """)
            
    def drop_database(self):
        self.cursor.execute("drop database if exists todolist")
        self.cursor.execute("create database todolist")
            
    #Create deafault groups and tags when first login
    def default_setting(self, user_id):
        self.create_group('gid001',"Do",user_id,"#7aa5cf")
        self.create_group('gid002',"Delegate",user_id,"#63c074")
        self.create_group('gid003',"Schedule",user_id,"#ac7acf")
        self.create_group('gid004',"Delete",user_id,"#c5e875")
        self.create_tag('tag1','gid001','tag1','#7aa5cf',user_id)
        self.create_tag('tag2','gid002','tag2','#63c074',user_id)
        self.create_tag('tag3','gid003','tag3','#ac7acf',user_id)
        self.create_tag('tag4','gid004','tag4','#c5e875',user_id)
        self.create_tag('tag5','gid001','tag5','#7aa5cf',user_id)

    ###Function to check if profile is filled
    def check_user_form(self, user_id):
        sqlquery = "SELECT isFillForm FROM users WHERE user_id=%s"
        values = (user_id,)
        self.cursor.execute(sqlquery,values)
        result = self.cursor.fetchone()
        if result[0] == 1:
            return True
        else: return False

    ###Function to fill user profile
    def fill_user_form(self, user_id):
        sqlquery = "UPDATE users SET isFillForm=1 WHERE user_id=%s"
        values = (user_id,)
        self.cursor.execute(sqlquery,values)
        self.connection.commit()
    

    #Fucntion for Facebook users
    def insert_user_facebook(self, email, name, image, external_id):
        sqlquery = "INSERT INTO users (user_id,name,email,image,type_account,external_id) select * from (select %s,%s,%s,%s,%s,%s) as tmp where not exists (select * from users where external_id = %s)"
        id = uuid.uuid4().hex
        type_account = "facebook"
        values = (id,name,email,image,type_account,external_id, external_id)
        self.cursor.execute(sqlquery,values)
        self.connection.commit()

    def create_session_facebook(self, external_id):
        sqlquery = "SELECT user_id FROM users WHERE external_id=%s"
        values = (external_id,)
        self.cursor.execute(sqlquery,values)
        result = self.cursor.fetchone()
        return result
    

    #Function for Google users
    def insert_user_google(self, email, name, image, external_id):
        sqlquery = "INSERT INTO users (user_id,name,email,image,type_account,external_id) select * from (select %s,%s,%s,%s,%s,%s) as tmp where not exists (select * from users where external_id = %s)"
        id = uuid.uuid4().hex
        type_account = "google"
        values = (id,name,email,image,type_account,external_id, external_id)
        self.cursor.execute(sqlquery,values)
        self.connection.commit()


    def create_session_google(self, external_id):
        sqlquery = "SELECT user_id FROM users WHERE external_id=%s"
        values = (external_id,)
        self.cursor.execute(sqlquery,values)
        result = self.cursor.fetchone()
        return result
    

    #Fuction for normal users when register
    def insert_user(self,email, password , name=None):
        sqlquery = "INSERT INTO users (user_id,name,password,email) select * from (select %s,%s,%s,%s) as tmp where not exists (select * from users where email = %s and password = %s)"
        id = uuid.uuid4().hex
        password = hashlib.sha256(password.encode('utf-8')).hexdigest()
        values = (id,name,password,email, email, password)
        self.cursor.execute(sqlquery,values)
        self.connection.commit()


    #Function to update user email
    def update_email(self, user_id, email):
        sqlquery = "UPDATE users SET email=%s WHERE user_id=%s"
        values = (email,user_id)
        self.cursor.execute(sqlquery,values)
        self.connection.commit()


    #Fuction to validate email when reset password
    def register_validation(self,email):
        sqlquery = "SELECT * FROM users WHERE email=%s and type_account is null"
        values = (email,)
        self.cursor.execute(sqlquery,values)
        result = self.cursor.fetchone()
        if result:
            return False
        else: return True

    #Function to check if user is already registered
    def show_user(self, name, password):
        sqlquery = "SELECT * FROM users WHERE email=%s and password=%s"
        values = (name,password)
        self.cursor.execute(sqlquery,values)
        result = self.cursor.fetchone()
        if result:
            return result
        else: return None

    #Function to show user profile
    def show_profile_user(self, user_id):
        sqlquery = "SELECT name, bio, location FROM users WHERE user_id=%s"
        values = (user_id,)
        self.cursor.execute(sqlquery,values)
        result = self.cursor.fetchone()
        return result
    

    #Function to update user profile
    def update_profile(self, user_id, name, bio, location):
        sqlquery = "UPDATE users SET name=%s, bio=%s, location=%s WHERE user_id=%s"
        values = (name,bio,location,user_id)
        self.cursor.execute(sqlquery,values)
        self.connection.commit()

    #Function to update user image
    def update_image(self, user_id, image):
        sqlquery = "UPDATE users SET image=%s WHERE user_id=%s"
        values = (image,user_id)
        self.cursor.execute(sqlquery,values)
        self.connection.commit()

    #Function to get user image:
    def get_image(self, user_id):
        sqlquery = "SELECT image FROM users WHERE user_id=%s"
        values = (user_id,)
        try:
            self.cursor.execute(sqlquery,values)
            result = self.cursor.fetchone()
            return result[0]
        except Exception:
            return None
            
        
    #Function to reset user password in forgot password page
    def reset_password_user(self, email, password):
        sqlquery = "UPDATE users SET password=%s WHERE email=%s and type_account is null"
        password = hashlib.sha256(password.encode('utf-8')).hexdigest()
        values = (password,email)
        self.cursor.execute(sqlquery,values)
        self.connection.commit()

    #Function to reset user password in profile page:
    def reset_password_profile(self, user_id, password):
        sqlquery = "UPDATE users SET password=%s WHERE user_id=%s"
        password = hashlib.sha256(password.encode('utf-8')).hexdigest()
        values = (password,user_id)
        self.cursor.execute(sqlquery,values)
        self.connection.commit()

    def check_password_profile(self, user_id, password):
        sqlquery = "SELECT * FROM users WHERE user_id=%s and password=%s"
        password = hashlib.sha256(password.encode('utf-8')).hexdigest()
        values = (user_id,password)
        self.cursor.execute(sqlquery,values)
        result = self.cursor.fetchone()
        if result:
            return True
        else: return False

    #Function to create session for users
    def create_session(self, name, password):
        sqlquery = "SELECT user_id FROM users WHERE email=%s and password=%s and type_account is null"
        values = (name,password)
        self.cursor.execute(sqlquery,values)
        result = self.cursor.fetchone()
        return result
    
    #Function to check if group is already created
    def check_group(self, group_id, user_id):
        sqlquery = "SELECT * FROM groupss WHERE group_id=%s and user_id=%s"
        values = (group_id,user_id)
        self.cursor.execute(sqlquery,values)
        result = self.cursor.fetchone()
        if result:
            return True
        else: return False

    #Function to create group
    def create_group(self, group_id, group_title, user_id, colors):
        if self.check_group(group_id,user_id):
            return
        sqlquery = "INSERT INTO groupss (group_id,group_title,user_id,colors) VALUES (%s,%s,%s,%s)"
        values = (group_id,group_title,user_id,colors)
        self.cursor.execute(sqlquery,values)
        self.connection.commit()

    #Function to update group    
    def update_group(self, group_id, group_title, user_id, colors):
        sqlquery = "UPDATE groupss SET group_title=%s, colors=%s WHERE group_id=%s and user_id=%s"
        values = (group_title,colors,group_id,user_id)
        self.cursor.execute(sqlquery,values)
        self.connection.commit()
    
    #Function to delete group
    def delete_group(self, group_id, user_id):
        sqlquery = "DELETE FROM groupss WHERE group_id=%s and user_id=%s"
        values = (group_id,user_id)
        self.cursor.execute(sqlquery,values)
        self.connection.commit()

    #Function to show group
    def show_group(self, user_id):
        sqlquery = "SELECT * FROM groupss WHERE user_id=%s"
        values = (user_id,)
        self.cursor.execute(sqlquery,values)
        result = self.cursor.fetchall()
        return result
    
    #Function to check if tag is already created
    def check_tag(self, tag_id, user_id):
        sqlquery = "SELECT * FROM tags WHERE tag_id=%s and user_id=%s"
        values = (tag_id,user_id)
        self.cursor.execute(sqlquery,values)
        result = self.cursor.fetchone()
        if result:
            return True
        else: return False
    
    #Function to create tag
    def create_tag(self, tag_id, group_id, tag_title, tag_color, user_id):
        if self.check_tag(tag_id,user_id):
            return
        sqlquery = "INSERT INTO tags (tag_id,group_id,tag_title,tag_color,user_id) VALUES (%s,%s,%s,%s,%s)"
        values = (tag_id,group_id,tag_title,tag_color,user_id)
        self.cursor.execute(sqlquery,values)
        self.connection.commit()
    
    #Function to update tag
    def update_tag(self, tag_id, group_id, tag_title, tag_color, user_id):
        sqlquery = "UPDATE tags SET tag_title=%s, tag_color=%s WHERE tag_id=%s and group_id=%s and user_id=%s"
        values = (tag_title,tag_color,tag_id,group_id,user_id)
        self.cursor.execute(sqlquery,values)
        self.connection.commit()
    
    #Function to delete tag
    def delete_tag(self, tag_id, user_id):
        sqlquery = "DELETE FROM tags WHERE tag_id=%s and user_id=%s"
        values = (tag_id,user_id)
        self.cursor.execute(sqlquery,values)
        self.connection.commit()

    #Function to show tag
    def show_tag(self, user_id):
        sqlquery = "SELECT * FROM tags WHERE user_id=%s"
        values = (user_id,)
        self.cursor.execute(sqlquery,values)
        result = self.cursor.fetchall()
        return result
    
    #Function to check if task is already created
    def create_task(self, task_id, title, description, tags_id, user_id, deadline, points, isCompleted):
        if isCompleted == False:
            isCompleted = 0
        else:
            isCompleted = 1
        sqlquery = "INSERT INTO tasks (task_id,title,description,tags_id,user_id,deadline,points,isCompleted) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)"
        values = (task_id,title,description,tags_id,user_id,deadline,points,isCompleted)
        self.cursor.execute(sqlquery,values)
        self.connection.commit()

    #Function to update task
    def update_task(self, task_id, title, description, tags_id, user_id, deadline, points, isCompleted):
        if isCompleted == False:
            isCompleted = 0
        else:
            isCompleted = 1
        sqlquery = "UPDATE tasks SET title=%s, description=%s, tags_id=%s, deadline=%s, points=%s, isCompleted=%s WHERE task_id=%s and user_id=%s"
        values = (title,description,tags_id,deadline,points,isCompleted,task_id,user_id)
        self.cursor.execute(sqlquery,values)
        self.connection.commit()

    #Function to delete task
    def delete_task(self, task_id, user_id):
        sqlquery = "DELETE FROM tasks WHERE task_id=%s and user_id=%s"
        values = (task_id,user_id)
        self.cursor.execute(sqlquery,values)
        self.connection.commit()
    
    #Function to show task
    def show_task(self, user_id):
        sqlquery = "SELECT * FROM tasks WHERE user_id=%s"
        values = (user_id,)
        self.cursor.execute(sqlquery,values)
        result = self.cursor.fetchall()
        return result
    
    #Function to set task as completed
    def complete_task(self, task_id, user_id):
        sqlquery = "UPDATE tasks SET isCompleted=1 WHERE task_id=%s and user_id=%s"
        values = (task_id,user_id)
        self.cursor.execute(sqlquery,values)
        self.connection.commit()

    #Function to set task as uncompleted
    def uncomplete_task(self, task_id, user_id):
        sqlquery = "UPDATE tasks SET isCompleted=0 WHERE task_id=%s and user_id=%s"
        values = (task_id,user_id)
        self.cursor.execute(sqlquery,values)
        self.connection.commit()
    
    def __del__(self):
        self.connection.close()


