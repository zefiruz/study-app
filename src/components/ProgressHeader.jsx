import React from 'react'
import './ProgressHeader.css'

function ProgressHeader({ technologies }) {
  const total = technologies.length
  const completed = technologies.filter(t => t.status === 'completed').length
  const inProgress = technologies.filter(t => t.status === 'in-progress').length
  const notStarted = technologies.filter(t => t.status === 'not-started').length
  
  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0

  // Определяем "самую популярную" категорию (по количеству)
  const getMostPopularStatus = () => {
    const counts = { completed, 'in-progress': inProgress, 'not-started': notStarted }
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b)
  }

  const popularStatus = getMostPopularStatus()
  const popularStatusText = {
    'completed': 'выполненные',
    'in-progress': 'в процессе',
    'not-started': 'не начатые'
  }[popularStatus]

  return (
    <div className="progress-header">
      <h2>📊 Статистика изучения</h2>
      
      <div className="stats-container">
        <div className="stat-item">
          <div className="stat-value">{total}</div>
          <div className="stat-label">Всего технологий</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value completed-stat">{completed}</div>
          <div className="stat-label">Изучено</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value in-progress-stat">{inProgress}</div>
          <div className="stat-label">В процессе</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value not-started-stat">{notStarted}</div>
          <div className="stat-label">Не начато</div>
        </div>
      </div>
      
      <div className="progress-section">
        <div className="progress-info">
          <span>Общий прогресс изучения:</span>
          <span className="percentage">{completionPercentage}%</span>
        </div>
        
        <div className="progress-bar-container">
          <div 
            className="main-progress-bar" 
            style={{ width: `${completionPercentage}%` }}
          >
            <div className="progress-fill"></div>
          </div>
        </div>
        
        <div className="additional-stats">
          <div className="stat-row">
            <span>Самый частый статус:</span>
            <span className="stat-value-small">{popularStatusText} ({technologies.filter(t => t.status === popularStatus).length})</span>
          </div>
          <div className="stat-row">
            <span>Темп изучения:</span>
            <span className="stat-value-small">
              {inProgress > 0 ? 'Активный' : completed > 0 ? 'Завершён' : 'Не начат'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressHeader