from flask import Flask, redirect, url_for,render_template,Blueprint,session
calendar = Blueprint('calendar', __name__, static_folder='../static/', template_folder='../templates/')


@calendar.route('/calendar' , methods=['GET'])
def init():
    return render_template('calendarPage.html')

@calendar.route('/calendar.html', methods=['GET'])
def calendarPage():
    return render_template('calendar.html')