// ============================================
// GearGuard - Kanban Board Drag & Drop
// ============================================

let draggedElement = null;

// ============================================
// Drag Event Handlers
// ============================================
function drag(event) {
    draggedElement = event.target;
    event.target.classList.add('dragging');
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', event.target.innerHTML);
}

function allowDrop(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
    
    // Add visual feedback
    const target = event.target.closest('.kanban-cards');
    if (target && !target.classList.contains('drag-over')) {
        target.classList.add('drag-over');
    }
}

function drop(event) {
    event.preventDefault();
    
    const target = event.target.closest('.kanban-cards');
    
    if (target && draggedElement) {
        // Remove visual feedback
        document.querySelectorAll('.kanban-cards').forEach(cards => {
            cards.classList.remove('drag-over');
        });
        
        // Move the card
        target.appendChild(draggedElement);
        draggedElement.classList.remove('dragging');
        
        // Get the new status from the column
        const newStatus = target.id.replace('cards-', '');
        const cardId = draggedElement.getAttribute('data-id');
        
        // Update the card status on the backend
        updateCardStatus(cardId, newStatus);
        
        // Update column counts
        updateColumnCounts();
        
        draggedElement = null;
    }
}

// ============================================
// Drag End Handler
// ============================================
document.addEventListener('dragend', function(event) {
    if (event.target.classList.contains('kanban-card')) {
        event.target.classList.remove('dragging');
        
        // Remove all drag-over classes
        document.querySelectorAll('.kanban-cards').forEach(cards => {
            cards.classList.remove('drag-over');
        });
    }
});

// ============================================
// Update Card Status (Backend API Call)
// ============================================
function updateCardStatus(cardId, newStatus) {
    console.log(`Updating card ${cardId} to status: ${newStatus}`);
    
    // In production, this would make an AJAX call to the backend
    // Example:
    /*
    fetch('/api/maintenance-request/update-status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: cardId,
            status: newStatus
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Status updated:', data);
        showNotification('Card moved successfully!', 'success');
    })
    .catch(error => {
        console.error('Error updating status:', error);
        showNotification('Failed to update card status', 'error');
    });
    */
    
    // For now, just log the action
    showNotification(`Card moved to ${newStatus.replace('-', ' ').toUpperCase()}`, 'success');
}

// ============================================
// Update Column Counts
// ============================================
function updateColumnCounts() {
    const statuses = ['new', 'in-progress', 'repaired', 'scrap'];
    
    statuses.forEach(status => {
        const cards = document.querySelectorAll(`#cards-${status} .kanban-card`);
        const countElement = document.getElementById(`count-${status}`);
        
        if (countElement) {
            countElement.textContent = cards.length;
        }
    });
}

// ============================================
// Show Notification
// ============================================
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${type === 'success' ? '#198754' : type === 'error' ? '#dc3545' : '#0d6efd'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 300px;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// Touch Support for Mobile Devices
// ============================================
let touchStartX, touchStartY;

document.addEventListener('touchstart', function(event) {
    if (event.target.classList.contains('kanban-card')) {
        const touch = event.touches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
        draggedElement = event.target;
        event.target.classList.add('dragging');
    }
}, { passive: true });

document.addEventListener('touchmove', function(event) {
    if (draggedElement) {
        event.preventDefault();
        const touch = event.touches[0];
        
        // Visual feedback - move the card with the touch
        draggedElement.style.position = 'fixed';
        draggedElement.style.left = touch.clientX - 100 + 'px';
        draggedElement.style.top = touch.clientY - 50 + 'px';
        draggedElement.style.zIndex = '1000';
    }
}, { passive: false });

document.addEventListener('touchend', function(event) {
    if (draggedElement) {
        const touch = event.changedTouches[0];
        const targetElement = document.elementFromPoint(touch.clientX, touch.clientY);
        const targetColumn = targetElement ? targetElement.closest('.kanban-cards') : null;
        
        // Reset card position
        draggedElement.style.position = '';
        draggedElement.style.left = '';
        draggedElement.style.top = '';
        draggedElement.style.zIndex = '';
        draggedElement.classList.remove('dragging');
        
        if (targetColumn && targetColumn !== draggedElement.closest('.kanban-cards')) {
            targetColumn.appendChild(draggedElement);
            
            const newStatus = targetColumn.id.replace('cards-', '');
            const cardId = draggedElement.getAttribute('data-id');
            
            updateCardStatus(cardId, newStatus);
            updateColumnCounts();
        }
        
        draggedElement = null;
    }
});

// ============================================
// Initialize on Page Load
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    updateColumnCounts();
    
    // Add double-click to view card details
    document.querySelectorAll('.kanban-card').forEach(card => {
        card.addEventListener('dblclick', function() {
            const cardId = this.getAttribute('data-id');
            viewCardDetails(cardId);
        });
    });
});

// ============================================
// View Card Details
// ============================================
function viewCardDetails(cardId) {
    console.log('Viewing card details:', cardId);
    
    // In production, this would show a modal or navigate to details page
    alert(`Maintenance Request Details\n\nID: ${cardId}\n\nIn production, this would show detailed information about the maintenance request.`);
}

// ============================================
// Filter Cards
// ============================================
function filterCards(searchTerm) {
    const cards = document.querySelectorAll('.kanban-card');
    
    cards.forEach(card => {
        const subject = card.querySelector('.kanban-card-subject').textContent.toLowerCase();
        const equipment = card.querySelector('.kanban-card-equipment').textContent.toLowerCase();
        
        if (subject.includes(searchTerm.toLowerCase()) || equipment.includes(searchTerm.toLowerCase())) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
    
    updateColumnCounts();
}

// ============================================
// Export Kanban Data
// ============================================
function exportKanbanData() {
    const data = {
        columns: {}
    };
    
    const statuses = ['new', 'in-progress', 'repaired', 'scrap'];
    
    statuses.forEach(status => {
        const cards = document.querySelectorAll(`#cards-${status} .kanban-card`);
        data.columns[status] = [];
        
        cards.forEach(card => {
            data.columns[status].push({
                id: card.getAttribute('data-id'),
                subject: card.querySelector('.kanban-card-subject').textContent,
                equipment: card.querySelector('.kanban-card-equipment').textContent,
                isOverdue: card.classList.contains('overdue')
            });
        });
    });
    
    console.log('Kanban data:', data);
    return data;
}
