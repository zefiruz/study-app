import React from 'react'
import './Filters.css'

function Filters({ activeFilter, onFilterChange, technologies }) {
  const counts = {
    'all': technologies.length,
    'not-started': technologies.filter(t => t.status === 'not-started').length,
    'in-progress': technologies.filter(t => t.status === 'in-progress').length,
    'completed': technologies.filter(t => t.status === 'completed').length
  }

  const filters = [
    { id: 'all', label: 'Все', color: '#667eea' },
    { id: 'not-started', label: 'Не начатые', color: '#ff6b6b' },
    { id: 'in-progress', label: 'В процессе', color: '#4ecdc4' },
    { id: 'completed', label: 'Выполненные', color: '#45b7d1' }
  ]

  return (
    <div className="filters">
      <h3>Фильтры по статусу</h3>
      
      <div className="filters-grid">
        {filters.map(filter => (
          <button
            key={filter.id}
            className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
            onClick={() => onFilterChange(filter.id)}
            style={{
              borderColor: filter.color,
              backgroundColor: activeFilter === filter.id ? `${filter.color}20` : 'white'
            }}
          >
            <span className="filter-label">{filter.label}</span>
            <span 
              className="filter-count"
              style={{ backgroundColor: filter.color }}
            >
              {counts[filter.id]}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default Filters