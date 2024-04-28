from flask import Flask, request, render_template, redirect, url_for, session, jsonify,flash
import mysql.connector
from flask_mail import Mail, Message
from secrets import token_bytes
from database import ToDoDatabase
import hashlib, os, datetime, threading, base64
from authlib.integrations.flask_client import OAuth
from authlib.common.security import generate_token
from werkzeug.utils import secure_filename
from password_strength import PasswordPolicy
from time import time
import pyotp
from itsdangerous import URLSafeTimedSerializer

#App config:
app = Flask(__name__, template_folder='templates/',static_folder='static/')
app.config['UPLOAD_FOLDER'] = 'static/upload'


#Create policy for password

policy = PasswordPolicy.from_names(strength=0.67)
key = pyotp.random_base32()
totp = pyotp.TOTP(key,digits=10,interval=600)

tododb = ToDoDatabase()
#tododb.drop_database()
tododb.create_table()

# Testing data
admin_mail = "vodanhlax@gmail.com"
admin_password = hashlib.sha256("Phong@123456789".encode('utf-8')).hexdigest()
if tododb.show_user(admin_mail,admin_password) == None:
    tododb.insert_user("vodanhlax@gmail.com","Phong@123456789","SeaWind")
# Testing data 2
tester_mail = "a@a.a"
tester_password = hashlib.sha256("a".encode('utf-8')).hexdigest()
if tododb.show_user(tester_mail,tester_password) == None:
    tododb.insert_user("a@a.a","a","Null")

##Oauth config
app.secret_key = SECRET_KEY = token_bytes(16).hex()
secure_password_salt = token_bytes(16).hex()
oauth = OAuth(app)

##Mail config
app.config['MAIL_SERVER']= 'smtp.gmail.com'
#'live.smtp.mailtrap.io'
#'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
#587
#465
app.config['MAIL_USERNAME'] = 'listtodo012@gmail.com'
#'api'
#'listtodo012@gmail.com'
app.config['MAIL_PASSWORD'] = 'mbryfkhizpbantuk'
#'34dffc615ed3faceecabe2924f23206a'
#'mbryfkhizpbantuk'
#'nzeudxvcyfoeiqzb'
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USE_TLS'] = False

mail = Mail(app)



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

def isFillForm():
    if tododb.check_user_form(get_user_id()) == True:
        return True
    else:
        return False

def create_token(user_mail):
    token = URLSafeTimedSerializer(SECRET_KEY)
    return token.dumps(user_mail, salt=secure_password_salt)

def decode_token(user_token,expiration=600):
    token = URLSafeTimedSerializer(SECRET_KEY)
    try:
        email = token.loads(user_token, salt=secure_password_salt, max_age=expiration)
        return email
    except Exception as e:
        return "Error"

def send_async_email(app, msg):
    with app.app_context():
        mail.send(msg)

def generate_verify_otp(option, otp=None):
    if option == "generate":
        return totp.now()
    elif option == "verify":
        return totp.verify(otp)




#Error page

@app.errorhandler(404)
def page_not_found(e):
    return render_template('notfounderror.html'), 404

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
            session['type'] = 'normal'
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
    
################################
#LoginV2
@app.route('/loginv2', methods=['GET', 'POST'])
def loginv2():
    if request.method == "POST":
        user_name = request.form['username']
        user_password = request.form['password']
        user_password = hashlib.sha256(user_password.encode('utf-8')).hexdigest()
        is_login = request.form.get('is_login', 'true') == 'true'  # Get the value of is_login from the form
        if is_login:
            find_user = tododb.show_user(user_name, user_password)
            if find_user:
                session['user'] = tododb.create_session(user_name, user_password)
                return redirect(url_for('main_page'))
            else:
                flash("Invalid username or password")
                return redirect(url_for('loginv2', is_login=True))
        else:
            user_retype_password = request.form['repeat-password']
            strength_pass = policy.password(user_password).strength()
            if tododb.register_validation(user_name) == False:
                flash("Email is already used")
                return redirect(url_for('loginv2', is_login=False))
            elif hashlib.sha256(user_password.encode('utf-8')).hexdigest() != hashlib.sha256(user_retype_password.encode('utf-8')).hexdigest():
                flash("Password and retype password are not the same")
                return redirect(url_for('loginv2', is_login=False))
            elif strength_pass < 0.67:
                flash("Password is not strong enough")
                return redirect(url_for('loginv2', is_login=False))
            else:
                tododb.insert_user(user_name, user_password)
                session['user'] = tododb.create_session(user_name, user_password)
                return redirect(url_for('main_page'))
    else:
        return render_template('signin_login_v2.html', is_login=True)

################################

@app.route('/google_login')
def login_google():
    GOOGLE_CLIENT_ID = "1002415781087-d1a74175n9vk48ehrir794qghma573qi.apps.googleusercontent.com"
    #os.getenv("OAUTH2_CLIENT_ID")
    #OAUTH2_CLIENT_ID=1002415781087-d1a74175n9vk48ehrir794qghma573qi.apps.googleusercontent.com
    GOOGLE_CLIENT_SECRET = "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"
    #os.getenv("OAUTH2_CLIENT_SECRET")
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
    if check_session() and isFillForm() == False:
        tododb.default_setting(get_user_id())
        return redirect(url_for('profile', type=session['type']))
    elif check_session() and isFillForm() == True:
        return render_template('mainPage.html')
    else: return redirect(url_for('login'))

@app.route('/logout', methods=['GET', 'POST'])
def logout():
    session.pop('user', None)
    session.pop('type', None)
    session.pop('token', None)
    return redirect(url_for('index'))


###Forgot password endpoints


@app.route('/forgot_password',methods=["POST","GET"])
def forgot_password():
    if request.method == "GET":
        return render_template("forgotPaswdPage.html")
    elif request.method == "POST":
        reset_email = request.form["email"]
        if tododb.register_validation(reset_email) == False:
            msg = Message("Hello", sender='mailtrap@seaair.tech',recipients=[reset_email])
            msg.body = "Here is your reset link " + url_for("reset_password",token=create_token(reset_email),_external=True)
            thr = threading.Thread(target=send_async_email, args=[app, msg])
            thr.start() 
            #mail.send(msg)
            #flash("You have send tHe reset link")
            return redirect(url_for("login"))
        return render_template("forgotPaswdPage.html")

@app.route('/reset_password/<token>',methods=["POST","GET"])
def reset_password(token):
    if request.method == "GET":
        email = decode_token(token)
        if email != "Error" and tododb.register_validation(email) == False:
            return render_template("resetPassword.html", token=token)
        else:
            return redirect(url_for("login"))
    elif request.method == "POST":
        
        new_password = request.form['reset-password']
        retype_password = request.form['retype-password']
        if new_password != retype_password:
            flash("Password and retype password are not the same")
            return redirect(url_for("reset_password",token=token))
        elif policy.password(new_password).strength() < 0.67:
            flash("Password is not strong enough")
            return redirect(url_for("reset_password",token=token))
        else:
            email = decode_token(token)
            if email != "Error" and tododb.register_validation(email) == False:
                tododb.reset_password_user(email,new_password)
                flash("Password has been reset")
                return redirect(url_for("login"))
            else:
                flash("Error")
                return redirect(url_for("login"))






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
        return jsonify({"error": "Error when deleting task"}), 404
    return jsonify(data), 200

@app.route('/todo/get', methods=['GET'])
def get_todo():
    data = tododb.show_task(get_user_id())
    return jsonify(data), 200

@app.route('/todo/completed/<id>', methods=['POST'])
def completed_todo(id):
    data = request.get_json()
    data['id'] = id
    tododb.complete_task(id,get_user_id())
    print(data)
    return jsonify(data), 200

@app.route('/todo/uncompleted/<id>', methods=['POST'])
def uncompleted_todo(id):
    data = request.get_json()
    data['id'] = id
    tododb.uncomplete_task(id,get_user_id())    
    return jsonify(data), 200


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
    return jsonify(data), 200

@app.route('/todo/group/update', methods=['POST'])
def update_group():
    data = request.get_json()
    user_id = get_user_id()
    tododb.update_group(data['groupId'],data['title'],user_id,data['color'])
    print(data)
    return jsonify(data), 200

@app.route('/todo/group/delete', methods=['POST'])
def delete_group():
    data = request.get_json()
    user_id = get_user_id()
    tododb.delete_group(data['groupId'],user_id)
    print(data)
    return jsonify(data), 200

@app.route('/todo/group/get', methods=['GET'])
def get_group():
    user_id = session['user']
    user_id = get_user_id()
    data = tododb.show_group(user_id)
    return jsonify(data), 200

@app.route('/todo/tag/create', methods=['POST'])
def create_tag():
    data = request.get_json()
    user_id = get_user_id()
    tododb.create_tag(data['tagId'],data['groupId'],data['title'],data['color'],user_id)
    print(data)
    return jsonify(data), 200

@app.route('/todo/tag/update', methods=['POST'])
def update_tag():
    data = request.get_json()
    user_id = get_user_id()
    tododb.update_tag(data['tagId'],data['groupId'],data['title'],data['color'],user_id)
    print(data)
    return jsonify(data), 200

@app.route('/todo/tag/delete', methods=['POST'])
def delete_tag():
    data = request.get_json()
    user_id = get_user_id()
    tododb.delete_tag(data['tagId'],user_id)
    print(data)
    return jsonify(data)

####Profile endpoints
@app.route('/profile/<type>', methods=['GET','POST'])
def profile(type):
    if request.method == "GET":
        if check_session():
            return render_template('profilePage.html',type=session['type'])
        else: return redirect(url_for('login'))
    return render_template('profilePage.html')


@app.route('/profile/get', methods=['GET'])
def get_profile():
    if check_session():
        user_id = get_user_id()
        data = tododb.show_profile_user(user_id)
        
        print(data)
        json_data = {
            "username": data[0],
            "bio": data[1],
            "Location": data[2]
        }
        print(jsonify(json_data))
        return jsonify(json_data), 200
    else:
        return redirect(url_for('login'))

@app.route('/profile/update', methods=['POST'])
def update_profile():
    if check_session():
        data = request.get_json()
        print(data)
        tododb.update_profile(get_user_id(),data['username'],data['bio'],data['Location'])
        tododb.fill_user_form(get_user_id())
        return redirect(url_for('main_page'))


@app.route('/profile/update/image', methods=['POST'])
def update_image():
    if check_session():
        response_data = request.get_json()
        file = response_data['avatar']
        #print(file)
        starter = file.find(',')
        image_data = file[starter+1:]
        image_data = bytes(image_data, encoding='utf-8')
        print(image_data)
        file_path = url_for('static', filename=f'upload/{get_user_id()}.jpg')
        tododb.update_image(get_user_id(),file_path)
        image_path = os.path.join(app.config['UPLOAD_FOLDER'], f"{get_user_id()}.jpg")
        with open(image_path, "wb") as fh:
            fh.write(base64.decodebytes(image_data))   
        return jsonify({"status": "success"}), 200


@app.route('/profile/update/email_confirmation', methods=['POST'])
def update_email_confirmation():
    if check_session():
        data = request.get_json()
        curr_email = data['curr_email']
        print(data)
        msg = Message("Hello", sender='mailtrap@seaair.tech',recipients=[curr_email])
        msg.body = "Here is your OTP to verify your email " + generate_verify_otp("generate",None)
        thr = threading.Thread(target=send_async_email, args=[app, msg])
        thr.start() 
        return jsonify({"status": "success"}), 200

@app.route('/profile/update/email', methods=['POST'])
def update_email():
    if check_session():
        data = request.get_json()
        new_email = data['new_email']
        curr_email = data['curr_email']
        print(data)
        if tododb.register_validation(new_email) == True and new_email != curr_email and generate_verify_otp("verify",data['otp']) == True: 
            tododb.update_email(get_user_id(),new_email)
            print("Success")
            return jsonify({"status": "success"}), 200
        else:
            print("Error")
            return jsonify({"status": "error"}), 404
        
@app.route('/profile/update/password', methods=['POST'])
def update_password():
    if check_session():
        data = request.get_json()
        new_password = data['new_password']
        confirm_password = data['confirm_password']
        curr_password = data['curr_password']
        print(data)
        if  policy.password(new_password).strength() >= 0.67 and new_password == confirm_password and tododb.check_password_profile(get_user_id(),curr_password) == True:
            tododb.reset_password_profile(get_user_id(),new_password)
            return jsonify({"status": "success"}), 200
        else:
            return jsonify({"status": "error"}), 404

@app.route('/profile/get/image', methods=['GET'])
def get_user_image():
    if check_session():
        user_image = tododb.get_image(get_user_id())
        if user_image == None:
            return url_for('static', filename='images/profile.jpg')
        else: return user_image
        
if __name__ == '__main__':
    app.run(debug=True, ssl_context='adhoc')
