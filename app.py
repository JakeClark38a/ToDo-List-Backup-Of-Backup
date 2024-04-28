from api.main import create_app

app = create_app()

@app.route('/calendar')
def calendar():
    return render_template('calendarPage.html')

@app.route('/calendar.html')
def calendarPage():
    return render_template('calendar.html')

@app.route('/treePage')
def treePage():
    return render_template('treePage.html')
if __name__ == '__main__':
    app.run(debug=True, ssl_context='adhoc')