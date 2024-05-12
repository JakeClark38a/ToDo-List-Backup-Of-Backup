
#SQL config
SQLALCHEMY_DATABASE_URI='mysql+pymysql://todolist:Todolist<123456789@localhost/todolist'
#'mysql+pymysql://todolist:Todolist<123456789@localhost/todolist'
#'mysql+pymysql://todolist:Todolist<123456789@todolist-database-do-user-16128636-0.c.db.ondigitalocean.com:25060/todolist'
SQLALCHEMY_TRACK_MODIFICATIONS = False
##Mail config
MAIL_SERVER = 'smtp.gmail.com'
#'live.smtp.mailtrap.io'
#'smtp.gmail.com'
MAIL_PORT = 465
#587
#465
MAIL_USERNAME= 'listtodo012@gmail.com'
#'api'
#'listtodo012@gmail.com'
MAIL_PASSWORD = 'mbryfkhizpbantuk'
#'34dffc615ed3faceecabe2924f23206a'
#'mbryfkhizpbantuk'
#'nzeudxvcyfoeiqzb'
MAIL_USE_SSL = True
MAIL_USE_TLS = False
UPLOAD_FOLDER = 'static/upload'
