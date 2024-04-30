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


def default_group(group_id,group_title,user_id, color):
    if not Groupss.query.filter_by(group_id=group_id, user_id=user_id).first():
        new_group = Groupss(group_id=group_id, group_title=group_title, user_id=user_id, color=color)
        tododb.session.add(new_group)
        tododb.session.commit()
    else:
        return

def default_tag(tag_id,group_id,tag_title,tag_color,user_id):
    if not Tags.query.filter_by(tag_id=tag_id, user_id=user_id).first():
        new_tag = Tags(tag_id=tag_id, tag_title=tag_title, tag_color=tag_color, user_id=user_id, group_id=group_id)
        tododb.session.add(new_tag)
        tododb.session.commit()
    else:
        return

#Endpoints

@todo.route('/todo', methods=['GET'])
@login_required
def main_page():
    curr_user = Users.query.get(current_user.get_id())
    if curr_user.isFillForm == False:
        default_group('gid001',"Do",curr_user.user_id,"#7aa5cf")
        default_group('gid002',"Delegate",curr_user.user_id,"#63c074")
        default_group('gid003',"Schedule",curr_user.user_id,"#ac7acf")
        default_group('gid004',"Delete",curr_user.user_id,"#c5e875")
        default_tag('tag1','gid001','tag1','#7aa5cf',curr_user.user_id)
        default_tag('tag2','gid002','tag2','#63c074',curr_user.user_id)
        default_tag('tag3','gid003','tag3','#ac7acf',curr_user.user_id)
        default_tag('tag4','gid004','tag4','#c5e875',curr_user.user_id)
        default_tag('tag5','gid001','tag5','#7aa5cf',curr_user.user_id)
        return redirect(url_for('profiles.profile', type=session['type']))
    else:
        default_group('gid001',"Do",curr_user.user_id,"#7aa5cf")
        default_group('gid002',"Delegate",curr_user.user_id,"#63c074")
        default_group('gid003',"Schedule",curr_user.user_id,"#ac7acf")
        default_group('gid004',"Delete",curr_user.user_id,"#c5e875")
        default_tag('tag1','gid001','tag1','#7aa5cf',curr_user.user_id)
        default_tag('tag2','gid002','tag2','#63c074',curr_user.user_id)
        default_tag('tag3','gid003','tag3','#ac7acf',curr_user.user_id)
        default_tag('tag4','gid004','tag4','#c5e875',curr_user.user_id)
        default_tag('tag5','gid001','tag5','#7aa5cf',curr_user.user_id)
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
    tododb.session.commit()
    return jsonify({'message': 'Task completed successfully!'}), 200

@todo.route('/todo/uncompleted/<id>', methods=['POST'])
def uncompleted_todo(id):
    task = Tasks.query.filter_by(task_id=id, user_id=current_user.get_id()).first()
    task.isCompleted = False
    tododb.session.commit()
    return jsonify({'message': 'Task uncompleted successfully!'}), 200

#Groups and Tags

@todo.route('/todo/group/create', methods=['POST'])
@login_required
def create_group():
    data = request.get_json()
    print(data)
    new_group = Groupss(group_id=data['groupId'], group_title=data['title'], user_id=current_user.get_id(), color=data['color'])
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
        group_list.append({'groupId': group.group_id, 'title': group.group_title, 'color': group.color})
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
