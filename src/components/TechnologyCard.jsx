import React from 'react'
import './TechnologyCard.css'

function TechnologyCard({ title, description, status }) {
  // Определяем иконку и текст для статуса
  const getStatusConfig = () => {
    switch (status) {
      case 'completed':
        return { icon: '✓', text: 'Изучено', color: '#4caf50' }
      case 'in-progress':
        return { icon: '⌛', text: 'В процессе', color: '#ff9800' }
      case 'not-started':
        return { icon: '⏳', text: 'Не начато', color: '#9e9e9e' }
      default:
        return { icon: '?', text: status, color: '#9e9e9e' }
    }
  }

  const statusConfig = getStatusConfig()

  return (
    <div className={`technology-card status-${status}`}>
      <div className="status-section">
        <div className="status-icon" style={{ backgroundColor: statusConfig.color + '20' }}>
          {statusConfig.icon}
        </div>
        <p>{statusConfig.text}</p>
      </div>
      
      <div className="tech-info">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export default TechnologyCard