from flask import Blueprint, render_template, url_for, request, redirect, session, flash
from secrets import token_bytes
import jwt
from .extensions import Login
from .extensions import db
bp = Blueprint("welcome",__name__)
SECRET_KEY = token_bytes(16).hex()


def generate_jwt(user_gusername):
    return jwt.encode({"user": user_gusername},SECRET_KEY,algorithm='HS256')

def decode_jwt(jwt_auth):
    try:
        payload = jwt.decode(jwt_auth,SECRET_KEY,algorithms=['HS256'])
        return payload["user"]
    except jwt.InvalidTokenError:
        return "Error"



@bp.route('/')
def welcome_admin():
    return redirect(url_for("welcome.login"))

@bp.route('/<name>')
def welcome_user(name):
    return render_template("index.html",ip_add=request.remote_addr)


@bp.route('/success', methods=["POST","GET"])
def show_user():
    user_email = None
    if "username" not in session:
        flash("YoU havEn'T loggEd in, sUckEr")
        return redirect(url_for("welcome.login"))
    my_username = session['username']
    auth = generate_jwt(my_username)
    if auth in session["user"]:
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
        return redirect(url_for("welcome.login"))
            
@bp.route('/register',methods=["POST","GET"])
def register():
    if request.method == "POST":
        new_username = request.form["username"]
        new_password = request.form["password"]
        found_user = Login.query.filter_by(username=new_username).first()
        print(found_user)
        if found_user:
            flash("ThE usErnamE alrEadY exiSts")
            return render_template("register.html")
        else:
            new_user = Login(new_username,new_password)
            db.session.add(new_user)
            db.session.commit()
            flash("YoU haVe sUccEssFuLly rEgisterEd")
            return redirect(url_for("welcome.login"))
    return render_template("register.html")






@bp.route('/login',methods=["POST","GET"])
def login():
    if request.method=="POST":
        user_name = request.form["username"]
        user_password = request.form["password"]
        session["user"] = generate_jwt(user_name)
        session["username"] = user_name

        found_user = Login.query.filter_by(username=user_name).first()
        if found_user and found_user.password == user_password:

            flash("YOu haVe LoGin SUccEssFuLly")
            return redirect(url_for('welcome.show_user'))
        else: 
            flash("WrOng UseRnamE or PasSworD")
            return render_template("login.html")
    else:
        if "user" in session and "username" in session:
            flash("YoU hAvE alREadY loGGed iN")
            return redirect(url_for("welcome.show_user"))
        else: 
            return render_template("login.html")
@bp.route('/logout')
def logout():
    if "user" in session and "username" in session:
        flash(f"You have logged out successfully {session['username']}","info")
    session.pop("user",None)
    return redirect(url_for("welcome.login"))

