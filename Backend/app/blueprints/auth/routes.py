from flask import Blueprint, render_template, request, redirect, url_for
from flask_login import login_user
from app.db_models.user import User
from app.extensions import db

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form.get("email")
        user = User.query.filter_by(email=email).first()
        if user:
            login_user(user)
            return redirect(url_for("dashboard.home"))

    return """
    <form method="post">
        <input name="email" placeholder="email">
        <button type="submit">Login</button>
    </form>
    """
