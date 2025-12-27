export default function MapView() {
  const equipment = [
    { name: 'CNC Machine #1', location: 'Building A, Floor 1', status: 'operational' },
    { name: 'Hydraulic Press #2', location: 'Building A, Floor 2', status: 'maintenance' },
    { name: 'Conveyor Belt #5', location: 'Building B, Floor 1', status: 'out-of-service' },
    { name: 'Welding Station #3', location: 'Building C, Floor 1', status: 'operational' }
  ];

  return (
    <div>
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
          marginBottom: '1.5rem'
        }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Equipment Location Map</h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button style={{
              border: '2px solid #0d6efd',
              backgroundColor: 'transparent',
              color: '#0d6efd',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              📍 Reset View
            </button>
            <button style={{
              backgroundColor: '#0d6efd',
              color: 'white',
              border: 'none',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer'
            }}>
              + Add Equipment
            </button>
          </div>
        </div>
        
        {/* Map Placeholder */}
        <div style={{
          height: '600px',
          backgroundColor: 'var(--bg-tertiary)',
          borderRadius: '8px',
          border: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '1rem',
          backgroundImage: 'linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ fontSize: '3rem' }}>🗺️</div>
          <div style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            Interactive Map (Leaflet.js)
          </div>
          <div style={{ color: 'var(--text-secondary)' }}>
            Displays equipment locations across your facility
          </div>
          
          {/* Sample Markers */}
          <div style={{
            position: 'absolute',
            top: '30%',
            left: '40%',
            width: '30px',
            height: '30px',
            backgroundColor: '#198754',
            borderRadius: '50%',
            border: '3px solid white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            cursor: 'pointer'
          }} />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '60%',
            width: '30px',
            height: '30px',
            backgroundColor: '#ffc107',
            borderRadius: '50%',
            border: '3px solid white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            cursor: 'pointer'
          }} />
          <div style={{
            position: 'absolute',
            top: '60%',
            left: '35%',
            width: '30px',
            height: '30px',
            backgroundColor: '#dc3545',
            borderRadius: '50%',
            border: '3px solid white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
            cursor: 'pointer'
          }} />
        </div>
      </div>

      {/* Equipment Location List */}
      <div style={{
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '8px',
        padding: '1.5rem',
        marginBottom: '1.5rem',
        boxShadow: '0 2px 4px var(--shadow)'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1.5rem' }}>Equipment Locations</h2>
        
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-tertiary)' }}>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>
                Equipment Name
              </th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>
                Location
              </th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>
                Status
              </th>
              <th style={{ padding: '1rem', textAlign: 'left', borderBottom: '2px solid var(--border-color)' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {equipment.map((eq, index) => (
              <tr key={index} style={{
                borderBottom: '1px solid var(--border-color)',
                cursor: 'pointer'
              }}>
                <td style={{ padding: '1rem' }}>{eq.name}</td>
                <td style={{ padding: '1rem' }}>{eq.location}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    backgroundColor: 
                      eq.status === 'operational' ? '#d1e7dd' : 
                      eq.status === 'maintenance' ? '#fff4e6' : '#f8d7da',
                    color: 
                      eq.status === 'operational' ? '#198754' : 
                      eq.status === 'maintenance' ? '#ffc107' : '#dc3545'
                  }}>
                    {eq.status.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <button style={{
                    border: '2px solid #0d6efd',
                    backgroundColor: 'transparent',
                    color: '#0d6efd',
                    padding: '0.5rem 1rem',
                    borderRadius: '6px',
                    cursor: 'pointer'
                  }}>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div style={{
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '8px',
        padding: '1.5rem',
        boxShadow: '0 2px 4px var(--shadow)'
      }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>Map Legend</h2>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '20px',
              height: '20px',
              backgroundColor: '#198754',
              borderRadius: '50%',
              border: '2px solid white'
            }} />
            <span>Operational</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '20px',
              height: '20px',
              backgroundColor: '#ffc107',
              borderRadius: '50%',
              border: '2px solid white'
            }} />
            <span>Maintenance Required</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '20px',
              height: '20px',
              backgroundColor: '#dc3545',
              borderRadius: '50%',
              border: '2px solid white'
            }} />
            <span>Out of Service</span>
          </div>
        </div>
      </div>
    </div>
  );
}
