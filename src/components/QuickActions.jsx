import React, { useState } from 'react'; // Добавь React
import Modal from './Modal';
import './QuickActions.css';

function QuickActions({ onMarkAllCompleted, onResetAll, onRandomSelect, technologies }) { 
  const [showExportModal, setShowExportModal] = useState(false);

  // Экспорт данных
  const handleExport = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      totalTechnologies: technologies.length,
      completed: technologies.filter(t => t.status === 'completed').length,
      technologies: technologies
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    console.log('Экспортированные данные:', dataStr);
    
    setShowExportModal(true);
  };

  return (
    <div className="quick-actions">
      <h3>Быстрые действия</h3>
      <div className="action-buttons">
        <button 
          onClick={onMarkAllCompleted} 
          className="action-btn success-btn"
        >
          ✓ Отметить все как выполненные
        </button>
        
        <button 
          onClick={onResetAll} 
          className="action-btn warning-btn"
        >
          ⟳ Сбросить все статусы
        </button>
        
        {onRandomSelect && (
          <button 
            onClick={onRandomSelect} 
            className="action-btn random-btn"
          >
            🎲 Выбрать случайную
          </button>
        )}
        
        <button 
          onClick={handleExport} 
          className="action-btn info-btn"
        >
          ⬇ Экспорт данных
        </button>
      </div>

      {/* Модалка для экспорта */}
      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Экспорт данных"
      >
        <div className="export-content">
          <p>Данные успешно подготовлены для экспорта!</p>
          <p>Всего технологий: <strong>{technologies.length}</strong></p>
          <p>Выполнено: <strong>{technologies.filter(t => t.status === 'completed').length}</strong></p>
          <p>Посмотрите консоль разработчика (F12) чтобы увидеть данные.</p>
          
          <div className="modal-actions">
            <button 
              onClick={() => setShowExportModal(false)}
              className="close-modal-btn"
            >
              Закрыть
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default QuickActions;