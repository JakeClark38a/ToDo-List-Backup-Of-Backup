from flask import Flask, request, render_template, redirect, url_for, session, jsonify,flash
import mysql.connector
from flask_mail import Mail, Message
from secrets import token_bytes
from database import ToDoDatabase
import hashlib, os, datetime
from authlib.integrations.flask_client import OAuth
# from email_validator import validate_email, EmailNotValidError
from password_strength import PasswordPolicy

#Create policy for password

policy = PasswordPolicy.from_names(strength=0.67)





app = Flask(__name__, template_folder='templates')
tododb = ToDoDatabase()
tododb.create_table()

# Testing data
admin_mail = "vodanhlax@gmail.com"
admin_password = hashlib.sha256("Phong@123456789".encode('utf-8')).hexdigest()
if tododb.show_user(admin_mail,admin_password) == None:
    tododb.insert_user("vodanhlax@gmail.com","Phong@123456789","SeaWind")



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

#Fuction 

def datetime_to_string(user_date):
    result = datetime.datetime.strptime(user_date, '%Y-%m-%dT%H:%M')
    return result.strftime('%Y-%m-%d %H:%M:%S')

def check_session():
    if 'user' in session:
        return True
    else:
        return False
    
def get_user_id():
    user_id = session['user']
    user_id = user_id[0]
    return user_id

#Endpoints 
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
            session['user'] = tododb.create_session(user_name, user_password)
            return redirect(url_for('main_page'))
        else: return redirect(url_for('login'))
    else:
        return render_template('loginPage.html')


@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == "POST":
        user_email = request.form['email']  
        user_password = request.form['password']
        user_retype_password = request.form['repeat-password']
        strength_pass =  policy.password(user_password).strength()
        if tododb.register_validation(user_email) == False:
            flash("Email is already used")
            return redirect(url_for('register'))
        elif hashlib.sha256(user_password.encode('utf-8')).hexdigest() != hashlib.sha256(user_retype_password.encode('utf-8')).hexdigest():
            flash("Password and retype password are not the same")
            return redirect(url_for('register'))
        elif strength_pass < 0.67:
            flash("Password is not strong enough")
            return redirect(url_for('register'))
        else:
            tododb.insert_user(user_email, user_password)
            return redirect(url_for('login'))
    else:
        return render_template('registerPage.html')

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
    return redirect(url_for('main_page'))


@app.route('/todo', methods=['GET', 'POST'])
def main_page():
    if check_session():
        return render_template('mainPage.html')
    else: return redirect(url_for('login'))

@app.route('/logout', methods=['GET', 'POST'])
def logout():
    session.pop('user', None)
    return redirect(url_for('index'))


# Because we don't have a database and real backend code, we'll build code to check AJAX requests and return some data.
# We'll use the Flask framework to build the backend code.
from flask import Flask, request, jsonify, render_template

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return render_template('mainPage.html')

@app.route('/todo/create', methods=['POST'])
def create_todo():
    data = request.get_json()
    print(data)
    return jsonify(data)

@app.route('/todo/update', methods=['POST'])
def update_todo():
    data = request.get_json()
    print(data)
    return jsonify(data)

@app.route('/todo/delete', methods=['POST'])
def delete_todo():
    data = request.get_json()
    print(data)
    return jsonify(data)

@app.route('/todo/get', methods=['GET'])
def get_todo():
    data = {
        'todos': [
            {
                'id': 1,
                'title': 'Todo 1',
                'description': 'Description 1'
            },
            {
                'id': 2,
                'title': 'Todo 2',
                'description': 'Description 2'
            },
            {
                'id': 3,
                'title': 'Todo 3',
                'description': 'Description 3'
            },
            {
                'id': 4,
                'title': 'Todo 4',
                'description': 'Description 4'
            },
            {
                'id': 5,
                'title': 'Todo 5',
                'description': 'Description 5'
            }
        ]
    }
    return jsonify(data)

@app.route('/todo/completed/<id>', methods=['POST'])
def completed_todo(id):
    data = request.get_json()
    data['id'] = id
    print(data)
    return jsonify(data)

@app.route('/todo/uncompleted/<id>', methods=['POST'])
def uncompleted_todo(id):
    data = request.get_json()
    data['id'] = id
    return jsonify(data)


# Group & Tag
@app.route('/todo/group/create', methods=['POST'])
def create_group():
    data = request.get_json()
    print(data)
    return jsonify(data)

@app.route('/todo/group/update', methods=['POST'])
def update_group():
    data = request.get_json()
    print(data)
    return jsonify(data)

@app.route('/todo/group/delete', methods=['POST'])
def delete_group():
    data = request.get_json()
    print(data)
    return jsonify(data)

@app.route('/todo/group/get', methods=['GET'])
def get_group():
    data = {
        'groups': [
            {
                'id': 1,
                'title': 'Group 1',
                'description': 'Description 1'
            },
            {
                'id': 2,
                'title': 'Group 2',
                'description': 'Description 2'
            },
            {
                'id': 3,
                'title': 'Group 3',
                'description': 'Description 3'
            },
            {
                'id': 4,
                'title': 'Group 4',
                'description': 'Description 4'
            },
            {
                'id': 5,
                'title': 'Group 5',
                'description': 'Description 5'
            }
        ]
    }
    return jsonify(data)

@app.route('/todo/tag/create', methods=['POST'])
def create_tag():
    data = request.get_json()
    print(data)
    return jsonify(data)

@app.route('/todo/tag/update', methods=['POST'])
def update_tag():
    data = request.get_json()
    print(data)
    return jsonify(data)

@app.route('/todo/tag/delete', methods=['POST'])
def delete_tag():
    data = request.get_json()
    print(data)
    return jsonify(data)





if __name__ == '__main__':
    app.run(debug=True)