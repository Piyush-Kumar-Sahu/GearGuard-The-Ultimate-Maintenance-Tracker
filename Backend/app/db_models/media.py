from app.extensions import db
from datetime import datetime

class MediaFile(db.Model):
    __tablename__ = "media_file"

    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(255), nullable=False)
    file_type = db.Column(db.String(10), nullable=False)  # mp2/mp3/mp4
    file_path = db.Column(db.String(255), nullable=False)

    maintenance_request_id = db.Column(
        db.Integer,
        db.ForeignKey("maintenance_request.id"),
        nullable=False
    )

    uploaded_at = db.Column(db.DateTime, default=datetime.utcnow)
