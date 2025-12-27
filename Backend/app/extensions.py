from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_migrate import Migrate

db = SQLAlchemy()
login_manager = LoginManager()
migrate = Migrate()

login_manager.login_view = "auth.login"


@login_manager.user_loader
def load_user(user_id):
    from app.db_models.user import User
    return User.query.get(int(user_id))
