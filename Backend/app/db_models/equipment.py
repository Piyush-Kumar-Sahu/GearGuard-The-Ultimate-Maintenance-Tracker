from app.extensions import db

class Equipment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120))
    serial_number = db.Column(db.String(100), unique=True)
    location = db.Column(db.String(100))
    department = db.Column(db.String(100))
    is_scrapped = db.Column(db.Boolean, default=False)
