import React from 'react'
import './QuickActions.css'

function QuickActions({ onMarkAllCompleted, onResetAll, onRandomSelect, technologies }) {
  const notStartedCount = technologies.filter(t => t.status === 'not-started').length
  
  return (
    <div className="quick-actions">
      <h3>Быстрые действия</h3>
      
      <div className="actions-grid">
        <button 
          className="action-btn mark-all-btn"
          onClick={onMarkAllCompleted}
          title="Отметить все технологии как изученные"
        >
          <span className="action-icon">✓</span>
          <span className="action-text">Все выполнены</span>
        </button>
        
        <button 
          className="action-btn reset-all-btn"
          onClick={onResetAll}
          title="Сбросить статусы всех технологий"
        >
          <span className="action-icon">↺</span>
          <span className="action-text">Сбросить все</span>
        </button>
        
        <button 
          className="action-btn random-btn"
          onClick={onRandomSelect}
          disabled={notStartedCount === 0}
          title={notStartedCount === 0 ? 'Нет не начатых технологий' : 'Выбрать случайную не начатую технологию'}
        >
          <span className="action-icon">🎲</span>
          <span className="action-text">
            Случайный выбор
            <span className="count-badge">{notStartedCount}</span>
          </span>
        </button>
      </div>
      
      {notStartedCount === 0 && (
        <div className="warning-message">
          Все технологии уже начаты или завершены. Невозможно выбрать новую.
        </div>
      )}
    </div>
  )
}

export default QuickActions