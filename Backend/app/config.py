import os


class Config:
    SECRET_KEY = "gearguard-secret"
    SQLALCHEMY_DATABASE_URI = "sqlite:///gearguard.db"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    UPLOAD_FOLDER = os.path.join(os.getcwd(), "uploads")
    MAX_CONTENT_LENGTH = 50 * 1024 * 1024  # 50 MB
