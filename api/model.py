from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
import uuid
tododb = SQLAlchemy()
# Description: This file contains the database schema for the application.
class Users(tododb.Model, UserMixin):
    __tablename__ = 'users'
    user_id = tododb.Column(tododb.NVARCHAR(40), primary_key=True)
    email = tododb.Column(tododb.NVARCHAR(100))
    password = tododb.Column(tododb.NVARCHAR(100))
    name = tododb.Column(tododb.NVARCHAR(256))
    bio = tododb.Column(tododb.NVARCHAR(2000))
    location = tododb.Column(tododb.NVARCHAR(200))
    image = tododb.Column(tododb.NVARCHAR(200))
    type_account = tododb.Column(tododb.NVARCHAR(10))
    external_id = tododb.Column(tododb.NVARCHAR(40))
    isFillForm = tododb.Column(tododb.BOOLEAN, default=False)

    def __repr__(self) -> str:
        return f'{self.user_id, self.email, self.name, self.bio, self.location, self.image, self.type_account, self.external_id, self.isFillForm}'
    
    def get_id(self):
        return self.user_id
    

    
class Groupss(tododb.Model):
    __tablename__ = 'groupss'
    group_id = tododb.Column(tododb.NVARCHAR(40), primary_key=True)
    group_title = tododb.Column(tododb.NVARCHAR(100))
    user_id = tododb.Column(tododb.NVARCHAR(40), tododb.ForeignKey('users.user_id', ondelete="CASCADE") ,primary_key=True)
    color = tododb.Column(tododb.NVARCHAR(10))
    def __repr__(self) -> str:
        return f'{self.group_id, self.group_title, self.user_id, self.color}'

class Tags(tododb.Model):
    __tablename__ = 'tags'
    tag_id = tododb.Column(tododb.NVARCHAR(40), primary_key=True)
    tag_title = tododb.Column(tododb.NVARCHAR(100))
    tag_color = tododb.Column(tododb.NVARCHAR(10))
    user_id = tododb.Column(tododb.NVARCHAR(40), tododb.ForeignKey('users.user_id', ondelete="CASCADE") ,primary_key=True)
    group_id = tododb.Column(tododb.NVARCHAR(40), tododb.ForeignKey('groupss.group_id', ondelete="CASCADE") ,primary_key=True)
    def __repr__(self) -> str:
        return f'{self.tag_id, self.tag_title, self.tag_color, self.user_id, self.group_id}'
    
class Tasks(tododb.Model):
    __tablename__ = 'tasks'
    task_id = tododb.Column(tododb.NVARCHAR(40), primary_key=True)
    task_title = tododb.Column(tododb.NVARCHAR(100))
    task_description = tododb.Column(tododb.NVARCHAR(500))
    tag_id = tododb.Column(tododb.NVARCHAR(40), tododb.ForeignKey('tags.tag_id', ondelete="CASCADE"),primary_key=True)
    user_id = tododb.Column(tododb.NVARCHAR(40), tododb.ForeignKey('users.user_id', ondelete="CASCADE"),primary_key=True)
    deadline = tododb.Column(tododb.DateTime)
    points = tododb.Column(tododb.Integer)
    isCompleted = tododb.Column(tododb.BOOLEAN, default=False)

    def __repr__(self) -> str:
        return f'{self.task_id, self.task_title, self.task_description, self.tag_id, self.user_id, self.deadline, self.points, self.isCompleted}'

