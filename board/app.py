from flask import render_template, url_for, request, redirect, session, flash, Flask
from flask_mail import Mail, Message
from secrets import token_bytes
import jwt
import requests
from board import welcome
from board.extensions import db
from board.extensions import Login
from authlib.integrations.flask_client import OAuth
import json, hashlib


app = Flask(__name__)
oauth = OAuth(app)


app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'vodanhlax@gmail.com'
app.config['MAIL_PASSWORD'] = 'nzeudxvcyfoeiqzb'
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USE_TLS'] = False

mail = Mail(app)


appConf = {
    "OAUTH2_CLIENT_ID": "1002415781087-d1a74175n9vk48ehrir794qghma573qi.apps.googleusercontent.com",
    "OAUTH2_CLIENT_SECRET": "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",
    "OAUTH2_META_URL": "https://accounts.google.com/.well-known/openid-configuration",
    "FLASK_SECRET": "647b1138-40f2-4022-8261-f447e62e7572",
    "FLASK_PORT": 1337
}

oauth.register("myweb",
            client_id=appConf.get("OAUTH2_CLIENT_ID"),
            client_secret=appConf.get("OAUTH2_CLIENT_SECRET"),
            server_metadata_url=appConf.get("OAUTH2_META_URL"),
            client_kwargs={"scope": "openid profile email https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/user.gender.read"},
    )



SECRET_KEY = token_bytes(16).hex()
passwd = "Flask<123456789"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
#f"mysql+pymysql://flask:{passwd}@localhost:3306/Users?charset=utf8mb4"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key = appConf.get("FLASK_SECRET")
db.init_app(app)
with app.app_context():
    db.create_all()

SECRET_KEY = token_bytes(16).hex()


def generate_jwt(user_gusername):
    return jwt.encode({"user": user_gusername},SECRET_KEY,algorithm='HS256')

def decode_jwt(jwt_auth):
    try:
        payload = jwt.decode(jwt_auth,SECRET_KEY,algorithms=['HS256'])
        return payload["user"]
    except jwt.InvalidTokenError:
        return "Error"



@app.route('/')
def welcome_admin():
    return redirect(url_for("login"))

@app.route('/<name>')
def welcome_user(name):
    return render_template("index.html",ip_add=request.remote_addr)


@app.route('/success', methods=["POST","GET"])
def show_user():
    user_email = None
    if "username" not in session:
        flash("YoU havEn'T loggEd in, sUckEr")
        return redirect(url_for("logisn"))
    if request.method=="POST":
        user_email = request.form["email"]
        msg = Message("Hello", sender="noreply@demo.com",recipients=[user_email])
        msg.body = "You have been ricked rolled"
        #mail.connect()
        mail.send(msg)
        flash("YoU hAvE sUccEssFuLly sEnd tHe MaIL")
    my_username = session['username']
    auth = generate_jwt(my_username)
    if "user" in session:
        if request.method=="POST":
            user_email = request.form["email"]
            session["email"] = user_email
            flash("YoU hAvE sUccEssFuLly sUbmiTtEd tHe fOrm")
        else:
            if "email" in session:
                user_email = session["email"]
        return render_template("success.html",username=my_username,IP=request.remote_addr,email=user_email)
    else:
        flash("YoU havEn'T loggEd in, sUckEr")
        return redirect(url_for("login"))
    
@app.route('/login',methods=["POST","GET"])
def login():
    if request.method=="POST" and request.form["username"]!="" and request.form["password"]!="":
        user_name = request.form["username"]
        user_password = request.form["password"]
        user_password = hashlib.sha256(user_password.encode()).hexdigest()
        session["user"] = generate_jwt(user_name)
        session["username"] = user_name
        found_user = Login.query.filter_by(username=user_name, password=user_password).first()
        if found_user:

            flash("YOu haVe LoGin SUccEssFuLly")
            return redirect(url_for('show_user'))
        else: 
            flash("WrOng UseRnamE or PasSworD")
            return render_template("login.html")
    else:
        if "user" in session and "username" in session:
            flash("YoU hAvE alREadY loGGed iN")
            return redirect(url_for("show_user"))
        else: 
            return render_template("login.html")

@app.route('/register',methods=["POST","GET"])
def register():
    if request.method == "POST":
        new_username = request.form["username"]
        new_password = request.form["password"]
        new_password = hashlib.sha256(new_password.encode()).hexdigest()
        found_user = Login.query.filter_by(username=new_username, password = new_password).first()
        print(found_user)
        if found_user:
            flash("ThE usErnamE alrEadY exiSts")
            return render_template("register.html")
        else:
            new_user = Login(new_username,new_password)
            db.session.add(new_user)
            db.session.commit()
            flash("YoU haVe sUccEssFuLly rEgisterEd")
            return redirect(url_for("login"))
    return render_template("register.html")

@app.route('/logout')
def logout():
    if "user" in session and "username" in session:
        flash(f"You have logged out successfully {session['username']}","info")
    session.pop("user",None)
    return redirect(url_for("login"))

@app.route('/google_login')
def login_google():
    return oauth.myweb.authorize_redirect(url_for('authorize', _external=True))



@app.route('/authorize')
def authorize():
    token = oauth.myweb.authorize_access_token()
    session['user'] = token
    return redirect(url_for('login_by_google'))

@app.route('/google/success')
def login_by_google():
    return render_template("success.html",session = session.get('user'),pretty = json.dumps(session.get('user'),indent=4))


