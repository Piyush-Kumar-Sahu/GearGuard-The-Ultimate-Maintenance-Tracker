import os
from flask import Blueprint, request, jsonify, current_app, send_from_directory
from werkzeug.utils import secure_filename

from app.extensions import db
from app.db_models.media import MediaFile
from app.db_models.maintenance import MaintenanceRequest

media_bp = Blueprint("media", __name__)

ALLOWED_EXTENSIONS = {"mp2", "mp3", "mp4"}


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


# ============================
# UPLOAD MEDIA API
# ============================
@media_bp.route("/api/upload-media/<int:request_id>", methods=["POST"])
def upload_media(request_id):
    """
    Upload audio/video file and attach it to a maintenance request.
    """

    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    if not allowed_file(file.filename):
        return jsonify({"error": "Unsupported file type"}), 400

    maintenance_request = MaintenanceRequest.query.get_or_404(request_id)

    filename = secure_filename(file.filename)
    ext = filename.rsplit(".", 1)[1].lower()

    subfolder = "audio" if ext in ["mp2", "mp3"] else "video"
    upload_root = current_app.config["UPLOAD_FOLDER"]
    save_dir = os.path.join(upload_root, subfolder)
    os.makedirs(save_dir, exist_ok=True)

    file_path = os.path.join(save_dir, filename)
    file.save(file_path)

    media = MediaFile(
        filename=filename,
        file_type=ext,
        file_path=file_path,
        maintenance_request_id=maintenance_request.id
    )

    db.session.add(media)
    db.session.commit()

    return jsonify({
        "message": "File uploaded successfully",
        "filename": filename,
        "type": ext
    }), 201


# ============================
# SERVE MEDIA FILES (PLAYBACK)
# ============================
@media_bp.route("/media/<path:filepath>")
def serve_media(filepath):
    """
    Serve uploaded media files (audio/video) to browser
    """
    upload_root = current_app.config["UPLOAD_FOLDER"]
    return send_from_directory(upload_root, filepath)
