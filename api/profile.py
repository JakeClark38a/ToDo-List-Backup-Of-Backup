from flask import Blueprint, request, jsonify, redirect, url_for, render_template, session, flash, current_app
from .model import Users, tododb
from flask_login import login_user, logout_user, login_required, current_user
from flask_mail import Mail, Message
from flask_bcrypt import Bcrypt
from password_strength import PasswordPolicy
import pyotp, os, threading, base64
from itsdangerous import URLSafeTimedSerializer
from secrets import token_bytes
from authlib.integrations.flask_client import OAuth
from authlib.common.security import generate_token
from time import time


profiles = Blueprint('profiles', __name__, static_folder='../static/', template_folder='../templates/')

mail = Mail()
bcrypt = Bcrypt()

#Functions
def send_async_email(app, msg):
    with app.app_context():
        mail.send(msg)

key = pyotp.random_base32()
totp = pyotp.TOTP(key,digits=10,interval=600)
def generate_verify_otp(option, otp=None):
    if option == "generate":
        return totp.now()
    elif option == "verify":
        return totp.verify(otp)
    
policy = PasswordPolicy.from_names(strength=0.67)



#Endpoints
@profiles.route('/profile/<type>', methods=['GET'])
@login_required
def profile(type):
    curr_user = Users.query.get(current_user.get_id())
    return render_template('profilePage.html', type=session['type'])
    

@profiles.route('/profile/get',methods=['GET'])
@login_required
def get_profile():
    curr_user = Users.query.get(current_user.get_id())
    print(curr_user)
    json_data = {
        "username": curr_user.name,
        "bio": curr_user.bio,
        "Location": curr_user.location,
    }
    return jsonify(json_data), 200

@profiles.route('/profile/update',methods=['POST'])
@login_required
def update_profile():
    curr_user = Users.query.get(current_user.get_id())
    data = request.get_json()
    curr_user.name = data['username']
    curr_user.bio = data['bio']
    curr_user.location = data['Location']
    curr_user.isFillForm = True
    tododb.session.commit()
    return jsonify({"message":"Profile Updated"}), 200

@profiles.route('/profile/update/image',methods=['POST'])
@login_required
def update_image():
    curr_user = Users.query.get(current_user.get_id())
    response = request.get_json()
    file = response['avatar']
    starter = file.find(',')
    image_data = file[starter+1:]
    image_data = bytes(image_data, encoding='utf-8')
    file_path = url_for('profiles.static', filename=f'upload/{current_user.get_id()}.jpg')
    curr_user.image = file_path
    tododb.session.commit()
    with open(f"static/upload/{current_user.get_id()}.jpg", 'wb') as f:
        f.write(base64.decodebytes(image_data))
    return jsonify({"message":"Image Updated"}), 200


@profiles.route('/profile/get/image',methods=['GET'])
@login_required
def get_user_image():
    curr_user = Users.query.get(current_user.get_id())
    user_image = curr_user.image
    if user_image is None:
        return url_for('profiles.static', filename='images/profile.jpg')
    else:
        return user_image

@profiles.route('/profile/update/email_confirmation',methods=['POST'])
@login_required
def update_email_confirmation():
    curr_user = Users.query.get(current_user.get_id())
    data = request.get_json()
    curr_email = data['curr_email']
    msg = Message("Email Confirmation", sender="noreply@gmail.com", recipients=[curr_email])
    msg.html = f'Hello {curr_user.name}, \n\n Please confirm your change in email by using this OTP below: <b>{generate_verify_otp("generate")}</b>'
    apps = current_app._get_current_object()
    print(apps.config)
    thr = threading.Thread(target=send_async_email, args=[apps,msg])
    thr.start()
    return jsonify({"message":"Email Updated"}), 200

@profiles.route('/profile/update/email', methods=['POST'])
def update_email():
    data = request.get_json()
    curr_user = Users.query.get(current_user.get_id())
    new_email = data['new_email']
    otp = data['otp']
    verify_new_email = Users.query.filter_by(email=new_email).first()
    if verify_new_email is None and generate_verify_otp("verify", otp):
        curr_user.email = new_email
        tododb.session.commit()
        print("SUCCESS")
        return jsonify({"message":"Email Updated"}), 200
    else:
        print("FAILED")
        return jsonify({"message":"Email not Updated"}), 400
    
@profiles.route('/profile/update/password', methods=['POST'])
@login_required
def update_password():
    data = request.get_json()
    curr_user = Users.query.get(current_user.get_id())
    new_password = data['new_password']
    confirm_password = data['confirm_password']
    curr_password = data['curr_password']
    if policy.password(new_password).strength()> 0.67 and new_password == confirm_password and bcrypt.check_password_hash(curr_user.password, curr_password):
        return jsonify({"message":"Password Updated"}), 200
    else:
        return jsonify({"message":"Password not Updated"}), 400
    
        