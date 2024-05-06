from flask import Flask, redirect, url_for,render_template,Blueprint
from flask_login import login_user, logout_user, login_required, current_user
calendar = Blueprint('calendar', __name__, static_folder='../static/', template_folder='../templates/')


@calendar.route('/calendar',methods=['GET'])
#@login_required
def calendar_page():
    return render_template('calendarNewPage.html')


@calendar.route('/calendarTest.html', methods=['GET'])
#@login_required
def calendar_test():
    return render_template('calendarTest.html')
