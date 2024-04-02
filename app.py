from flask import Flask, request, render_template, redirect, url_for
import mysql.connector
from flask_mail import Mail, Message
from secrets import token_bytes
from database import ToDoDatabase
import hashlib
tododb = ToDoDatabase()
tododb.create_table()



app = Flask(__name__, template_folder='templates')

@app.route('/')
def index():
    return render_template('landingPage.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == "POST":
        user_name = request.form['username']
        user_password = request.form['password']
        user_password = hashlib.sha256(user_password.encode('utf-8')).hexdigest()
        find_user = tododb.show_user(user_name, user_password)
        if (find_user):
            return redirect(url_for('main_page'))
        else: return redirect(url_for('login'))
    else:
        return render_template('loginPage.html')


@app.route('/register', methods=['GET', 'POST'])
def register():
    pass




@app.route('/home', methods=['GET', 'POST'])
def main_page():
    return render_template('mainPage.html')

@app.route('/logout', methods=['GET', 'POST'])
def logout():
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)