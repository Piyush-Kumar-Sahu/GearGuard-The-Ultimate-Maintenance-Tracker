from app.extensions import db
from datetime import datetime

class MaintenanceRequest(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    subject = db.Column(db.String(200))
    status = db.Column(db.String(20), default="NEW")
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    media_files = db.relationship(
        "MediaFile",
        backref="maintenance_request",
        lazy=True
    )   