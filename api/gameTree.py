
from flask import Flask, redirect, url_for,render_template,Blueprint, jsonify, request
from .model import Users, Trees, tododb
from flask_login import login_user, logout_user, login_required, current_user
import uuid

game = Blueprint('game', __name__, static_folder='../static/', template_folder='../templates/')


@game.route('/tree')
@login_required
def treePage_init():
    return render_template('tree.html')


@game.route('/tree/get', methods=['GET'])
@login_required
def loadTree():
    curr_user = Users.query.filter_by(user_id=current_user.get_id()).first()
    tree = Trees.query.filter_by(user_id=curr_user.user_id).first()
    if tree is None:
        new_tree = Trees(user_id=curr_user.user_id, tree_id = uuid.uuid4().hex, treeStage=0, treeCount=0, lastAction="", wateringsLeft=0, fertilizationsLeft=0, autoOption=False, audioOption=True)
        tododb.session.add(new_tree)
        json_tree = {
            'tree_id': new_tree.tree_id,
            'treeStage': new_tree.treeStage,
            'treeCount': new_tree.treeCount,
            'lastAction': new_tree.lastAction,
            'wateringsLeft': new_tree.wateringsLeft,
            'fertilizationsLeft': new_tree.fertilizationsLeft,
            'autoOption': new_tree.autoOption,
            'audioOption': new_tree.audioOption,
            'coins': curr_user.points
        }
        return jsonify(json_tree), 200
    else:
        json_tree = {
            'tree_id': new_tree.tree_id,
            'treeStage': new_tree.treeStage,
            'treeCount': new_tree.treeCount,
            'lastAction': new_tree.lastAction,
            'wateringsLeft': new_tree.wateringsLeft,
            'fertilizationsLeft': new_tree.fertilizationsLeft,
            'autoOption': new_tree.autoOption,
            'audioOption': new_tree.audioOption,
            'coins': curr_user.points
        }
        return jsonify(json_tree), 200
    

@game.route('/tree/update', methods=['POST'])
@login_required
def updateTree():
    curr_user = Users.query.filter_by(user_id=current_user.get_id()).first()
    tree = Trees.query.filter_by(user_id=curr_user.user_id).first()
    if tree is None:
        return jsonify({'error': 'tree not found'}), 404
    else:
        data = request.get_json()
        tree.treeStage = data['treeStage']
        tree.treeCount = data['treeCount']
        tree.lastAction = data['lastAction']
        tree.wateringsLeft = data['wateringsLeft']
        tree.fertilizationsLeft = data['fertilizationsLeft']
        tree.autoOption = data['autoOption']
        tree.audioOption = data['audioOption']
        curr_user.points = data['coins']
        tododb.session.commit()
        return jsonify({'message': 'tree updated'}), 200