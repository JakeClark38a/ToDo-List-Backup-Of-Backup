from flask import Flask, redirect, url_for,render_template,Blueprint

calendar = Blueprint('calendar', __name__, static_folder='../static/', template_folder='../templates/')


@calendar.route('/calendar',methods=['GET'])
def calendar_page():
    return render_template('calendarPage.html')


@calendar.route('/calendarTest.html', methods=['GET'])
def calendar_test():
    return render_template('calendarTest.html')
