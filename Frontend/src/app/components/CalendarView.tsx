export default function CalendarView({ userRole }: { userRole: string }) {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Generate December 2025 calendar
  const calendarDays = [];
  for (let i = 0; i < 35; i++) {
    const day = i - 2; // Start from -2 to show previous month days
    const isCurrentMonth = day >= 1 && day <= 31;
    const isToday = day === 27; // December 27, 2025
    
    calendarDays.push({
      day: isCurrentMonth ? day : '',
      isCurrentMonth,
      isToday,
      events: day === 20 ? [{ subject: 'Oil leak repair', type: 'corrective' }] : 
              day === 25 ? [{ subject: 'Quarterly inspection', type: 'preventive' }] : []
    });
  }

  if (userRole === 'employee') {
    return (
      <div style={{
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--card-border)',
        borderRadius: '8px',
        padding: '1.5rem',
        boxShadow: '0 2px 4px var(--shadow)'
      }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>Calendar Access Restricted</h1>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>
          The maintenance calendar is only accessible to technicians. Please switch to Technician view to access this feature.
        </p>
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
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <button style={{
            backgroundColor: '#0d6efd',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            ← Previous
          </button>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 600, margin: 0 }}>December 2025</h2>
          <button style={{
            backgroundColor: '#0d6efd',
            color: 'white',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>
            Next →
          </button>
        </div>
        <button style={{
          backgroundColor: '#0d6efd',
          color: 'white',
          border: 'none',
          padding: '0.75rem 1.5rem',
          borderRadius: '8px',
          cursor: 'pointer'
        }}>
          + Schedule Maintenance
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '1px',
        backgroundColor: 'var(--border-color)',
        border: '1px solid var(--border-color)'
      }}>
        {daysOfWeek.map(day => (
          <div key={day} style={{
            backgroundColor: 'var(--bg-tertiary)',
            padding: '1rem',
            textAlign: 'center',
            fontWeight: 600
          }}>
            {day}
          </div>
        ))}
        
        {calendarDays.map((day, index) => (
          <div key={index} style={{
            backgroundColor: day.isToday ? 'rgba(13, 110, 253, 0.1)' : 'var(--card-bg)',
            minHeight: '100px',
            padding: '0.5rem',
            opacity: day.isCurrentMonth ? 1 : 0.5
          }}>
            <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
              {day.day}
            </div>
            {day.events.map((event, i) => (
              <div key={i} style={{
                backgroundColor: event.type === 'corrective' ? '#dc3545' : '#198754',
                color: 'white',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.75rem',
                marginBottom: '0.25rem',
                cursor: 'pointer'
              }}>
                {event.subject}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '1.5rem', display: 'flex', gap: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#dc3545', borderRadius: '4px' }}></div>
          <span>Corrective Maintenance</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '20px', height: '20px', backgroundColor: '#198754', borderRadius: '4px' }}></div>
          <span>Preventive Maintenance</span>
        </div>
      </div>
    </div>
  );
}
