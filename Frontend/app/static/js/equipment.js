// ============================================
// GearGuard - Equipment Management JavaScript
// ============================================

// ============================================
// Auto-Fill Equipment Data Function
// ============================================
function autoFillEquipmentData() {
    const equipmentSelect = document.getElementById('request-equipment');
    const selectedOption = equipmentSelect.options[equipmentSelect.selectedIndex];
    
    if (selectedOption.value) {
        // Get data attributes from the selected option
        const team = selectedOption.getAttribute('data-team') || 'Mechanical Team';
        const category = selectedOption.getAttribute('data-category') || 'General Maintenance';
        const location = selectedOption.getAttribute('data-location') || '';
        
        // Auto-fill the maintenance team and category fields
        document.getElementById('maintenance-team').value = team;
        document.getElementById('category').value = category;
        
        // Show a brief notification
        showAutoFillNotification(`Auto-filled: ${team} - ${category}`);
    } else {
        // Clear the fields if no equipment is selected
        document.getElementById('maintenance-team').value = '';
        document.getElementById('category').value = '';
    }
}

// ============================================
// Show Auto-Fill Notification
// ============================================
function showAutoFillNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'auto-fill-notification';
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 0.75rem 1.25rem;
        background-color: #0d6efd;
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideInUp 0.3s ease;
        font-size: 0.9rem;
    `;
    notification.textContent = '✓ ' + message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 2500);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            transform: translateY(100px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutDown {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(100px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// Toggle Maintenance Type Fields
// ============================================
function toggleMaintenanceFields() {
    const typeSelect = document.getElementById('request-type');
    const priorityField = document.getElementById('priority-field');
    const recurrenceField = document.getElementById('recurrence-field');
    const priorityInput = document.getElementById('request-priority');
    const recurrenceInput = document.getElementById('request-recurrence');
    
    if (typeSelect.value === 'corrective') {
        // Show Priority field for Corrective maintenance
        priorityField.style.display = 'block';
        recurrenceField.style.display = 'none';
        priorityInput.required = true;
        recurrenceInput.required = false;
        recurrenceInput.value = '';
        
        // Add animation
        priorityField.style.animation = 'fadeIn 0.3s ease';
    } else if (typeSelect.value === 'preventive') {
        // Show Recurrence field for Preventive maintenance
        priorityField.style.display = 'none';
        recurrenceField.style.display = 'block';
        priorityInput.required = false;
        recurrenceInput.required = true;
        priorityInput.value = '';
        
        // Add animation
        recurrenceField.style.animation = 'fadeIn 0.3s ease';
    } else {
        // Hide both fields if no type is selected
        priorityField.style.display = 'none';
        recurrenceField.style.display = 'none';
        priorityInput.required = false;
        recurrenceInput.required = false;
    }
}

// ============================================
// Scroll to Maintenance Form
// ============================================
function scrollToMaintenanceForm() {
    const formSection = document.getElementById('maintenance-form-section');
    
    if (formSection) {
        formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Add a subtle highlight animation
        const originalBg = window.getComputedStyle(formSection).backgroundColor;
        formSection.style.transition = 'background-color 0.5s ease';
        formSection.style.backgroundColor = 'rgba(13, 110, 253, 0.1)';
        
        setTimeout(() => {
            formSection.style.backgroundColor = originalBg;
        }, 1000);
    }
}

// ============================================
// Form Validation
// ============================================
function validateMaintenanceForm() {
    const form = document.getElementById('maintenance-request-form');
    
    if (!form) return true;
    
    const subject = document.getElementById('request-subject').value.trim();
    const equipment = document.getElementById('request-equipment').value;
    const type = document.getElementById('request-type').value;
    const description = document.getElementById('request-description').value.trim();
    
    if (!subject || !equipment || !type || !description) {
        alert('Please fill in all required fields.');
        return false;
    }
    
    // Additional validation for corrective/preventive specific fields
    if (type === 'corrective') {
        const priority = document.getElementById('request-priority').value;
        if (!priority) {
            alert('Please select a priority for corrective maintenance.');
            return false;
        }
    } else if (type === 'preventive') {
        const recurrence = document.getElementById('request-recurrence').value;
        if (!recurrence) {
            alert('Please select a recurrence for preventive maintenance.');
            return false;
        }
    }
    
    return true;
}

// ============================================
// Equipment Search & Filter
// ============================================
function searchEquipment(searchTerm) {
    const rows = document.querySelectorAll('.equipment-table tbody tr');
    
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm.toLowerCase())) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// ============================================
// Update Maintenance Request Count Badge
// ============================================
function updateMaintenanceCount() {
    const badge = document.getElementById('maintenance-count');
    const rows = document.querySelectorAll('.equipment-table tbody tr');
    
    if (badge) {
        badge.textContent = rows.length;
    }
}

// ============================================
// Initialize Equipment Page
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Update maintenance count on load
    updateMaintenanceCount();
    
    // Add form submission handler
    const form = document.getElementById('maintenance-request-form');
    if (form) {
        form.addEventListener('submit', function(event) {
            if (!validateMaintenanceForm()) {
                event.preventDefault();
                return false;
            }
            
            // Show loading state
            const submitButton = form.querySelector('button[type="submit"]');
            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = 'Submitting...';
            }
        });
    }
    
    // Set default date to today for requested date
    const requestedDateInput = document.getElementById('requested-date');
    if (requestedDateInput) {
        const today = new Date().toISOString().split('T')[0];
        requestedDateInput.value = today;
    }
    
    // Add click handlers to table rows for highlighting
    const tableRows = document.querySelectorAll('.equipment-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function(event) {
            // Only highlight if not clicking a button
            if (!event.target.classList.contains('btn')) {
                tableRows.forEach(r => r.style.backgroundColor = '');
                this.style.backgroundColor = 'var(--bg-tertiary)';
            }
        });
    });
});

// ============================================
// Export Equipment Data
// ============================================
function exportEquipmentData() {
    const rows = document.querySelectorAll('.equipment-table tbody tr');
    const data = [];
    
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        if (cells.length > 0) {
            data.push({
                name: cells[0].textContent,
                serialNumber: cells[1].textContent,
                purchaseDate: cells[2].textContent,
                location: cells[3].textContent,
                status: cells[4].textContent.trim()
            });
        }
    });
    
    console.log('Equipment data:', data);
    
    // In production, this would trigger a CSV or Excel download
    alert(`Exporting ${data.length} equipment records.\n\nIn production, this would download a CSV or Excel file.`);
    
    return data;
}

// ============================================
// Clear Form
// ============================================
function clearMaintenanceForm() {
    const form = document.getElementById('maintenance-request-form');
    if (form) {
        form.reset();
        
        // Reset dynamic fields visibility
        document.getElementById('priority-field').style.display = 'none';
        document.getElementById('recurrence-field').style.display = 'none';
        
        // Clear auto-filled fields
        document.getElementById('maintenance-team').value = '';
        document.getElementById('category').value = '';
        
        // Reset date to today
        const requestedDateInput = document.getElementById('requested-date');
        if (requestedDateInput) {
            const today = new Date().toISOString().split('T')[0];
            requestedDateInput.value = today;
        }
    }
}

// ============================================
// View Equipment Details
// ============================================
function viewEquipmentDetails(equipmentId) {
    console.log('Viewing equipment details:', equipmentId);
    
    // In production, this would navigate to a detailed view or show a modal
    window.location.href = `/equipment/${equipmentId}`;
}

// ============================================
// Quick Add Equipment (Modal simulation)
// ============================================
function quickAddEquipment() {
    // In production, this would open a modal with the add equipment form
    const response = confirm('Would you like to add new equipment?\n\nThis would open a quick-add modal in production.');
    
    if (response) {
        window.location.href = '/equipment/add';
    }
}
