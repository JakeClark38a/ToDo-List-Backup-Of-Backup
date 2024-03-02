from flask import Flask, url_for, redirect
import requests
from board import welcome
from .extensions import db

#app = Flask(__name__)

def create_app():
    global app
    app = Flask(__name__)
    passwd = "Flask<123456789"
    app.config['SQLALCHEMY_DATABASE_URI'] = f"mysql+pymysql://flask:{passwd}@localhost:3306/Users?charset=utf8mb4"
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.secret_key = welcome.SECRET_KEY
    db.init_app(app)
    app.register_blueprint(welcome.bp)
    with app.app_context():
        db.create_all()
    return app

if __name__=="__main__":
    create_app()