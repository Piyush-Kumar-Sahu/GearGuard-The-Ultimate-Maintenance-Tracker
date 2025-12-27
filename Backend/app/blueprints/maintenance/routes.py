from flask import Blueprint, render_template
from app.db_models.maintenance import MaintenanceRequest

maintenance_bp = Blueprint("maintenance", __name__)

@maintenance_bp.route("/kanban")
def kanban():
    requests = MaintenanceRequest.query.all()
    return render_template("kanban.html", requests=requests)
