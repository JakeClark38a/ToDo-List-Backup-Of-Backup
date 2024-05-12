from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
tododb = SQLAlchemy()
# Description: This file contains the database schema for the application.


User_Team = tododb.Table('user_team',
    tododb.Column('user_id', tododb.NVARCHAR(40), tododb.ForeignKey('users.user_id', ondelete="CASCADE"), primary_key=True),
    tododb.Column('team_id', tododb.NVARCHAR(40), tododb.ForeignKey('teams.team_id', ondelete="CASCADE"), primary_key=True)
)

class Users(tododb.Model, UserMixin):
    __tablename__ = 'users'
    user_id = tododb.Column(tododb.NVARCHAR(40), primary_key=True)
    email = tododb.Column(tododb.NVARCHAR(100))
    password = tododb.Column(tododb.NVARCHAR(100))
    name = tododb.Column(tododb.NVARCHAR(256))
    bio = tododb.Column(tododb.NVARCHAR(2000))
    country = tododb.Column(tododb.NVARCHAR(200))
    image = tododb.Column(tododb.NVARCHAR(200))
    type_account = tododb.Column(tododb.NVARCHAR(10))
    external_id = tododb.Column(tododb.NVARCHAR(40))
    isFillForm = tododb.Column(tododb.BOOLEAN, default=False)
    points = tododb.Column(tododb.Integer, default=0)
    dark_mode = tododb.Column(tododb.BOOLEAN, default=False)
    TeamUser = tododb.relationship('Teams', secondary=User_Team, backref='users')
    last_join_team = tododb.Column(tododb.NVARCHAR(40))

    def __repr__(self) -> str:
        return f'{self.user_id, self.email, self.name, self.bio, self.country, self.image, self.type_account, self.external_id, self.isFillForm , self.points}'
    
    def get_id(self):
        return self.user_id
    
    
class Teams(tododb.Model):
    __tablename__ = 'teams'
    team_id = tododb.Column(tododb.NVARCHAR(40), primary_key=True)
    team_name = tododb.Column(tododb.NVARCHAR(100))
    team_description = tododb.Column(tododb.NVARCHAR(500))
    team_code = tododb.Column(tododb.NVARCHAR(100))
    admin_id = tododb.Column(tododb.NVARCHAR(40), tododb.ForeignKey('users.user_id', ondelete="CASCADE"),primary_key=True)

    def __repr__(self) -> str:
        return f'{self.team_id, self.team_name, self.team_description, self.team_password, self.admin_id}'
    def get_id(self):
        return self.team_id

#For individual user
class Groupss(tododb.Model):
    __tablename__ = 'groupss'
    group_id = tododb.Column(tododb.NVARCHAR(40), primary_key=True)
    group_title = tododb.Column(tododb.NVARCHAR(100))
    user_id = tododb.Column(tododb.NVARCHAR(40), tododb.ForeignKey('users.user_id', ondelete="CASCADE") ,primary_key=True)
    color = tododb.Column(tododb.NVARCHAR(10))
    def_tag = tododb.Column(tododb.NVARCHAR(40), nullable=True)
    def __repr__(self) -> str:
        return f'{self.group_id, self.group_title, self.user_id, self.color, self.def_tag}'

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

#For team
class TeamGroupss(tododb.Model):
    __tablename__ = 'teamgroupss'
    group_id = tododb.Column(tododb.NVARCHAR(40), primary_key=True)
    group_title = tododb.Column(tododb.NVARCHAR(100))
    author_id = tododb.Column(tododb.NVARCHAR(40), tododb.ForeignKey('users.user_id', ondelete="CASCADE") ,primary_key=True)
    color = tododb.Column(tododb.NVARCHAR(10))
    def_tag = tododb.Column(tododb.NVARCHAR(40))
    team_id = tododb.Column(tododb.NVARCHAR(40), tododb.ForeignKey('teams.team_id', ondelete="CASCADE") ,primary_key=True)
    def __repr__(self) -> str:
        return f'{self.group_id, self.group_title, self.author_id, self.color, self.def_tag}'

class TeamTags(tododb.Model):
    __tablename__ = 'teamtags'
    tag_id = tododb.Column(tododb.NVARCHAR(40), primary_key=True)
    tag_title = tododb.Column(tododb.NVARCHAR(100))
    tag_color = tododb.Column(tododb.NVARCHAR(10))
    author_id = tododb.Column(tododb.NVARCHAR(40), tododb.ForeignKey('users.user_id', ondelete="CASCADE") ,primary_key=True)
    group_id = tododb.Column(tododb.NVARCHAR(40), tododb.ForeignKey('teamgroupss.group_id', ondelete="CASCADE") ,primary_key=True)
    team_id = tododb.Column(tododb.NVARCHAR(40), tododb.ForeignKey('teams.team_id', ondelete="CASCADE") ,primary_key=True)
    def __repr__(self) -> str:
        return f'{self.tag_id, self.tag_title, self.tag_color, self.author_id, self.group_id}'
    
class TeamTasks(tododb.Model):
    __tablename__ = 'teamtasks'
    task_id = tododb.Column(tododb.NVARCHAR(40), primary_key=True)
    task_title = tododb.Column(tododb.NVARCHAR(100))
    task_description = tododb.Column(tododb.NVARCHAR(500))
    tag_id = tododb.Column(tododb.NVARCHAR(40), tododb.ForeignKey('teamtags.tag_id', ondelete="CASCADE"),primary_key=True)
    author_id = tododb.Column(tododb.NVARCHAR(40), tododb.ForeignKey('users.user_id', ondelete="CASCADE"),primary_key=True)
    deadline = tododb.Column(tododb.DateTime)
    points = tododb.Column(tododb.Integer)
    isCompleted = tododb.Column(tododb.BOOLEAN, default=False)
    team_id = tododb.Column(tododb.NVARCHAR(40), tododb.ForeignKey('teams.team_id', ondelete="CASCADE") ,primary_key=True)
    completed_user = tododb.Column(tododb.NVARCHAR(40), tododb.ForeignKey('users.user_id'))

    def __repr__(self) -> str:
        return f'{self.task_id, self.task_title, self.task_description, self.tag_id, self.author_id, self.deadline, self.points, self.isCompleted}'

#For trees:
class Trees(tododb.Model):
    __tablename__ = 'trees'
    tree_id = tododb.Column(tododb.NVARCHAR(40), primary_key=True)
    treeStage = tododb.Column(tododb.Integer)
    treeCount = tododb.Column(tododb.Integer)
    wateringsLeft = tododb.Column(tododb.Integer)
    fertilizationsLeft = tododb.Column(tododb.Integer)
    autoOption = tododb.Column(tododb.BOOLEAN, default=False)
    audioOption = tododb.Column(tododb.BOOLEAN, default=True)
    numberOfWaterUsed = tododb.Column(tododb.Integer, default=0)
    numberOfFertilizerUsed = tododb.Column(tododb.Integer, default=0)
    numberOfBirdHaveEliminated = tododb.Column(tododb.Integer, default=0)
    user_id = tododb.Column(tododb.NVARCHAR(40), tododb.ForeignKey('users.user_id', ondelete="CASCADE"),primary_key=True)

    def __repr__(self) -> str:
        return f'{self.tree_id, self.tree_name, self.tree_description, self.tree_password, self.admin_id}'
    def get_id(self):
        return self.tree_id