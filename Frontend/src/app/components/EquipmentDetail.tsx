import { useState, useRef } from 'react';

const sampleEquipment = [
  {
    id: 1,
    name: 'CNC Machine #5',
    serial_number: 'SN-2024-001',
    purchase_date: '2024-01-15',
    location: 'Building A, Floor 2',
    status: 'operational',
    maintenance_team: 'Mechanical Team',
    category: 'Heavy Machinery'
  },
  {
    id: 2,
    name: 'Hydraulic Press #3',
    serial_number: 'SN-2024-002',
    purchase_date: '2024-02-20',
    location: 'Building B, Floor 1',
    status: 'maintenance',
    maintenance_team: 'Hydraulic Team',
    category: 'Press Equipment'
  }
];

export default function EquipmentDetail({ userRole }: { userRole: string }) {
  const [maintenanceType, setMaintenanceType] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState('');
  const [autoFilledTeam, setAutoFilledTeam] = useState('');
  const [autoFilledCategory, setAutoFilledCategory] = useState('');
  const formRef = useRef<HTMLDivElement>(null);

  const handleEquipmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const equipmentId = parseInt(e.target.value);
    setSelectedEquipment(e.target.value);
    
    const equipment = sampleEquipment.find(eq => eq.id === equipmentId);
    if (equipment) {
      setAutoFilledTeam(equipment.maintenance_team);
      setAutoFilledCategory(equipment.category);
      showNotification(`Auto-filled: ${equipment.maintenance_team} - ${equipment.category}`);
    } else {
      setAutoFilledTeam('');
      setAutoFilledCategory('');
    }
  };

  const showNotification = (message: string) => {
    // Simple notification implementation
    const notification = document.createElement('div');
    notification.textContent = '✓ ' + message;
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
      font-size: 0.9rem;
    `;
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.remove();
    }, 2500);
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      {/* Smart Button Header */}
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
          alignItems: 'center'
        }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Equipment Management</h1>
          <button
            onClick={scrollToForm}
            style={{
              position: 'relative',
              backgroundColor: '#0d6efd',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '1rem',
              fontWeight: 500
            }}
          >
            Maintenance Requests
            <span style={{
              backgroundColor: '#dc3545',
              color: 'white',
              borderRadius: '50%',
              minWidth: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.75rem',
              fontWeight: 700,
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              border: '2px solid var(--card-bg)'
            }}>
              4
            </span>
          </button>
        </div>
      </div>

      {/* Add Equipment Form (Technician Only) */}
      {userRole === 'technician' && (
        <div style={{
          backgroundColor: 'var(--card-bg)',
          border: '1px solid var(--card-border)',
          borderRadius: '8px',
          padding: '1.5rem',
          marginBottom: '1.5rem',
          boxShadow: '0 2px 4px var(--shadow)'
        }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Add New Equipment</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Equipment Name <span style={{ color: '#dc3545' }}>*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., CNC Machine #5"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--input-border)',
                  borderRadius: '6px',
                  backgroundColor: 'var(--input-bg)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Serial Number <span style={{ color: '#dc3545' }}>*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., SN-2024-001"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--input-border)',
                  borderRadius: '6px',
                  backgroundColor: 'var(--input-bg)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Purchase Date <span style={{ color: '#dc3545' }}>*</span>
              </label>
              <input
                type="date"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--input-border)',
                  borderRadius: '6px',
                  backgroundColor: 'var(--input-bg)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Location <span style={{ color: '#dc3545' }}>*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Building A, Floor 2"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--input-border)',
                  borderRadius: '6px',
                  backgroundColor: 'var(--input-bg)',
                  color: 'var(--text-primary)'
                }}
              />
            </div>
          </div>

          <button style={{
            backgroundColor: '#0d6efd',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}>
            Add Equipment
          </button>
        </div>
      )}

      {/* Maintenance Request Form */}
      <div ref={formRef} style={{
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        boxShadow: '0 2px 4px var(--shadow)'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Request Maintenance</h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
              Subject <span style={{ color: '#dc3545' }}>*</span>
            </label>
            <input
              type="text"
              placeholder="Brief description of the issue"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--input-border)',
                borderRadius: '6px',
                backgroundColor: 'var(--input-bg)',
                color: 'var(--text-primary)'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
              Equipment <span style={{ color: '#dc3545' }}>*</span>
            </label>
            <select
              value={selectedEquipment}
              onChange={handleEquipmentChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--input-border)',
                borderRadius: '6px',
                backgroundColor: 'var(--input-bg)',
                color: 'var(--text-primary)'
              }}
            >
              <option value="">Select Equipment</option>
              {sampleEquipment.map(eq => (
                <option key={eq.id} value={eq.id}>
                  {eq.name} - {eq.serial_number}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
              Maintenance Type <span style={{ color: '#dc3545' }}>*</span>
            </label>
            <select
              value={maintenanceType}
              onChange={(e) => setMaintenanceType(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--input-border)',
                borderRadius: '6px',
                backgroundColor: 'var(--input-bg)',
                color: 'var(--text-primary)'
              }}
            >
              <option value="">Select Type</option>
              <option value="corrective">Corrective</option>
              <option value="preventive">Preventive</option>
            </select>
          </div>
          
          {maintenanceType === 'corrective' && (
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Priority <span style={{ color: '#dc3545' }}>*</span>
              </label>
              <select
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--input-border)',
                  borderRadius: '6px',
                  backgroundColor: 'var(--input-bg)',
                  color: 'var(--text-primary)'
                }}
              >
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          )}

          {maintenanceType === 'preventive' && (
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                Recurrence <span style={{ color: '#dc3545' }}>*</span>
              </label>
              <select
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid var(--input-border)',
                  borderRadius: '6px',
                  backgroundColor: 'var(--input-bg)',
                  color: 'var(--text-primary)'
                }}
              >
                <option value="">Select Recurrence</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="annually">Annually</option>
              </select>
            </div>
          )}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '1rem',
          marginBottom: '1.5rem'
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
              Maintenance Team
            </label>
            <input
              type="text"
              value={autoFilledTeam}
              placeholder="Auto-filled from equipment"
              readOnly
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--input-border)',
                borderRadius: '6px',
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)'
              }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
              Category
            </label>
            <input
              type="text"
              value={autoFilledCategory}
              placeholder="Auto-filled from equipment"
              readOnly
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid var(--input-border)',
                borderRadius: '6px',
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)'
              }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
            Description <span style={{ color: '#dc3545' }}>*</span>
          </label>
          <textarea
            rows={4}
            placeholder="Provide detailed information about the maintenance required..."
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid var(--input-border)',
              borderRadius: '6px',
              backgroundColor: 'var(--input-bg)',
              color: 'var(--text-primary)',
              fontFamily: 'inherit'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button style={{
            backgroundColor: '#0d6efd',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}>
            Submit Request
          </button>
          <button style={{
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}>
            Clear Form
          </button>
        </div>
      </div>
    </div>
  );
}
