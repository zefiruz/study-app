// src/pages/TechnologyList.jsx
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './TechnologyList.css';

function TechnologyList() {
  const [technologies, setTechnologies] = useState([]);

  // Функция для чтения данных из localStorage
  const loadTechnologies = () => {
    const saved = localStorage.getItem('technologies');
    if (saved) {
      setTechnologies(JSON.parse(saved));
    } else {
        // Если LS пуст, показываем пустой массив
        setTechnologies([]);
    }
  };

  // Загрузка и подписка на события для реактивности
  useEffect(() => {
    loadTechnologies();
    
    // Подписка на глобальное событие, которое отправляет useTechnologies
    window.addEventListener('technologiesUpdated', loadTechnologies);

    // Функция очистки: удаляем слушатель при размонтировании
    return () => {
        window.removeEventListener('technologiesUpdated', loadTechnologies);
    };
  }, []); 

  return (
    <div className="page">
      <div className="page-header">
        <h1>Все технологии</h1>
        <Link to="/add-technology" className="btn btn-primary">
          + Добавить технологию
        </Link>
      </div>

      <div className="technologies-grid">
        {technologies.map(tech => (
          <div key={tech.id} className="technology-item">
            <h3>{tech.title}</h3>
            <p>{tech.description}</p>
            <div className="technology-meta">
              <span className={`status status-${tech.status}`}>
                {tech.status}
              </span>
              {/* Динамическая ссылка на страницу деталей */}
              <Link to={`/technology/${tech.id}`} className="btn-link">
                Подробнее →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Состояние, если технологий нет */}
      {technologies.length === 0 && (
        <div className="empty-state">
          <p>Технологий пока нет.</p>
          <Link to="/add-technology" className="btn btn-primary">
            Добавить первую технологию
          </Link>
        </div>
      )}
    </div>
  );
}

export default TechnologyList;