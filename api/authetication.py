from flask import Blueprint, request, jsonify, redirect, url_for, render_template, session, flash, current_app
from .model import Users, tododb
from flask_login import login_user, logout_user, login_required, current_user
from flask_mail import Mail, Message
from flask_bcrypt import Bcrypt
from password_strength import PasswordPolicy
import pyotp, threading
from itsdangerous import URLSafeTimedSerializer
from secrets import token_bytes
from authlib.integrations.flask_client import OAuth
from authlib.common.security import generate_token
import uuid


# auth config
auth = Blueprint('auth', __name__, static_folder='../static/', template_folder='../templates/')
policy = PasswordPolicy.from_names(strength=0.67)
key = pyotp.random_base32()
totp = pyotp.TOTP(key,digits=10,interval=600)

SECRET_KEY = token_bytes(16).hex()
secure_password_salt = token_bytes(16).hex()
oauth = OAuth()
#Mail config
mail = Mail()
#Bcrypt config
bcrypt = Bcrypt()
#Functions
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

#Endpoints

@auth.errorhandler(404)
def page_not_found(e):
    return render_template('notfounderror.html'), 404

#Endpoints 
@auth.route('/')
def index():
    return render_template('landingPage.html')


@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == "POST":
        user_name = request.form['username']
        user_password = request.form['password']
        
        find_user = Users.query.filter_by(email=user_name).first()
        if bcrypt.check_password_hash(find_user.password, user_password):
            session['user'] = find_user.user_id
            session['type'] = 'normal'
            login_user(find_user)
            return redirect(url_for('todo.main_page'))
        else: return redirect(url_for('auth.login'))
    else:
        return render_template('loginPage.html')
    
@auth.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == "POST":
        user_email = request.form['email']
        user_password = request.form['password']
        user_retype_password = request.form['repeat-password']
        strength_pass =  policy.password(user_password).strength()
        find_email = Users.query.filter_by(email=user_email, type_account=None).first()
        if find_email:
            flash("Email is already used")
            return redirect(url_for('auth.register'))
        elif user_password != user_retype_password:
            flash("Password and retype password are not the same")
            return redirect(url_for('auth.register'))
        elif strength_pass < 0.67:
            flash("Password is not strong enough")
            return redirect(url_for('auth.register'))
        else:
            hash_password = Bcrypt().generate_password_hash(user_password).decode('utf-8')
            new_user = Users(user_id=uuid.uuid4().hex,email=user_email, password=hash_password)
            tododb.session.add(new_user)
            tododb.session.commit()
            return redirect(url_for('auth.login'))
    else:
        return render_template('registerPage.html')

@auth.route('/logout', methods=['GET'])
def logout():
    session.pop('user', None)
    session.pop('type', None)
    session.pop('token', None)
    logout_user()
    return redirect(url_for('auth.index'))

@auth.route('/forgot_password', methods=['GET', 'POST'])
def forgot_password():
    if request.method == "GET":
        return render_template('forgotPaswdPage.html')
    else:
        reset_email = request.form["email"]
        find_user = Users.query.filter_by(email=reset_email).first()
        if find_user:
            msg = Message("Reset Password", sender="noreply@gmail.com", recipients=[reset_email])
            msg.body = f"Hello {find_user.name}, \n\n Please click the link below to reset your password: {url_for('auth.reset_password', token=create_token(find_user.email), _external=True)}"
            apps = current_app._get_current_object()
            thr = threading.Thread(target=send_async_email, args=[apps,msg])
            thr.start()
            return redirect(url_for('auth.login'))
        return render_template("forgotPaswdPage.html")

@auth.route('/reset_password/<token>',methods=["POST","GET"])
def reset_password(token):
    if request.method == "GET":
        email = decode_token(token)
        if email != "Error" and Users.query.filter_by(email=email).first():
            return render_template('resetPassword.html', token=token)
        else:
            return redirect(url_for('auth.login'))
    else:
        new_password = request.form['reset-password']
        retype_password = request.form['retype-password']
        if new_password != retype_password:
            flash("Password and retype password are not the same")
            return redirect(url_for("auth.reset_password",token=token))
        elif policy.password(new_password).strength() < 0.67:
            flash("Password is not strong enough")
            return redirect(url_for("auth.reset_password",token=token))
        else:
            email = decode_token(token)
            if email != "Error" and Users.query.filter_by(email=email).first():
                find_user = Users.query.filter_by(email=email).first()
                find_user.password = bcrypt.generate_password_hash(new_password).decode('utf-8')
                tododb.session.commit()
                flash("Password Updated")
                return redirect(url_for('auth.login'))
            else:
                flash("Error")
                return redirect(url_for('auth.login'))


@auth.route('/google_login')
def login_google():
    GOOGLE_CLIENT_ID = "1002415781087-3dcgjtloj7l1slkoltrojkfffjldvr98.apps.googleusercontent.com"
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
    redirect_uri = url_for('auth.authorize', _external=True)
    session['nonce'] = generate_token()
    return oauth.google.authorize_redirect(redirect_uri,nonce=session['nonce'])

@auth.route('/authorize')
def authorize():
    token = oauth.google.authorize_access_token()
    user = oauth.google.parse_id_token(token, nonce=session['nonce'])
    print("Google User: ", user)
    if Users.query.filter_by(external_id=user['sub']).first() is None:
        new_password = Bcrypt().generate_password_hash('Demo@123').decode('utf-8')
        new_user = Users(user_id=uuid.uuid4().hex,name=user['name'], email=user['email'], password= new_password , image=user['picture'], external_id=user['sub'])
        tododb.session.add(new_user)
        tododb.session.commit()
        print(new_user)
        session['user'] = new_user.user_id
        session['type'] = 'google'
        session['token'] = token
        login_user(new_user)
        return redirect(url_for('todo.main_page'))
    else:
        session['user'] = Users.query.filter_by(external_id=user['sub']).first().user_id
        session['type'] = 'google'
        session['token'] = token
        login_user(Users.query.filter_by(external_id=user['sub']).first())
        return redirect(url_for('todo.main_page'))

    


@auth.route('/facebook/', methods=['GET', 'POST'])
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
    redirect_uri = url_for('auth.facebook_auth', _external=True)
    return oauth.facebook.authorize_redirect(redirect_uri)


@auth.route('/facebook/auth/')
def facebook_auth():
    try:
        token = oauth.facebook.authorize_access_token()
        resp = oauth.facebook.get(
            'https://graph.facebook.com/me?fields=id,name,email,picture{url}')
        user = resp.json()
        if Users.query.filter_by(external_id=user['id']).first() is None:
            new_password = Bcrypt().generate_password_hash('Demo@123').decode('utf-8')
            new_user = Users(user_id=uuid.uuid4().hex,name=user['name'], email=user['email'], password=new_password, image=user['picture']['data']['url'], external_id=user['id'])
            tododb.session.add(new_user)
            tododb.session.commit()
            session['user'] = new_user.user_id
            session['type'] = 'facebook'
            session['token'] = token
            login_user(new_user)
            return redirect(url_for('todo.main_page'))
        else:
            session['user'] = Users.query.filter_by(external_id=user['id']).first().user_id
            session['type'] = 'facebook'
            session['token'] = token
            login_user(Users.query.filter_by(external_id=user['id']).first())
            return redirect(url_for('todo.main_page'))
    except Exception:
        return redirect(url_for('auth.login'))

