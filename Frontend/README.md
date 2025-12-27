# GearGuard Maintenance Tracker

A comprehensive maintenance tracking system built with Flask/Jinja2 for managing equipment and maintenance requests across your facility.

## 📋 Features

### Core Functionality
- **Equipment Management**: Track equipment with Name, Serial Number, Purchase Date, and Location
- **Smart Button**: Quick access to maintenance requests with live count badge
- **Kanban Board**: Visual workflow with columns: New | In Progress | Repaired | Scrap
- **Visual Alerts**: Overdue cards highlighted with prominent red strip
- **User Roles**: Toggle between Technician and Employee views
- **Dynamic Forms**: Conditional fields based on maintenance type (Corrective/Preventive)
- **Dark Mode**: CSS-only theme switcher with persistent preference
- **Location Map**: Leaflet.js integration for visualizing equipment locations

### Advanced Features
- Drag-and-drop Kanban cards with live status updates
- Auto-fill maintenance team and category from equipment selection
- Calendar view for scheduled maintenance
- Responsive design for mobile and desktop
- Touch support for mobile drag-and-drop

## 🗂️ Project Structure

```
/app
├── templates/
│   ├── base.html              # Base template with navbar & dark mode
│   ├── kanban.html            # Kanban board view
│   ├── equipment_detail.html  # Equipment management & request form
│   ├── calendar.html          # Maintenance calendar
│   └── map.html               # Equipment location map
├── static/
│   ├── css/
│   │   └── style.css          # Complete styling with dark mode
│   └── js/
│       ├── kanban.js          # Drag & drop functionality
│       └── equipment.js       # Auto-fill and form logic
└── routes.py                  # Flask routes with sample data
```

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Flask
- pip

### Installation

1. **Clone or download the project**
   ```bash
   cd gearguard-tracker
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install flask
   ```

4. **Create your Flask app** (app.py)
   ```python
   from flask import Flask
   from app import routes
   
   app = Flask(__name__)
   app.secret_key = 'your-secret-key-here'
   
   # Register routes
   app.add_url_rule('/', 'index', routes.index)
   app.add_url_rule('/kanban', 'kanban', routes.kanban)
   app.add_url_rule('/equipment', 'equipment_detail', routes.equipment_detail)
   app.add_url_rule('/calendar', 'calendar', routes.calendar)
   app.add_url_rule('/map', 'map', routes.map)
   app.add_url_rule('/equipment/add', 'add_equipment', routes.add_equipment, methods=['POST'])
   app.add_url_rule('/maintenance/submit', 'submit_maintenance_request', routes.submit_maintenance_request, methods=['POST'])
   app.add_url_rule('/api/maintenance/update-status', 'update_request_status', routes.update_request_status, methods=['POST'])
   
   if __name__ == '__main__':
       app.run(debug=True)
   ```

5. **Run the application**
   ```bash
   python app.py
   ```

6. **Open your browser**
   ```
   http://localhost:5000
   ```

## 📱 User Roles

### Technician View
- Full access to Kanban board with drag & drop
- View and manage all equipment
- Access to calendar and map
- Assign maintenance requests to technicians

### Employee View
- Submit maintenance requests only
- Limited visibility (no Kanban/Calendar access)
- Can view equipment list

**Toggle roles** using the role switcher in the navigation bar.

## 🎨 Dark Mode

Click the theme toggle button in the navbar to switch between light and dark modes. Your preference is saved to localStorage.

## 📊 Kanban Board

### Columns
1. **New** - Newly submitted requests
2. **In Progress** - Currently being worked on
3. **Repaired** - Completed repairs
4. **Scrap** - Equipment marked for disposal

### Card Features
- **Subject**: Brief description of the issue
- **Equipment Name**: The equipment requiring maintenance
- **Technician Avatar**: Assigned technician's initials
- **Priority Badge**: Visual priority indicator
- **Overdue Indicator**: Red strip for overdue items

### Drag & Drop
Simply drag cards between columns to update their status. The system automatically updates the backend.

## 📝 Maintenance Request Form

### Dynamic Fields
- **Corrective Maintenance**: Shows Priority field (Low/Medium/High)
- **Preventive Maintenance**: Shows Recurrence field (Weekly/Monthly/Quarterly/Annually)

### Auto-Fill
When you select equipment from the dropdown, the system automatically fills:
- Maintenance Team
- Category

## 🗺️ Location Map

The map uses **Leaflet.js** to display equipment locations across your facility.

### Marker Colors
- 🟢 **Green**: Operational
- 🟡 **Yellow**: Maintenance Required
- 🔴 **Red**: Out of Service
- ⚫ **Gray**: Unknown Status

Click on any marker to view equipment details.

## 🛠️ Backend Integration

### Database Models Needed

**Equipment Table:**
```python
- id (Primary Key)
- name
- serial_number
- purchase_date
- location
- status
- description
- maintenance_team
- category
- lat (latitude)
- lng (longitude)
```

**MaintenanceRequest Table:**
```python
- id (Primary Key)
- subject
- equipment_id (Foreign Key)
- maintenance_type ('corrective' or 'preventive')
- priority ('low', 'medium', 'high')
- recurrence ('weekly', 'monthly', 'quarterly', 'annually')
- status ('new', 'in-progress', 'repaired', 'scrap')
- description
- requested_date
- technician_id (Foreign Key)
- is_overdue (Boolean)
```

**Technician Table:**
```python
- id (Primary Key)
- name
- email
- department
```

### API Endpoints to Implement

```python
POST /equipment/add
POST /maintenance/submit
POST /api/maintenance/update-status
GET  /api/equipment/{id}
GET  /api/maintenance/{id}
```

## 🎯 Next Steps for Backend Team

1. **Database Setup**
   - Create SQLAlchemy models for Equipment, MaintenanceRequest, and Technician
   - Set up database migrations

2. **Replace Sample Data**
   - Connect routes to actual database queries
   - Remove SAMPLE_* constants from routes.py

3. **Authentication**
   - Implement user login/logout
   - Role-based access control
   - Session management

4. **API Endpoints**
   - Implement AJAX endpoints for Kanban drag & drop
   - Add validation and error handling

5. **File Uploads**
   - Add support for equipment photos
   - Maintenance request attachments

6. **Notifications**
   - Email notifications for new requests
   - Overdue reminders
   - Status change alerts

## 📸 Screenshots

*(Add screenshots here after deployment)*

## 🤝 Contributing

This is a frontend handoff to the backend team. The Jinja2 templates use placeholders like:
- `{% for req in requests %}`
- `{{ req.subject }}`
- `{{ equipment.name }}`

Replace these with your actual database queries and model attributes.

## 📄 License

Internal company project - All rights reserved.

## 👥 Contact

For questions about the frontend implementation, contact the Frontend Team.

---

**Built with ❤️ by Senior Frontend Engineer**
