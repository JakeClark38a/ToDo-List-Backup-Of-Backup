from flask import Flask, request, render_template, redirect, url_for, session, jsonify,flash
import mysql.connector
from flask_mail import Mail, Message
from secrets import token_bytes
from database import ToDoDatabase
import hashlib, os, datetime
from authlib.integrations.flask_client import OAuth
from authlib.common.security import generate_token
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
    GOOGLE_CLIENT_ID = os.getenv("OAUTH2_CLIENT_ID")
    #OAUTH2_CLIENT_ID=1002415781087-d1a74175n9vk48ehrir794qghma573qi.apps.googleusercontent.com
    GOOGLE_CLIENT_SECRET = os.getenv("OAUTH2_CLIENT_SECRET")
    #OAUTH2_CLIENT_SECRET=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
    CONF_URL = 'https://accounts.google.com/.well-known/openid-configuration'
    oauth.register(
        name='google',
        client_id=GOOGLE_CLIENT_ID,
        client_secret=GOOGLE_CLIENT_SECRET,
        server_metadata_url=CONF_URL,
        client_kwargs={
            'scope': 'openid email profile'
        }
    )
    redirect_uri = url_for('authorize', _external=True)
    session['nonce'] = generate_token()
    return oauth.google.authorize_redirect(redirect_uri,nonce=session['nonce'])

@app.route('/authorize')
def authorize():
    try:
        token = oauth.google.authorize_access_token()
        user = oauth.google.parse_id_token(token, nonce=session['nonce'])
        print("Google user: ", user)
        tododb.insert_user_google(user['email'],user['name'],user['picture'],user['sub'])
        session['user'] = tododb.create_session_google(user['sub'])
        session['type'] = 'google'
        session['token'] = token
        return redirect(url_for('login_by_google'))
    except Exception:
        return redirect(url_for('login'))
    
@app.route('/google/success',methods=['GET','POST'])
def login_by_google():
    return redirect(url_for('main_page'))



@app.route('/facebook/')
def facebook():
    # Facebook Oauth Config
    FACEBOOK_CLIENT_ID = "394161483411121"
    FACEBOOK_CLIENT_SECRET = "5da1aea22e3f2caa75f7c6ed2b98a88f"
    oauth.register(
        name='facebook',
        client_id=FACEBOOK_CLIENT_ID,
        client_secret=FACEBOOK_CLIENT_SECRET,
        access_token_url='https://graph.facebook.com/oauth/access_token',
        access_token_params=None,
        authorize_url='https://www.facebook.com/dialog/oauth',
        authorize_params=None,
        api_base_url='https://graph.facebook.com/',
        client_kwargs={'scope': 'email'},
    )
    redirect_uri = url_for('facebook_auth', _external=True)
    return oauth.facebook.authorize_redirect(redirect_uri)

@app.route('/facebook/auth/')
def facebook_auth():
    try:
        token = oauth.facebook.authorize_access_token()
        resp = oauth.facebook.get(
            'https://graph.facebook.com/me?fields=id,name,email,picture{url}')
        user = resp.json()
        #tododb.insert_user_facebook(user['email'], user['name'], user['id'])
        tododb.insert_user_facebook(user['email'], user['name'], user['picture']['data']['url'], user['id'])
        print("Facebook User ", user)
        print("Images: ", user['picture']['data']['url'])
        session['user'] = tododb.create_session_facebook(user['id'])
        session['type'] = 'facebook'
        session['token'] = token
        return redirect(url_for("main_page"))
    except Exception:
        return redirect(url_for('login'))


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


@app.route('/todo/create', methods=['POST'])
def create_todo():
    data = request.get_json()
    deadline = datetime_to_string(data['deadline'])
    try:
        tododb.create_task(data['taskId'],data['title'],data['description'],data['tag'],get_user_id(),deadline,data['points'],data['isCompleted'])
        print(data)
        print(data['deadline'], type(data['deadline']))
    except Exception as e:
        return jsonify({"error": "Error when creating task"})
    return jsonify(data)

@app.route('/todo/update', methods=['POST'])
def update_todo():
    data = request.get_json()
    deadline = datetime_to_string(data['deadline'])
    try:
        tododb.update_task(data['taskId'],data['title'],data['description'],data['tag'],get_user_id(),deadline,data['points'],data['isCompleted'])
        print(data)
    except Exception as e:
        return jsonify({"error": "Error when updating task"})
    return jsonify(data)

@app.route('/todo/delete', methods=['POST'])
def delete_todo():
    data = request.get_json()
    try:
        tododb.delete_task(data['taskId'],get_user_id())
        print(data)
    except Exception as e:
        return jsonify({"error": "Error when deleting task"})
    return jsonify(data)

@app.route('/todo/get', methods=['GET'])
def get_todo():
    data = tododb.show_task(get_user_id())
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
    user_id = get_user_id()
    try:
        tododb.create_group(data['groupId'],data['title'],user_id,data['color'])
        print(data)
    except Exception as e:
        return jsonify({"error": "Error when creating group"})
    return jsonify(data)

@app.route('/todo/group/update', methods=['POST'])
def update_group():
    data = request.get_json()
    user_id = get_user_id()
    tododb.update_group(data['groupId'],data['title'],user_id,data['color'])
    print(data)
    return jsonify(data)

@app.route('/todo/group/delete', methods=['POST'])
def delete_group():
    data = request.get_json()
    user_id = get_user_id()
    tododb.delete_group(data['groupId'],user_id)
    print(data)
    return jsonify(data)

@app.route('/todo/group/get', methods=['GET'])
def get_group():
    user_id = session['user']
    user_id = get_user_id()
    data = tododb.show_group(user_id)
    return jsonify(data)

@app.route('/todo/tag/create', methods=['POST'])
def create_tag():
    data = request.get_json()
    user_id = get_user_id()
    tododb.create_tag(data['tagId'],data['groupId'],data['title'],data['color'],user_id)
    print(data)
    return jsonify(data)

@app.route('/todo/tag/update', methods=['POST'])
def update_tag():
    data = request.get_json()
    user_id = get_user_id()
    tododb.update_tag(data['tagId'],data['groupId'],data['title'],data['color'],user_id)
    print(data)
    return jsonify(data)

@app.route('/todo/tag/delete', methods=['POST'])
def delete_tag():
    data = request.get_json()
    user_id = get_user_id()
    tododb.delete_tag(data['tagId'],user_id)
    print(data)
    return jsonify(data)


if __name__ == '__main__':
    app.run(debug=True, ssl_context='adhoc')