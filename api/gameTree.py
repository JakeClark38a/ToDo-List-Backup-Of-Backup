
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
        new_tree = Trees(user_id=curr_user.user_id, tree_id=uuid.uuid4().hex, number=0, water=0, fert=0)
        json_tree = {
            'tree_id': new_tree.tree_id,
            'number': new_tree.number,
            'water': new_tree.water,
            'fert': new_tree.fert
        }
        return jsonify(json_tree), 200
    else:
        json_tree = {
            'tree_id': tree.tree_id,
            'number': tree.number,
            'water': tree.water,
            'fert': tree.fert
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
        tree.number = data['number']
        tree.water = data['water']
        tree.fert = data['fert']
        tododb.session.commit()
        return jsonify({'message': 'tree updated'}), 200