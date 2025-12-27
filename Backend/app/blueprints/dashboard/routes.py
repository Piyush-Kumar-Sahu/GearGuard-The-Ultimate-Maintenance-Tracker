from flask import Blueprint, render_template
from app.db_models.user import User
from app.db_models.equipment import Equipment
from app.db_models.maintenance import MaintenanceRequest

dashboard_bp = Blueprint("dashboard", __name__)

@dashboard_bp.route("/")
def home():
    users = User.query.all()
    equipment = Equipment.query.all()
    requests = MaintenanceRequest.query.all()

    return render_template(
        "dashboard.html",
        users=users,
        equipment=equipment,
        requests=requests
    )
