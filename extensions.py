from typing import Any
from flask_sqlalchemy import SQLAlchemy as SQL
from sqlalchemy import Integer, String
#from board import app
db = SQL()


class Login(db.Model):
    __tablename__ = "Login"
    id=db.Column(Integer,primary_key=True,autoincrement=True)
    username=db.Column(String(100),nullable=False)
    password=db.Column(String(100),nullable=False)

    def __init__(self, user_name: str, pass_word: str):
        self.username = user_name
        self.password = pass_word




