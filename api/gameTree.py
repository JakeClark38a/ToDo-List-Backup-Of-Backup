
from flask import Flask, redirect, url_for,render_template,Blueprint

game = Blueprint('game', __name__, static_folder='../static/', template_folder='../templates/')


@game.route('/tree')
def treePage_init():
    return render_template('tree.html')