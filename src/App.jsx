// src/App.jsx

import React from 'react';
import './App.css';
// Импортируем роутер
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Импортируем компоненты навигации и страниц
import Navigation from './components/Navigation.jsx';
import Home from './pages/Home.jsx';
import TechnologyList from './pages/TechnologyList.jsx';
import TechnologyDetail from './pages/TechnologyDetail.jsx';
// Импортируем остальные страницы (предполагаем, что они существуют)
import AddTechnology from './pages/AddTechnology.jsx';
import Statistics from './pages/Statistics.jsx'; 
import Settings from './pages/Settings.jsx';

// Для инициализации useTechnologies (чтобы данные загрузились при старте)
import useTechnologies from './hooks/useTechnologies'; 

function App() {
  // Вызываем хук один раз. Это гарантирует, что localStorage инициализируется
  // начальными данными, если они отсутствуют. 
  // Мы не используем здесь возвращаемые значения (технологии, updateStatus),
  // так как они будут использоваться непосредственно на целевых страницах.
  useTechnologies();

  return (
    // Обязательно используем basename, чтобы роутинг работал в подкаталоге /study-app/
    <Router basename="/study-app"> 
      <div className="App">
        {/* Навигационное меню: отображается на ВСЕХ страницах */}
        <Navigation /> 
        
        <main className="main-content">
          <Routes>
            {/* Базовый маршрут */}
            <Route path="/" element={<Home />} /> 
            
            {/* Маршруты для страниц проекта */}
            <Route path="/technologies" element={<TechnologyList />} />
            <Route path="/technology/:techId" element={<TechnologyDetail />} />
            <Route path="/add-technology" element={<AddTechnology />} />
            <Route path="/statistics" element={<Statistics />} /> 
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
        
        <footer className="app-footer">
          <div className="footer-stats">
            <p>Трекер изучения технологий.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;