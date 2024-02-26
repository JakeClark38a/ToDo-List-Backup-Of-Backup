from flask import Blueprint, render_template, url_for, request, redirect, session
from secrets import token_bytes
import jwt
bp = Blueprint("welcome",__name__)

SECRET_KEY = token_bytes(16).hex()


def generate_jwt(user_gmail):
    return jwt.encode({"user": user_gmail},SECRET_KEY,algorithm='HS256')

def decode_jwt(jwt_auth):
    try:
        payload = jwt.decode(jwt_auth,SECRET_KEY,algorithms=['HS256'])
        return payload["user"]
    except jwt.InvalidTokenError:
        return "Error"



@bp.route('/')
def welcome_admin():
    return render_template("index.html",ip_add=request.remote_addr)

@bp.route('/<name>')
def welcome_user(name):
    return render_template("index.html",ip_add=request.remote_addr)


@bp.route('/success/<my_username>')
def show_user(my_username):
    auth = generate_jwt(my_username)
    try:
        if auth in session["user"] and my_username in session["mail"]:
            return render_template("success.html",username=my_username,IP=request.remote_addr)
        else:
            return redirect(url_for("welcome.login"))
    except:
        return redirect(url_for("welcome.login"))

@bp.route('/login',methods=["POST","GET"])
def login():
    if request.method=="POST":
        user_gmail = request.form["usermail"]
        user_password = request.form["pass"]
        session["user"] = generate_jwt(user_gmail)
        session["mail"] = user_gmail
        return redirect(url_for('welcome.show_user',my_username=user_gmail))
    else:
        if "user" in session and "mail" in session:
            return redirect(url_for("welcome.show_user",my_username=session["mail"]))
        else: 
            return render_template("login.html")
        # except:
        #     return render_template("login.html")


@bp.route('/logout')
def logout():
    session.pop("user",None)
    return redirect(url_for("welcome.login"))

