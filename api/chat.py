from flask import Blueprint, request, jsonify, session
from flask_socketio import SocketIO, send, emit, join_room, leave_room
import json

socketio = SocketIO()
chat = Blueprint('chat', __name__, template_folder='../templates/', static_folder='../static/')

@socketio.on('connect')
def connect():
    print("Client connected successfully")


@socketio.on('join')
def join(message):
    emit('status', {'msg': 'SeaWind has entered the room.'}, broadcast=True)
    print("Client joined successfully")

@socketio.on('text')
def text(message):
    receive = json.dumps(message)
    print(receive)
    #print(message['msg'])
    #send({'msg': 'SeaWind' + ': ' + message['msg'] }, broadcast=True)
    emit('message', {'msg': 'SeaWind' + ': ' + message['msg'] }, broadcast=True)

@socketio.on('leave')
def leave(message):
    emit('status', {'msg': 'SeaWind' + ' has left the room.'})
    print("Client left successfully")

