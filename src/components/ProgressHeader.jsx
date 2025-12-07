import React from 'react'
import './ProgressHeader.css'

function ProgressHeader({ technologies }) {
  const total = technologies.length
  const completed = technologies.filter(t => t.status === 'completed').length
  const inProgress = technologies.filter(t => t.status === 'in-progress').length
  const notStarted = technologies.filter(t => t.status === 'not-started').length
  
  const completionPercentage = total > 0 ? Math.round((completed / total) * 100) : 0

  return (
    <div className="progress-header">
      <h2>📚 Трекер изучения технологий</h2>
      
      <div className="stats-container">
        <div className="stat-item">
          <div className="stat-value">{total}</div>
          <div className="stat-label">Всего технологий</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value" style={{ color: '#a5d6a7' }}>{completed}</div>
          <div className="stat-label">Изучено</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value" style={{ color: '#ffcc80' }}>{inProgress}</div>
          <div className="stat-label">В процессе</div>
        </div>
        
        <div className="stat-item">
          <div className="stat-value" style={{ color: '#b0bec5' }}>{notStarted}</div>
          <div className="stat-label">Не начато</div>
        </div>
      </div>
      
      <div className="progress-section">
        <div className="progress-info">
          <span>Общий прогресс:</span>
          <span className="percentage">{completionPercentage}%</span>
        </div>
        
        <div className="progress-bar-container">
          <div 
            className="main-progress-bar" 
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
        
        <div className="progress-legend">
          <div className="legend-item">
            <span className="legend-color completed-color" />
            <span>Изучено ({completed})</span>
          </div>
          <div className="legend-item">
            <span className="legend-color in-progress-color" />
            <span>В процессе ({inProgress})</span>
          </div>
          <div className="legend-item">
            <span className="legend-color not-started-color" />
            <span>Не начато ({notStarted})</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProgressHeader