from flask import Blueprint, request, jsonify, redirect, url_for, render_template, session, flash, current_app
from .model import Users, tododb, Teams, TeamGroupss, TeamTags, TeamTasks, User_Team
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


team = Blueprint('team', __name__, template_folder='../templates/', static_folder='../static/')



#Functions
def validate_user(user_id, team_id):
    team = Teams.query.filter_by(team_id=team_id).first()
    try:
        for i in team.users:
            if i.user_id == user_id:
                return True
        return False
    except Exception:
        return False

def datetime_to_string(user_date):
    result = datetime.datetime.strptime(user_date, '%Y-%m-%dT%H:%M')
    return result.strftime('%Y-%m-%d %H:%M:%S')

def expire_task(user_date):
    result = user_date
    if result < datetime.datetime.now():
        return True
    else:
        return False

#Endpoints

@team.route('/team', methods=['GET'])
@login_required
def waiting_page():
    return render_template('teamainpage.html')


@team.route('/teamJoinCreatePage.html', methods=['GET'])
@login_required
def team_join_create_page():
    return render_template('teamJoinCreatePage.html')

@team.route('/team/create', methods=['POST'])
@login_required
def create_team():
    data = request.get_json()
    curr_user = Users.query.get(current_user.get_id())
    new_team = Teams(team_id=data['team_id'], team_name=data['team_name'], team_description=data['team_description'], team_code=data['team_code'], admin_id=curr_user.user_id)
    tododb.session.add(new_team)
    tododb.session.commit()
    curr_user.TeamUser.append(new_team)
    tododb.session.commit()
    return jsonify({"message": "Team created successfully", "team_id": new_team.team_id}), 200

@team.route('/team/create/get', methods=['GET'])
@login_required
def get_team_create():
    curr_user = Users.query.get(current_user.get_id())
    team = Teams.query.filter_by(admin_id=curr_user.user_id).all()
    team_data = []
    for i in team:
        team_data.append({"team_id": i.team_id, "team_name": i.team_name, "team_description": i.team_description, "team_code": i.team_code, "user_id": current_user.get_id(), "admin_id": i.admin_id})
    return jsonify(team_data), 200


#Get last user team:
@team.route('/team/lastvisit', methods=['GET'])
@login_required
def get_last_team():
    curr_user = Users.query.get(current_user.get_id())
    last_visit_team = curr_user.last_join_team
    data = {
        "last_team": last_visit_team
    }
    return jsonify(data), 200


@team.route('/team/lastvisit', methods=['POST'])
@login_required
def set_last_team():
    data = request.get_json()
    curr_user = Users.query.get(current_user.get_id())
    curr_user.last_join_team = data['last_team']
    tododb.session.commit()
    return jsonify({"message": "Last team set successfully"}), 200



#Get team info
@team.route('/team/<teamid>/get_info', methods=['GET'])
@login_required
def get_team_info(teamid):
    team = Teams.query.filter_by(team_id=teamid).first()
    if team is None:
        return jsonify({"message": "Invalid team id"}), 400
    team_data = {"team_name": team.team_name, "team_description": team.team_description, "team_id": team.team_id, "team_code": team.team_code, "admin": team.admin_id }
    return jsonify(team_data), 200

#Get user list
@team.route('/team/<teamid>/user_list', methods=['GET'])
@login_required
def get_user_list(teamid):
    team = Teams.query.filter_by(team_id=teamid).first()
    if team is None:
        return jsonify({"message": "Invalid team id"}), 400
    user_list = team.users
    user_data = []
    for i in user_list:
        user = Users.query.filter_by(user_id=i.user_id).first()
        user_data.append({"userid": user.user_id, "name": user.name, "image": user.image})
    return jsonify(user_data), 200


@team.route('/team/<teamid>/edit', methods=['POST'])
@login_required
def edit_team(teamid):
    data = request.get_json()
    team = Teams.query.filter_by(team_id=teamid).first()
    if team is None:
        return jsonify({"message": "Invalid team id"}), 400
    if team.admin_id != current_user.get_id():
        return jsonify({"message": "You are not allowed to edit the team"}), 400
    team.team_name = data['team_name']
    team.team_description = data['team_description']
    tododb.session.commit()
    return jsonify({"message": "Team edited successfully"}), 200

@team.route('/team/<teamid>/kick/<userid>', methods=['POST'])
@login_required
def kick_user(teamid, userid):
    team = Teams.query.filter_by(team_id=teamid).first()
    user = Users.query.get(userid)
    if team.admin_id == current_user.get_id():
        user.TeamUser.remove(team)
        tododb.session.commit()
        return jsonify({"message": "User kicked successfully"}), 200
    return jsonify({"message": "You are not allowed to kick the user"}), 400


#Leave team endpoint
@team.route('/team/<teamid>/leave', methods=['POST'])
@login_required
def leave_team(teamid):
    team = Teams.query.filter_by(team_id=teamid).first()
    if team is None:
        return jsonify({"message": "Invalid team id"}), 400
    user = Users.query.get(current_user.get_id())
    if team.admin_id == user.user_id:
        return jsonify({"message": "You are the admin of the team"}), 400
    user.TeamUser.remove(team)
    tododb.session.commit()
    return jsonify({"message": "Left team successfully"}), 200

#Delete team endpoint
@team.route('/team/<teamid>/delete', methods=['POST'])
@login_required
def delete_team(teamid):
    team = Teams.query.filter_by(team_id=teamid).first()
    if team is None:
        return jsonify({"message": "Invalid team id"}), 400
    user = Users.query.get(current_user.get_id())
    if team.admin_id == user.user_id:
        tododb.session.delete(team)
        tododb.session.commit()
        return jsonify({"message": "Team deleted successfully"}), 200
    return jsonify({"message": "You are not allowed to delete the team"}), 400

#Joining team endpoint
@team.route('/team/join', methods=['POST'])
@login_required
def join_team():
    data = request.get_json()
    curr_user = Users.query.get(current_user.get_id())
    team = Teams.query.filter_by(team_code=data['team_code']).first()
    if team is None:
        return jsonify({"message": "Invalid team code"}), 400
    for user in team.users:
        if user.user_id == current_user.get_id():
            return jsonify({"message": "You are already in the team"}), 400
    curr_user.TeamUser.append(team)
    tododb.session.commit()
    session['team_id'] = team.team_id
    return jsonify({"message": "Joined team successfully", "team_id": team.team_id}), 200


@team.route('/team/join/get', methods=['GET'])
@login_required
def get_team():
    curr_user = Users.query.get(current_user.get_id())
    team = curr_user.TeamUser
    team_data = []
    for i in team:
        team_data.append({"team_id": i.team_id, "team_name": i.team_name, "team_description": i.team_description, "team_code": i.team_code, "user_id": current_user.get_id(), "admin_id": i.admin_id})
    return jsonify(team_data), 200



#Team section:

@team.route('/team/<teamid>/todo', methods=['GET'])
@login_required
def team_page(teamid):
    if validate_user(current_user.get_id(), teamid):
        return render_template('teamPage.html')
    return jsonify({"message": "You are not allowed here"}), 400


@team.route('/team/<teamid>/todo/create', methods=['POST'])
@login_required
def create_todo(teamid):
    if validate_user(current_user.get_id(), teamid):
        team = Teams.query.filter_by(team_id=teamid).first()
        if team.admin_id == current_user.get_id():
            data = request.get_json()
            deadline = datetime_to_string(data['deadline'])
            new_task = TeamTasks(task_id=data['taskId'], task_title=data['title'], task_description=data['description'], tag_id=data['tag'], author_id=current_user.get_id(), deadline=deadline, points=data['points'], isCompleted=data['isCompleted'], team_id= team.team_id)
            tododb.session.add(new_task)
            tododb.session.commit()
            return jsonify({'message': 'Task created successfully!'}), 200
        else:
            return jsonify({'message': 'You are not allowed to create task!'}), 400
    else:
        return jsonify({'message': 'You are not allowed here!'}), 400

@team.route('/team/<teamid>/todo/update', methods=['POST'])
@login_required
def update_todo(teamid):
    if validate_user(current_user.get_id(), teamid):
        team = Teams.query.filter_by(team_id=teamid).first()
        if team.admin_id == current_user.get_id():
            data = request.get_json()
            task = TeamTasks.query.filter_by(task_id=data['taskId'], author_id=current_user.get_id(), team_id=teamid).first()
            task.task_title = data['title']
            task.task_description = data['description']
            task.tag_id = data['tag']
            task.deadline = datetime_to_string(data['deadline'])
            task.points = data['points']
            task.isCompleted = data['isCompleted']
            tododb.session.commit()
            return jsonify({'message': 'Task updated successfully!'}), 200
        else:
            return jsonify({'message': 'You are not allowed to update task!'}), 400
    else:
        return jsonify({'message': 'You are not allowed here!'}), 400

@team.route('/team/<teamid>/todo/delete', methods=['POST'])
@login_required
def delete_todo(teamid):
    if validate_user(current_user.get_id(), teamid):
        team = Teams.query.filter_by(team_id=teamid).first()
        if team.admin_id == current_user.get_id():
            data = request.get_json()
            task = TeamTasks.query.filter_by(task_id=data['taskId'], author_id=current_user.get_id(), team_id = teamid).first()
            tododb.session.delete(task)
            tododb.session.commit()
            return jsonify({'message': 'Task deleted successfully!'}), 200
        else:
            return jsonify({'message': 'You are not allowed to update task!'}), 400
    else:
        return jsonify({'message': 'You are not allowed here!'}), 400


@team.route('/team/<teamid>/todo/get', methods=['GET'])
@login_required
def get_todo(teamid):
    if validate_user(current_user.get_id(), teamid):
        tasks = TeamTasks.query.filter_by(team_id=teamid).all()
        if tasks is None:
            return jsonify({'message': 'No tasks found!'}), 400
        task_list = []
        for task in tasks:
            task_list.append({'taskId': task.task_id, 'title': task.task_title, 'description': task.task_description, 'tag': task.tag_id, 'deadline': task.deadline.strftime('%Y-%m-%dT%H:%M'), 'points': task.points, 'isCompleted': task.isCompleted})
        return jsonify(task_list), 200

@team.route('/team/<teamid>/todo/completed/<id>', methods=['POST'])
def completed_todo(teamid,id):
    if validate_user(current_user.get_id(), teamid):
        task = TeamTasks.query.filter_by(task_id=id, team_id=teamid).first()
        if task is None:
            return jsonify({'message': 'Task not found!'}), 400
        get_points = task.points
        if task.isCompleted == True:
            return jsonify({'message': 'Task already completed!'}), 400
        task.isCompleted = True
        if expire_task(task.deadline) == True:
            get_points = 0
        task.completed_user = current_user.get_id()
        tododb.session.commit()
        update_points = Users.query.filter_by(user_id=current_user.get_id()).first()      
        if update_points.points is None:
            update_points.points = get_points
        else:
            update_points.points = update_points.points + get_points
        tododb.session.commit()
        return jsonify({'message': 'Task completed successfully!'}), 200

@team.route('/team/<teamid>/todo/uncompleted/<id>', methods=['POST'])
def uncompleted_todo(teamid,id):
    task = TeamTasks.query.filter_by(task_id=id, team_id = teamid).first()
    if task is None:
        return jsonify({'message': 'Task not found!'}), 400
    task.isCompleted = False
    task.points = 0
    tododb.session.commit()
    return jsonify({'message': 'Task uncompleted successfully!'}), 200

#Groups and Tags

@team.route('/team/<teamid>/todo/group/create', methods=['POST'])
@login_required
def create_group(teamid):
    if validate_user(current_user.get_id(), teamid):
        team = Teams.query.filter_by(team_id=teamid).first()
        if team.admin_id == current_user.get_id():
            data = request.get_json()
            new_group = TeamGroupss(group_id=data['groupId'], group_title=data['title'], author_id=current_user.get_id(), color=data['color'] , def_tag = data['def_tag'], team_id=team.team_id)
            tododb.session.add(new_group)
            tododb.session.commit()
            return jsonify({'message': 'Group created successfully!'}), 200
        else:
            return jsonify({'message': 'You are not allowed to create group!'}), 400
    else:
        return jsonify({'message': 'You are not allowed here!'}), 400

@team.route('/team/<teamid>/todo/group/update', methods=['POST'])
@login_required
def update_group(teamid):
    if validate_user(current_user.get_id(), teamid):
        team = Teams.query.filter_by(team_id=teamid).first()
        if team.admin_id == current_user.get_id():
            data = request.get_json()
            group = TeamGroupss.query.filter_by(group_id=data['groupId'], author_id=current_user.get_id(), team_id=teamid).first()
            group.group_title = data['title']
            group.color = data['color']
            group.def_tag = data['def_tag']
            tododb.session.commit()
            return jsonify({'message': 'Group updated successfully!'}), 200
        else:
            return jsonify({'message': 'You are not allowed to update group!'}), 400
    else:
        return jsonify({'message': 'You are not allowed here!'}), 400

@team.route('/team/<teamid>/todo/group/delete', methods=['POST'])
@login_required
def delete_group(teamid):
    if validate_user(current_user.get_id(), teamid):
        team = Teams.query.filter_by(team_id=teamid).first()
        if team.admin_id == current_user.get_id():
            data = request.get_json()
            group = TeamGroupss.query.filter_by(group_id=data['groupId'], author_id=current_user.get_id(), team_id=teamid).first()
            tododb.session.delete(group)
            tododb.session.commit()
            return jsonify({'message': 'Group deleted successfully!'}), 200
        else:
            return jsonify({'message': 'You are not allowed to delete group!'}), 400
    else:
        return jsonify({'message': 'You are not allowed here!'}), 400

@team.route('/team/<teamid>/todo/group/get', methods=['GET'])
@login_required
def get_groups(teamid):
    if validate_user(current_user.get_id(), teamid):
        groups = TeamGroupss.query.filter_by(team_id=teamid).all()
        if groups is None:
            return jsonify({'message': 'No groups found!'}), 400
        group_list = []
        for group in groups:
            group_list.append({'groupId': group.group_id, 'title': group.group_title, 'color': group.color , 'def_tag':group.def_tag})
        return jsonify(group_list), 200

@team.route('/team/<teamid>/todo/tag/create', methods=['POST'])
@login_required
def create_tag(teamid):
    if validate_user(current_user.get_id(), teamid):
        team = Teams.query.filter_by(team_id=teamid).first()
        if team.admin_id == current_user.get_id():
            data = request.get_json()
            new_tag = TeamTags(tag_id=data['tagId'], tag_title=data['title'], tag_color=data['color'], author_id=current_user.get_id(), group_id=data['groupId'], team_id=data['team_id'])
            tododb.session.add(new_tag)
            tododb.session.commit()
            return jsonify({'message': 'Tag created successfully!'}), 200
        else:
            return jsonify({'message': 'You are not allowed to create tag!'}), 400
    else:
        return jsonify({'message': 'You are not allowed here!'}), 400

@team.route('/team/<teamid>/todo/tag/update', methods=['POST'])
@login_required
def update_tag(teamid):
    if validate_user(current_user.get_id(), teamid):
        team = Teams.query.filter_by(team_id=teamid).first()
        if team.admin_id == current_user.get_id():
            data = request.get_json()
            tag = TeamTags.query.filter_by(tag_id=data['tagId'], author_id=current_user.get_id(), team_id=teamid).first()
            tag.tag_title = data['title']
            tag.tag_color = data['color']
            tag.group_id = data['groupId']
            tododb.session.commit()
            return jsonify({'message': 'Tag updated successfully!'}), 200
        else:
            return jsonify({'message': 'You are not allowed to update tag!'}), 400
    else:
        return jsonify({'message': 'You are not allowed here!'}), 400

@team.route('/team/<teamid>/todo/tag/delete', methods=['POST'])
@login_required
def delete_tag(teamid):
    if validate_user(current_user.get_id(), teamid):
        team = Teams.query.filter_by(team_id=teamid).first()
        if team.admin_id == current_user.get_id():
            data = request.get_json()
            tag = TeamTags.query.filter_by(tag_id=data['tagId'], user_id=current_user.get_id(), team_id=teamid).first()
            tododb.session.delete(tag)
            tododb.session.commit()
            return jsonify({'message': 'Tag deleted successfully!'}), 200
        else:
            return jsonify({'message': 'You are not allowed to delete tag!'}), 400
    else:
        return jsonify({'message': 'You are not allowed here!'}), 400

@team.route('/team/<teamid>/todo/tag/get', methods=['GET'])
@login_required
def get_tags(teamid):
    if validate_user(current_user.get_id(), teamid):
        tags = TeamTags.query.filter_by(team_id=teamid).all()
        if tags is None:
            return jsonify({'message': 'No tags found!'}), 400
        tag_list = []
        for tag in tags:
            tag_list.append({'tagId': tag.tag_id, 'title': tag.tag_title, 'color': tag.tag_color, 'groupId': tag.group_id})
        return jsonify(tag_list), 200


