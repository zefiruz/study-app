import React from 'react'
import './TechnologyCard.css'

function TechnologyCard({ id, title, description, status, onStatusChange, category }) {
  const handleClick = () => {
    onStatusChange(id);
  }

  // Цвета для статусов
  const statusColors = {
    'not-started': '#ff6b6b',
    'in-progress': '#ffa726',
    'completed': '#4caf50'
  }

  const statusText = {
    'not-started': 'Не начато',
    'in-progress': 'В процессе',
    'completed': 'Выполнено'
  }

  const categoryText = {
    'frontend': 'Фронтенд',
    'backend': 'Бэкенд'
  }

  return (
    <div className="technology-card">
      <div className="card-header">
        <div className="title-row">
          <h3>{title}</h3>
          {category && (
            <span className={`category-badge category-${category}`}>
              {categoryText[category] || category}
            </span>
          )}
        </div>
        <button 
          className="status-button"
          onClick={handleClick}
          style={{ backgroundColor: statusColors[status] }}
        >
          {statusText[status]}
        </button>
      </div>
      
      <p className="description">{description}</p>
      
      <div className="status-indicator">
        <div className="status-dot" style={{ backgroundColor: statusColors[status] }} />
        <span>{statusText[status]}</span>
      </div>
    </div>
  )
}

export default TechnologyCard