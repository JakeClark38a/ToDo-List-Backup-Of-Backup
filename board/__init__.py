from flask import Flask, url_for, redirect
import requests
from board import welcome



def create_app():
    app = Flask(__name__)
    app.secret_key = welcome.SECRET_KEY
    app.register_blueprint(welcome.bp)
    return app

if __name__=="__main__":
    create_app()