import React from 'react'
import './App.css'
import TechnologyCard from './components/TechnologyCard'
import ProgressHeader from './components/ProgressHeader'

function App() {
  // Тестовые данные как в методичке
  const technologies = [
    { 
      id: 1, 
      title: 'React Components', 
      description: 'Изучение функциональных и классовых компонентов, жизненного цикла.', 
      status: 'completed' 
    },
    { 
      id: 2, 
      title: 'JSX Syntax', 
      description: 'Освоение синтаксиса JSX, работа с выражениями JavaScript внутри разметки.', 
      status: 'in-progress' 
    },
    { 
      id: 3, 
      title: 'State Management', 
      description: 'Работа с состоянием компонентов через useState.', 
      status: 'not-started' 
    },
    { 
      id: 4, 
      title: 'React Hooks', 
      description: 'Изучение хуков: useEffect, useContext, useReducer.', 
      status: 'in-progress' 
    },
    { 
      id: 5, 
      title: 'React Router', 
      description: 'Настройка маршрутизации в React-приложениях.', 
      status: 'not-started' 
    },
    { 
      id: 6, 
      title: 'API Integration', 
      description: 'Работа с HTTP-запросами, интеграция с REST API.', 
      status: 'completed' 
    },
  ]

  return (
    <div className="App">
      <header className="App-header">
        <h1>Технологический трекер</h1>
      </header>
      
      <ProgressHeader technologies={technologies} />
      
      <div className="technologies-container">
        <h2 className="section-title">Дорожная карта изучения</h2>
        
        <div className="technologies-list">
          {technologies.map(tech => (
            <TechnologyCard
              key={tech.id}
              title={tech.title}
              description={tech.description}
              status={tech.status}
            />
          ))}
        </div>
      </div>
      
      <footer className="app-footer">
        <p>Трекер изучения технологий • Практическое занятие 19 • React & Vite</p>
        <p>Всего технологий: {technologies.length} • Изучено: {
          technologies.filter(t => t.status === 'completed').length
        }</p>
      </footer>
    </div>
  )
}

export default App