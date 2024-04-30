from flask import Flask, redirect, url_for,render_template,Blueprint
from flask_login import login_required

calendars = Blueprint('calendar', __name__, static_folder='../static/', template_folder='../templates/')



@calendars.route('/calendar',methods=['GET'])
@login_required
def calendar():
    return render_template('calendarPage.html')


@calendars.route('/calendarTest.html', methods=['GET'])
@login_required
def calendar_test():
    return render_template('calendarTest.html')
