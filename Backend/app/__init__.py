from flask import Flask
from .config import Config
from .extensions import db, login_manager, migrate
from app.db_models.media import MediaFile
from app.blueprints.media.routes import media_bp
from app.blueprints.auth.routes import auth_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    login_manager.init_app(app)
    migrate.init_app(app, db)

    # 🔥 IMPORT MODELS (CRITICAL)
    from app.db_models.user import User
    from app.db_models.equipment import Equipment
    from app.db_models.maintenance import MaintenanceRequest

    # Register blueprints
    from app.blueprints.maintenance.routes import maintenance_bp
    from app.blueprints.dashboard.routes import dashboard_bp

    app.register_blueprint(maintenance_bp)
    app.register_blueprint(dashboard_bp)
    app.register_blueprint(media_bp)
    app.register_blueprint(auth_bp)

    return app
