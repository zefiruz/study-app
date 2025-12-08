import React from 'react'
import './TechnologyCard.css'

function TechnologyCard({ id, title, description, status, onStatusChange }) {
  // Функция для изменения статуса при клике
  const handleClick = () => {
    if (onStatusChange) {
      onStatusChange(id)
    }
  }

  // Определяем иконку и текст для статуса
  const getStatusConfig = () => {
    switch (status) {
      case 'completed':
        return { 
          icon: '✓', 
          text: 'Изучено', 
          color: '#45b7d1',
          nextStatus: 'not-started'
        }
      case 'in-progress':
        return { 
          icon: '⌛', 
          text: 'В процессе', 
          color: '#4ecdc4',
          nextStatus: 'completed'
        }
      case 'not-started':
      default:
        return { 
          icon: '⏳', 
          text: 'Не начато', 
          color: '#ff6b6b',
          nextStatus: 'in-progress'
        }
    }
  }

  const statusConfig = getStatusConfig()

  return (
    <div 
      className={`technology-card status-${status.replace('-', '')}`}
      onClick={handleClick}
      title={`Кликните для изменения статуса. Следующий статус: ${statusConfig.nextStatus}`}
    >
      <div className="status-section">
        <div 
          className="status-icon" 
          style={{ 
            backgroundColor: `${statusConfig.color}20`,
            border: `2px solid ${statusConfig.color}`
          }}
        >
          {statusConfig.icon}
        </div>
        <p className="status-text">{statusConfig.text}</p>
        <p className="status-hint">Кликните для изменения</p>
      </div>
      
      <div className="tech-info">
        <h3>{title}</h3>
        <p>{description}</p>
        <div className="tech-id">ID: {id}</div>
      </div>
    </div>
  )
}

export default TechnologyCard