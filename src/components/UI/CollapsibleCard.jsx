import { useState } from 'react';

export default function CollapsibleCard({ title, icon, children, defaultExpanded = false }) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <div className={`card collapsible-card ${isExpanded ? 'is-expanded' : ''}`}>
      <div 
        className="collapsible-header" 
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          padding: '4px 0'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {icon && <span style={{ fontSize: '1.2rem' }}>{icon}</span>}
          <h3 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>{title}</h3>
        </div>
        <div 
          className="chevron" 
          style={{ 
            transition: 'transform 0.3s ease',
            transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
            color: 'var(--text-muted)',
            fontSize: '0.9rem'
          }}
        >
          ▼
        </div>
      </div>
      
      <div className="collapsible-content">
        {isExpanded && (
          <div style={{ marginTop: '20px', animation: 'fadeIn 0.3s ease' }}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
