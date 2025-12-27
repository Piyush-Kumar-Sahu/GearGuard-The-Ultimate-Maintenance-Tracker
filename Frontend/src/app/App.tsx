import { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';
import EquipmentDetail from './components/EquipmentDetail';
import CalendarView from './components/CalendarView';
import MapView from './components/MapView';

export default function App() {
  const [currentPage, setCurrentPage] = useState('kanban');
  const [theme, setTheme] = useState('light');
  const [userRole, setUserRole] = useState('technician');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedRole = localStorage.getItem('userRole') || 'technician';
    setTheme(savedTheme);
    setUserRole(savedRole);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const switchRole = (role: string) => {
    setUserRole(role);
    localStorage.setItem('userRole', role);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
      {/* Navigation Bar */}
      <nav style={{
        backgroundColor: 'var(--navbar-bg)',
        borderBottom: '1px solid var(--border-color)',
        padding: '1rem 2rem',
        boxShadow: '0 2px 4px var(--shadow)'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#0d6efd',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            cursor: 'pointer'
          }} onClick={() => setCurrentPage('kanban')}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
            </svg>
            GearGuard
          </div>

          <div style={{ display: 'flex', listStyle: 'none', gap: '2rem', alignItems: 'center' }}>
            <NavLink 
              active={currentPage === 'kanban'} 
              onClick={() => setCurrentPage('kanban')}
              label="Kanban Board"
            />
            <NavLink 
              active={currentPage === 'equipment'} 
              onClick={() => setCurrentPage('equipment')}
              label="Equipment"
            />
            <NavLink 
              active={currentPage === 'calendar'} 
              onClick={() => setCurrentPage('calendar')}
              label="Calendar"
            />
            <NavLink 
              active={currentPage === 'map'} 
              onClick={() => setCurrentPage('map')}
              label="Location Map"
            />

            {/* Role Toggle */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              backgroundColor: 'var(--bg-tertiary)',
              padding: '0.3rem',
              borderRadius: '8px'
            }}>
              <button
                onClick={() => switchRole('technician')}
                style={{
                  padding: '0.4rem 1rem',
                  border: 'none',
                  background: userRole === 'technician' ? '#0d6efd' : 'transparent',
                  color: userRole === 'technician' ? 'white' : 'var(--text-secondary)',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Technician
              </button>
              <button
                onClick={() => switchRole('employee')}
                style={{
                  padding: '0.4rem 1rem',
                  border: 'none',
                  background: userRole === 'employee' ? '#0d6efd' : 'transparent',
                  color: userRole === 'employee' ? 'white' : 'var(--text-secondary)',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Employee
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              style={{
                background: 'none',
                border: '2px solid var(--border-color)',
                borderRadius: '20px',
                padding: '0.4rem 1rem',
                cursor: 'pointer',
                color: 'var(--text-primary)',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
              <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '20px' }}>
        {currentPage === 'kanban' && <KanbanBoard userRole={userRole} />}
        {currentPage === 'equipment' && <EquipmentDetail userRole={userRole} />}
        {currentPage === 'calendar' && <CalendarView userRole={userRole} />}
        {currentPage === 'map' && <MapView />}
      </main>
    </div>
  );
}

function NavLink({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <a
      onClick={onClick}
      style={{
        color: active ? 'white' : 'var(--navbar-text)',
        textDecoration: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        transition: 'background-color 0.2s ease',
        backgroundColor: active ? '#0d6efd' : 'transparent',
        cursor: 'pointer'
      }}
    >
      {label}
    </a>
  );
}
