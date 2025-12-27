import { useState } from 'react';

interface MaintenanceRequest {
  id: number;
  subject: string;
  equipment_name: string;
  status: string;
  technician_name: string;
  technician_initials: string;
  priority?: string;
  is_overdue: boolean;
}

const sampleRequests: MaintenanceRequest[] = [
  {
    id: 1,
    subject: 'Oil leak detected',
    equipment_name: 'CNC Machine #5',
    status: 'new',
    technician_name: 'John Smith',
    technician_initials: 'JS',
    priority: 'high',
    is_overdue: true
  },
  {
    id: 2,
    subject: 'Quarterly inspection',
    equipment_name: 'Hydraulic Press #3',
    status: 'in-progress',
    technician_name: 'Sarah Johnson',
    technician_initials: 'SJ',
    is_overdue: false
  },
  {
    id: 3,
    subject: 'Belt replacement',
    equipment_name: 'Conveyor Belt System',
    status: 'repaired',
    technician_name: 'Mike Davis',
    technician_initials: 'MD',
    priority: 'medium',
    is_overdue: false
  },
  {
    id: 4,
    subject: 'Safety inspection overdue',
    equipment_name: 'Welding Station #2',
    status: 'new',
    technician_name: 'Emily Chen',
    technician_initials: 'EC',
    priority: 'high',
    is_overdue: true
  }
];

export default function KanbanBoard({ userRole }: { userRole: string }) {
  const [requests, setRequests] = useState<MaintenanceRequest[]>(sampleRequests);
  const [draggedCard, setDraggedCard] = useState<number | null>(null);

  const columns = [
    { id: 'new', title: 'New', color: '#6c757d' },
    { id: 'in-progress', title: 'In Progress', color: '#0d6efd' },
    { id: 'repaired', title: 'Repaired', color: '#198754' },
    { id: 'scrap', title: 'Scrap', color: '#dc3545' }
  ];

  const handleDragStart = (id: number) => {
    setDraggedCard(id);
  };

  const handleDrop = (status: string) => {
    if (draggedCard !== null) {
      setRequests(requests.map(req =>
        req.id === draggedCard ? { ...req, status } : req
      ));
      setDraggedCard(null);
    }
  };

  const getRequestsByStatus = (status: string) => {
    return requests.filter(req => req.status === status);
  };

  if (userRole === 'employee') {
    return (
      <div style={{
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '8px',
        padding: '1.5rem',
        boxShadow: '0 2px 4px var(--shadow)'
      }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>Employee View</h1>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>
          As an employee, you can only submit maintenance requests. Please use the Equipment page to submit a new request.
        </p>
        <div style={{ textAlign: 'center' }}>
          <button style={{
            backgroundColor: '#0d6efd',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}>
            Request Maintenance
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'var(--card-bg)',
      border: '1px solid var(--card-border)',
      borderRadius: '8px',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      boxShadow: '0 2px 4px var(--shadow)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        paddingBottom: '1rem',
        borderBottom: '2px solid var(--border-color)'
      }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Maintenance Request Board</h1>
        <button style={{
          backgroundColor: '#0d6efd',
          color: 'white',
          border: 'none',
          padding: '0.75rem 1.5rem',
          borderRadius: '8px',
          cursor: 'pointer'
        }}>
          + New Request
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1.5rem',
        marginTop: '2rem'
      }}>
        {columns.map(column => (
          <div
            key={column.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(column.id)}
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              borderRadius: '8px',
              padding: '1rem',
              minHeight: '500px'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
              padding: '0.75rem',
              borderRadius: '6px',
              fontWeight: 600,
              backgroundColor: column.color,
              color: 'white'
            }}>
              <span>{column.title}</span>
              <span style={{
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                padding: '0.25rem 0.75rem',
                borderRadius: '12px',
                fontSize: '0.875rem'
              }}>
                {getRequestsByStatus(column.id).length}
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {getRequestsByStatus(column.id).map(req => (
                <div
                  key={req.id}
                  draggable
                  onDragStart={() => handleDragStart(req.id)}
                  style={{
                    backgroundColor: 'var(--card-bg)',
                    border: req.is_overdue ? '2px solid #dc3545' : '2px solid var(--card-border)',
                    borderLeft: req.is_overdue ? '6px solid #dc3545' : '2px solid var(--card-border)',
                    borderRadius: '8px',
                    padding: '1rem',
                    cursor: 'move',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{
                    fontWeight: 600,
                    fontSize: '1rem',
                    marginBottom: '0.5rem',
                    color: 'var(--text-primary)'
                  }}>
                    {req.subject}
                  </div>
                  <div style={{
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    marginBottom: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                    </svg>
                    {req.equipment_name}
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '0.75rem',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--border-color)'
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: '#0d6efd',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 600,
                      fontSize: '0.875rem'
                    }} title={req.technician_name}>
                      {req.technician_initials}
                    </div>
                    {req.priority && (
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '12px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        backgroundColor: req.priority === 'high' ? '#fee' : req.priority === 'medium' ? '#fff4e6' : '#e7f5ff',
                        color: req.priority === 'high' ? '#dc3545' : req.priority === 'medium' ? '#ffc107' : '#0dcaf0'
                      }}>
                        {req.priority.toUpperCase()}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
