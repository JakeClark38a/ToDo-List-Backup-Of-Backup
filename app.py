from flask import Flask, request, render_template, redirect, url_for, session
import mysql.connector
from flask_mail import Mail, Message
from secrets import token_bytes
from database import ToDoDatabase
import hashlib, os
from authlib.integrations.flask_client import OAuth

app = Flask(__name__, template_folder='templates')
tododb = ToDoDatabase()
tododb.create_table()
app.secret_key = token_bytes(16).hex()
oauth = OAuth(app)

appConf = {
    "OAUTH2_CLIENT_ID": os.getenv("OAUTH2_CLIENT_ID"),
    "OAUTH2_CLIENT_SECRET": os.getenv("OAUTH2_CLIENT_SECRET"),
    "OAUTH2_META_URL": "https://accounts.google.com/.well-known/openid-configuration",
    "FLASK_SECRET": os.getenv("FLASK_SECRET"),
    "FLASK_PORT": 1337
}

oauth.register("myweb",
            client_id=appConf.get("OAUTH2_CLIENT_ID"),
            client_secret=appConf.get("OAUTH2_CLIENT_SECRET"),
            server_metadata_url=appConf.get("OAUTH2_META_URL"),
            client_kwargs={"scope": "openid profile email https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/user.gender.read"},
    )



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

@app.route('/google_login')
def login_google():
    return oauth.myweb.authorize_redirect(url_for('authorize', _external=True))

@app.route('/authorize')
def authorize():
    try:
        token = oauth.myweb.authorize_access_token()
        session['user'] = token
        return redirect(url_for('login_by_google'))
    except Exception:
        return redirect(url_for('login'))
    
@app.route('/google/success',methods=['GET','POST'])
def login_by_google():
    return render_template('mainPage.html')


@app.route('/home', methods=['GET', 'POST'])
def main_page():
    return render_template('mainPage.html')

@app.route('/logout', methods=['GET', 'POST'])
def logout():
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)