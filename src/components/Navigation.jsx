// src/components/Navigation.jsx
import { Link, useLocation } from 'react-router-dom';
import React from 'react';
import './Navigation.css';

function Navigation() {
  const location = useLocation();

  const getClassName = (path) => {
    const currentPath = location.pathname.replace(/\/$/, ''); 
    const targetPath = path.replace(/\/$/, '');

    return currentPath === targetPath ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="main-navigation">
      <div className="nav-brand">
        <Link to="/">
          <h2>Трекер технологий</h2>
        </Link>
      </div>
      <ul className="nav-menu">
        <li>
          <Link to="/" className={getClassName('/')}>
            Главная
          </Link>
        </li>
        <li>
          <Link to="/technologies" className={getClassName('/technologies')}>
            Все технологии
          </Link>
        </li>
        <li>
          <Link to="/statistics" className={getClassName('/statistics')}>
            Статистика
          </Link>
        </li>
        <li>
          <Link to="/genius" className={getClassName('/genius')}>
            Genius API
          </Link>
        </li>
        <li>
          <Link to="/settings" className={getClassName('/settings')}>
            Настройки
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;