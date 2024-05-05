from flask import Flask, redirect, url_for
from .model import tododb
from .authetication import auth, SECRET_KEY, mail, bcrypt, oauth
from .todo import todo
from .profile import profiles
from .team import team
from .calendar import calendar
from .gameTree import game
from .chat import chat, socketio
from flask_login import LoginManager
from secrets import token_bytes
from flask_migrate import Migrate


def create_app():
    app = Flask(__name__, template_folder='../templates/', static_folder='../static/')
    app.config.from_pyfile('config.py')
    #Database config
    app.secret_key = SECRET_KEY
    tododb.init_app(app)
    migrate = Migrate()
    migrate.init_app(app, tododb)

    #Bcrypt config
    bcrypt.init_app(app)

    #Login config
    login_manger = LoginManager()
    login_manger.init_app(app)

    from .model import Users
    @login_manger.user_loader
    def load_user(user_id):
        return Users.query.get(user_id)
    @login_manger.unauthorized_handler
    def unauthorized():
        return redirect(url_for('auth.index'))
    
    #OAuth config
    oauth.init_app(app)

    ##Mail config
    mail.init_app(app)

    #Chat config
    socketio.init_app(app, cors_allowed_origins="*")

    #Blueprints
    app.register_blueprint(auth)
    app.register_blueprint(todo)
    app.register_blueprint(profiles)
    app.register_blueprint(team)
    app.register_blueprint(calendar)
    app.register_blueprint(game)
    app.register_blueprint(chat)

    # with app.app_context():
    #     tododb.create_all()
    
    return app