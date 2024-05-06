from api.main import create_app, socketio
app = create_app()

if __name__ == '__main__':
    # app.run(debug=True, ssl_context='adhoc')
    socketio.run(app, debug=True)


    

