from flask import Blueprint, request, jsonify, redirect, url_for, render_template, session, flash
from .model import Users, tododb, Groupss, Tags, Tasks
from flask_login import login_user, logout_user, login_required, current_user
from flask_mail import Mail, Message
from flask_bcrypt import Bcrypt
from password_strength import PasswordPolicy
import pyotp, datetime
from itsdangerous import URLSafeTimedSerializer
from secrets import token_bytes
from authlib.integrations.flask_client import OAuth
from authlib.common.security import generate_token
import uuid


todo = Blueprint('todo', __name__, static_folder='../static/', template_folder='../templates/')


#Functions

def datetime_to_string(user_date):
    result = datetime.datetime.strptime(user_date, '%Y-%m-%dT%H:%M')
    return result.strftime('%Y-%m-%d %H:%M:%S')

def expire_task(userdate):
    result = userdate
    if result < datetime.datetime.now():
        return True
    else:
        return False

def default_group(group_id,group_title,user_id, color):
    if not Groupss.query.filter_by(group_id=group_id).first():
        new_group = Groupss(group_id=group_id, group_title=group_title, user_id=user_id, color=color)
        tododb.session.add(new_group)
        tododb.session.commit()
    else:
        return

def default_tag(tag_id,group_id,tag_title,tag_color,user_id):
    if not Tags.query.filter_by(tag_id=tag_id).first():
        new_tag = Tags(tag_id=tag_id, tag_title=tag_title, tag_color=tag_color, user_id=user_id, group_id=group_id)
        tododb.session.add(new_tag)
        tododb.session.commit()
    else:
        return

def default_task(task_id,task_title,task_description,tag_id,user_id,deadline,points,isCompleted):
    if not Tasks.query.filter_by(task_id=task_id, user_id=user_id).first():
        new_task = Tasks(task_id=task_id, task_title=task_title, task_description=task_description, tag_id=tag_id, user_id=user_id, deadline=deadline, points=points, isCompleted=isCompleted)
        tododb.session.add(new_task)
        tododb.session.commit()
    else:
        return

#Endpoints

@todo.route('/todo', methods=['GET'])
@login_required
def main_page():
    curr_user = Users.query.get(current_user.get_id())
    if curr_user.isFillForm == False:
        g1 = uuid.uuid4().hex
        g2 = uuid.uuid4().hex
        g3 = uuid.uuid4().hex
        g4 = uuid.uuid4().hex
        t1 = uuid.uuid4().hex
        default_group(g1,"Do",curr_user.user_id,"#7aa5cf")
        default_group(g2,"Delegate",curr_user.user_id,"#63c074")
        default_group(g3,"Schedule",curr_user.user_id,"#ac7acf")
        default_group(g4,"Delete",curr_user.user_id,"#c5e875")
        default_tag(t1 ,g1,'Be more organize','#7aa5cf',curr_user.user_id)
        default_tag(uuid.uuid4(),g2,'This is a tag','#63c074',curr_user.user_id)
        default_tag(uuid.uuid4(),g3,'You can rename it','#ac7acf',curr_user.user_id)
        default_tag(uuid.uuid4(),g4,'Change color','#c5e875',curr_user.user_id)
        default_tag(uuid.uuid4(),g1,'Or delete it','#7aa5cf',curr_user.user_id)
        default_task(uuid.uuid4(),'Darkmode is availble','Our darkmode is rolling out now!',t1,curr_user.user_id,datetime.datetime.now(),10,False)
        return redirect(url_for('profiles.profile', type=session['type']))
    else:
        return render_template('mainPage.html')
    
@todo.route('/todo/create', methods=['POST'])
@login_required
def create_todo():
    data = request.get_json()
    deadline = datetime_to_string(data['deadline'])
    new_task = Tasks(task_id=data['taskId'], task_title=data['title'], task_description=data['description'], tag_id=data['tag'], user_id=current_user.get_id(), deadline=deadline, points=data['points'], isCompleted=data['isCompleted'])
    tododb.session.add(new_task)
    tododb.session.commit()
    return jsonify({'message': 'Task created successfully!'}), 200

@todo.route('/todo/update', methods=['POST'])
@login_required
def update_todo():
    data = request.get_json()
    task = Tasks.query.filter_by(task_id=data['taskId'], user_id=current_user.get_id()).first()
    task.task_title = data['title']
    task.task_description = data['description']
    task.tag_id = data['tag']
    task.deadline = datetime_to_string(data['deadline'])
    task.points = data['points']
    task.isCompleted = data['isCompleted']
    tododb.session.commit()
    return jsonify({'message': 'Task updated successfully!'}), 200

@todo.route('/todo/delete', methods=['POST'])
@login_required
def delete_todo():
    data = request.get_json()
    task = Tasks.query.filter_by(task_id=data['taskId'], user_id=current_user.get_id()).first()
    tododb.session.delete(task)
    tododb.session.commit()
    return jsonify({'message': 'Task deleted successfully!'}), 200

@todo.route('/todo/get', methods=['GET'])
@login_required
def get_todo():
    tasks = Tasks.query.filter_by(user_id=current_user.get_id()).all()
    task_list = []
    for task in tasks:
        task_list.append({'taskId': task.task_id, 'title': task.task_title, 'description': task.task_description, 'tag': task.tag_id, 'deadline': task.deadline.strftime('%Y-%m-%dT%H:%M'), 'points': task.points, 'isCompleted': task.isCompleted})
    return jsonify(task_list), 200

@todo.route('/todo/completed/<id>', methods=['POST'])
def completed_todo(id):
    task = Tasks.query.filter_by(task_id=id, user_id=current_user.get_id()).first()
    task.isCompleted = True
    if expire_task(task.deadline) == True:
        task.points = 0
    tododb.session.commit()
    update_points = Users.query.filter_by(user_id=current_user.get_id()).first()
    if (update_points.points == None):
        update_points.points = task.points
    else:
        update_points.points += task.points
    tododb.session.commit()
    return jsonify({'message': 'Task completed successfully!'}), 200

@todo.route('/todo/uncompleted/<id>', methods=['POST'])
def uncompleted_todo(id):
    task = Tasks.query.filter_by(task_id=id, user_id=current_user.get_id()).first()
    task.isCompleted = False
    task.points = 0
    tododb.session.commit()
    return jsonify({'message': 'Task uncompleted successfully!'}), 200

#Groups and Tags

@todo.route('/todo/group/create', methods=['POST'])
@login_required
def create_group():
    data = request.get_json()
    print(data)
    new_group = Groupss(group_id=data['groupId'], group_title=data['title'], user_id=current_user.get_id(), color=data['color'] , def_tag = data['def_tag'])
    tododb.session.add(new_group)
    tododb.session.commit()
    return jsonify({'message': 'Group created successfully!'}), 200

@todo.route('/todo/group/update', methods=['POST'])
@login_required
def update_group():
    data = request.get_json()
    group = Groupss.query.filter_by(group_id=data['groupId'], user_id=current_user.get_id()).first()
    group.group_title = data['title']
    group.color = data['color']
    # print("Def_tag bf:"+ group.def_tag)
    group.def_tag = data['def_tag']
    # print("Def_tag: " + data['def_tag'])
    tododb.session.commit()
    return jsonify({'message': 'Group updated successfully!'}), 200

@todo.route('/todo/group/delete', methods=['POST'])
@login_required
def delete_group():
    data = request.get_json()
    group = Groupss.query.filter_by(group_id=data['groupId'], user_id=current_user.get_id()).first()
    tododb.session.delete(group)
    tododb.session.commit()
    return jsonify({'message': 'Group deleted successfully!'}), 200

@todo.route('/todo/group/get', methods=['GET'])
@login_required
def get_groups():
    groups = Groupss.query.filter_by(user_id=current_user.get_id()).all()
    group_list = []
    for group in groups:
        group_list.append({'groupId': group.group_id, 'title': group.group_title, 'color': group.color , 'def_tag':group.def_tag})
    return jsonify(group_list), 200

@todo.route('/todo/tag/create', methods=['POST'])
@login_required
def create_tag():
    data = request.get_json()
    new_tag = Tags(tag_id=data['tagId'], tag_title=data['title'], tag_color=data['color'], user_id=current_user.get_id(), group_id=data['groupId'])
    tododb.session.add(new_tag)
    tododb.session.commit()
    return jsonify({'message': 'Tag created successfully!'}), 200

@todo.route('/todo/tag/update', methods=['POST'])
@login_required
def update_tag():
    data = request.get_json()
    tag = Tags.query.filter_by(tag_id=data['tagId'], user_id=current_user.get_id()).first()
    tag.tag_title = data['title']
    tag.tag_color = data['color']
    tag.group_id = data['groupId']
    tododb.session.commit()
    return jsonify({'message': 'Tag updated successfully!'}), 200

@todo.route('/todo/tag/delete', methods=['POST'])
@login_required
def delete_tag():
    data = request.get_json()
    tag = Tags.query.filter_by(tag_id=data['tagId'], user_id=current_user.get_id()).first()
    tododb.session.delete(tag)
    tododb.session.commit()
    return jsonify({'message': 'Tag deleted successfully!'}), 200

@todo.route('/todo/tag/get', methods=['GET'])
@login_required
def get_tags():
    tags = Tags.query.filter_by(user_id=current_user.get_id()).all()
    tag_list = []
    for tag in tags:
        tag_list.append({'tagId': tag.tag_id, 'title': tag.tag_title, 'color': tag.tag_color, 'groupId': tag.group_id})
    return jsonify(tag_list), 200
