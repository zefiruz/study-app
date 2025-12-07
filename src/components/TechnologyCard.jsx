import React from 'react'
import './TechnologyCard.css';

function TechnologyCard({ title, description, status }) {
  const getStatusClass = () => {
    switch (status) {
      case 'completed':
        return 'status-completed';
      case 'in-progress':
        return 'status-in-progress';
      case 'not-started':
        return 'status-not-started';
      default:
        return '';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'completed':
        return 'Изучено ✅';
      case 'in-progress':
        return 'В процессе ⌛';
      case 'not-started':
        return 'Не начато 🔄';
      default:
        return status;
    }
  };

  return (
    <div className={`technology-card ${getStatusClass()}`}>
      <div className="card-header">
        <h3 className="card-title">{title}</h3>
        <span className="card-status">{getStatusText()}</span>
      </div>
      <p className="card-description">{description}</p>
      <div className="card-footer">
        <div className="progress-indicator">
          <div 
            className="progress-bar" 
            style={{
              width: status === 'completed' ? '100%' : 
                     status === 'in-progress' ? '50%' : '0%'
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default TechnologyCard;