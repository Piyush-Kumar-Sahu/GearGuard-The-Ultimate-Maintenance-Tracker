# ============================================
# GearGuard Maintenance Tracker - Flask Routes
# Backend Team: Fill in the database logic
# ============================================

from flask import render_template, request, redirect, url_for, jsonify
from datetime import datetime, timedelta

# ============================================
# Sample Data Structures (Replace with Database Models)
# ============================================

# Sample equipment data
SAMPLE_EQUIPMENT = [
    {
        'id': 1,
        'name': 'CNC Machine #5',
        'serial_number': 'SN-2024-001',
        'purchase_date': '2024-01-15',
        'location': 'Building A, Floor 2',
        'status': 'operational',
        'description': 'High-precision CNC machine',
        'maintenance_team': 'Mechanical Team',
        'category': 'Heavy Machinery',
        'lat': 40.7128,
        'lng': -74.0060
    },
    {
        'id': 2,
        'name': 'Hydraulic Press #3',
        'serial_number': 'SN-2024-002',
        'purchase_date': '2024-02-20',
        'location': 'Building B, Floor 1',
        'status': 'maintenance',
        'description': '500-ton hydraulic press',
        'maintenance_team': 'Hydraulic Team',
        'category': 'Press Equipment',
        'lat': 40.7138,
        'lng': -74.0070
    },
    {
        'id': 3,
        'name': 'Conveyor Belt System',
        'serial_number': 'SN-2024-003',
        'purchase_date': '2024-03-10',
        'location': 'Building A, Floor 1',
        'status': 'operational',
        'description': 'Main assembly line conveyor',
        'maintenance_team': 'Electrical Team',
        'category': 'Transport Systems',
        'lat': 40.7118,
        'lng': -74.0050
    }
]

# Sample maintenance requests
SAMPLE_REQUESTS = [
    {
        'id': 1,
        'subject': 'Oil leak detected',
        'equipment_name': 'CNC Machine #5',
        'equipment_id': 1,
        'maintenance_type': 'corrective',
        'priority': 'high',
        'status': 'new',
        'technician_name': 'John Smith',
        'technician_initials': 'JS',
        'is_overdue': True,
        'requested_date': '2025-12-20',
        'description': 'Hydraulic oil leak from main cylinder'
    },
    {
        'id': 2,
        'subject': 'Quarterly inspection',
        'equipment_name': 'Hydraulic Press #3',
        'equipment_id': 2,
        'maintenance_type': 'preventive',
        'priority': None,
        'recurrence': 'quarterly',
        'status': 'in-progress',
        'technician_name': 'Sarah Johnson',
        'technician_initials': 'SJ',
        'is_overdue': False,
        'requested_date': '2025-12-25',
        'description': 'Regular quarterly maintenance check'
    },
    {
        'id': 3,
        'subject': 'Belt replacement',
        'equipment_name': 'Conveyor Belt System',
        'equipment_id': 3,
        'maintenance_type': 'corrective',
        'priority': 'medium',
        'status': 'repaired',
        'technician_name': 'Mike Davis',
        'technician_initials': 'MD',
        'is_overdue': False,
        'requested_date': '2025-12-15',
        'description': 'Replace worn conveyor belt section'
    }
]

# Sample technicians
SAMPLE_TECHNICIANS = [
    {'id': 1, 'name': 'John Smith'},
    {'id': 2, 'name': 'Sarah Johnson'},
    {'id': 3, 'name': 'Mike Davis'},
    {'id': 4, 'name': 'Emily Chen'}
]

# ============================================
# Route: Home (Redirect to Kanban)
# ============================================
def index():
    """Home page - redirects to kanban board"""
    return redirect(url_for('kanban'))

# ============================================
# Route: Kanban Board
# ============================================
def kanban():
    """Display the Kanban board with maintenance requests"""
    # Backend: Fetch all maintenance requests from database
    # requests = MaintenanceRequest.query.all()
    
    return render_template('kanban.html', requests=SAMPLE_REQUESTS)

# ============================================
# Route: Equipment Detail
# ============================================
def equipment_detail():
    """Display equipment management page"""
    # Backend: Fetch equipment and maintenance requests from database
    # equipment_list = Equipment.query.all()
    # maintenance_requests = MaintenanceRequest.query.order_by(
    #     MaintenanceRequest.requested_date.desc()
    # ).limit(20).all()
    
    return render_template(
        'equipment_detail.html',
        equipment_list=SAMPLE_EQUIPMENT,
        maintenance_requests=SAMPLE_REQUESTS,
        technicians=SAMPLE_TECHNICIANS
    )

# ============================================
# Route: Calendar
# ============================================
def calendar():
    """Display maintenance calendar"""
    # Backend: Generate calendar data for current month
    # current_date = datetime.now()
    # calendar_days = generate_calendar_days(current_date)
    # upcoming_events = get_upcoming_maintenance(days=7)
    
    # Sample calendar days (December 2025)
    calendar_days = []
    current_month = 12
    current_year = 2025
    
    # Get first day of month and number of days
    first_day = datetime(current_year, current_month, 1)
    if current_month == 12:
        next_month = datetime(current_year + 1, 1, 1)
    else:
        next_month = datetime(current_year, current_month + 1, 1)
    
    num_days = (next_month - first_day).days
    start_weekday = first_day.weekday()
    
    # Add days from previous month
    for i in range(start_weekday):
        calendar_days.append({
            'day': '',
            'is_other_month': True,
            'is_today': False,
            'events': []
        })
    
    # Add days of current month
    today = datetime.now().day if datetime.now().month == current_month else -1
    
    for day in range(1, num_days + 1):
        events = []
        
        # Add sample events for specific days
        if day == 20:
            events.append({
                'id': 1,
                'subject': 'Oil leak repair',
                'type': 'corrective',
                'description': 'CNC Machine #5'
            })
        elif day == 25:
            events.append({
                'id': 2,
                'subject': 'Quarterly inspection',
                'type': 'preventive',
                'description': 'Hydraulic Press #3'
            })
        
        calendar_days.append({
            'day': day,
            'is_other_month': False,
            'is_today': day == today,
            'events': events
        })
    
    # Sample upcoming events
    upcoming_events = [
        {
            'date': '2025-12-28',
            'subject': 'Belt alignment check',
            'equipment_name': 'Conveyor Belt System',
            'maintenance_type': 'preventive',
            'technician_name': 'Mike Davis',
            'priority': None
        },
        {
            'date': '2025-12-30',
            'subject': 'Emergency repair',
            'equipment_name': 'CNC Machine #5',
            'maintenance_type': 'corrective',
            'technician_name': 'John Smith',
            'priority': 'high'
        }
    ]
    
    return render_template(
        'calendar.html',
        calendar_days=calendar_days,
        upcoming_events=upcoming_events
    )

# ============================================
# Route: Location Map
# ============================================
def map():
    """Display equipment location map"""
    # Backend: Fetch equipment with location coordinates
    # equipment_locations = Equipment.query.filter(
    #     Equipment.lat.isnot(None),
    #     Equipment.lng.isnot(None)
    # ).all()
    
    return render_template(
        'map.html',
        equipment_locations=SAMPLE_EQUIPMENT
    )

# ============================================
# Route: Add Equipment (POST)
# ============================================
def add_equipment():
    """Handle equipment creation"""
    if request.method == 'POST':
        # Backend: Create new equipment record
        # equipment = Equipment(
        #     name=request.form.get('name'),
        #     serial_number=request.form.get('serial_number'),
        #     purchase_date=request.form.get('purchase_date'),
        #     location=request.form.get('location'),
        #     description=request.form.get('description')
        # )
        # db.session.add(equipment)
        # db.session.commit()
        
        print('Adding equipment:', request.form)
        return redirect(url_for('equipment_detail'))
    
    return redirect(url_for('equipment_detail'))

# ============================================
# Route: Submit Maintenance Request (POST)
# ============================================
def submit_maintenance_request():
    """Handle maintenance request submission"""
    if request.method == 'POST':
        # Backend: Create new maintenance request
        # request_obj = MaintenanceRequest(
        #     subject=request.form.get('subject'),
        #     equipment_id=request.form.get('equipment_id'),
        #     maintenance_type=request.form.get('maintenance_type'),
        #     priority=request.form.get('priority'),
        #     recurrence=request.form.get('recurrence'),
        #     description=request.form.get('description'),
        #     requested_date=request.form.get('requested_date'),
        #     technician_id=request.form.get('technician_id'),
        #     status='new'
        # )
        # db.session.add(request_obj)
        # db.session.commit()
        
        print('Submitting maintenance request:', request.form)
        return redirect(url_for('equipment_detail'))
    
    return redirect(url_for('equipment_detail'))

# ============================================
# API Route: Update Maintenance Request Status
# ============================================
def update_request_status():
    """API endpoint to update request status (for Kanban drag & drop)"""
    if request.method == 'POST':
        data = request.get_json()
        
        # Backend: Update request status in database
        # request_id = data.get('id')
        # new_status = data.get('status')
        # request_obj = MaintenanceRequest.query.get(request_id)
        # request_obj.status = new_status
        # db.session.commit()
        
        print('Updating request status:', data)
        
        return jsonify({
            'success': True,
            'message': 'Status updated successfully'
        })
    
    return jsonify({
        'success': False,
        'message': 'Invalid request method'
    }), 400

# ============================================
# Register Routes (Add to your Flask app)
# ============================================
"""
Example Flask app setup:

from flask import Flask
app = Flask(__name__)

app.add_url_rule('/', 'index', index)
app.add_url_rule('/kanban', 'kanban', kanban)
app.add_url_rule('/equipment', 'equipment_detail', equipment_detail)
app.add_url_rule('/calendar', 'calendar', calendar)
app.add_url_rule('/map', 'map', map)
app.add_url_rule('/equipment/add', 'add_equipment', add_equipment, methods=['POST'])
app.add_url_rule('/maintenance/submit', 'submit_maintenance_request', submit_maintenance_request, methods=['POST'])
app.add_url_rule('/api/maintenance/update-status', 'update_request_status', update_request_status, methods=['POST'])

if __name__ == '__main__':
    app.run(debug=True)
"""
