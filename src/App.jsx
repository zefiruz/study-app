import React, { useState } from 'react'
import './App.css'
import TechnologyCard from './components/TechnologyCard'
import ProgressHeader from './components/ProgressHeader'
import QuickActions from './components/QuickActions'
import Filters from './components/Filters'
import Counter from './components/Counter'
import RegistrationForm from './components/RegistrationForm'
import ColorPicker from './components/ColorPicker'

function App() {
  // Состояние для технологий
  const [technologies, setTechnologies] = useState([
    { 
      id: 1, 
      title: 'React Components', 
      description: 'Изучение функциональных и классовых компонентов, жизненного цикла.', 
      status: 'not-started' 
    },
    { 
      id: 2, 
      title: 'JSX Syntax', 
      description: 'Освоение синтаксиса JSX, работа с выражениями JavaScript внутри разметки.', 
      status: 'not-started' 
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
      status: 'not-started' 
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
      status: 'not-started' 
    },
  ])

  // Состояние для активного фильтра
  const [activeFilter, setActiveFilter] = useState('all')

  // Функция для изменения статуса технологии
  const updateTechnologyStatus = (id) => {
    setTechnologies(prevTech => 
      prevTech.map(tech => {
        if (tech.id === id) {
          // Циклическое изменение статуса: not-started → in-progress → completed → not-started
          let newStatus
          switch (tech.status) {
            case 'not-started':
              newStatus = 'in-progress'
              break
            case 'in-progress':
              newStatus = 'completed'
              break
            case 'completed':
              newStatus = 'not-started'
              break
            default:
              newStatus = 'not-started'
          }
          
          return { ...tech, status: newStatus }
        }
        return tech
      })
    )
  }

  // Функция для отметки всех как выполненных
  const markAllAsCompleted = () => {
    setTechnologies(prevTech => 
      prevTech.map(tech => ({ ...tech, status: 'completed' }))
    )
  }

  // Функция для сброса всех статусов
  const resetAllStatuses = () => {
    setTechnologies(prevTech => 
      prevTech.map(tech => ({ ...tech, status: 'not-started' }))
    )
  }

  // Функция для случайного выбора технологии
  const chooseRandomTechnology = () => {
    const notStartedTech = technologies.filter(tech => tech.status === 'not-started')
    
    if (notStartedTech.length === 0) {
      alert('Все технологии уже начаты или завершены!')
      return
    }
    
    const randomTech = notStartedTech[Math.floor(Math.random() * notStartedTech.length)]
    
    // Обновляем статус выбранной технологии на "in-progress"
    setTechnologies(prevTech => 
      prevTech.map(tech => 
        tech.id === randomTech.id ? { ...tech, status: 'in-progress' } : tech
      )
    )
    
    alert(`Выбрана технология: ${randomTech.title}`)
  }

  // Фильтрация технологий по статусу
  const filteredTechnologies = technologies.filter(tech => {
    switch (activeFilter) {
      case 'not-started':
        return tech.status === 'not-started'
      case 'in-progress':
        return tech.status === 'in-progress'
      case 'completed':
        return tech.status === 'completed'
      default:
        return true
    }
  })

  return (
    <div className="App">
      <header className="App-header">
        <h1>📚 Трекер изучения технологий v2.0</h1>
        <p>Интерактивная версия с управлением состоянием</p>
      </header>

      {/* Примеры из теоретической части */}
      <div className="examples-section">
        <h2>Теоретические примеры (useState)</h2>
        <div className="examples-grid">
          <Counter />
          <RegistrationForm />
          <ColorPicker />
        </div>
      </div>

      {/* Основное приложение - трекер технологий */}
      <div className="tracker-section">
        <h2>Интерактивный трекер технологий</h2>
        
        <ProgressHeader technologies={technologies} />
        
        <div className="actions-filters">
          <QuickActions 
            onMarkAllCompleted={markAllAsCompleted}
            onResetAll={resetAllStatuses}
            onRandomSelect={chooseRandomTechnology}
            technologies={technologies}
          />
          
          <Filters 
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            technologies={technologies}
          />
        </div>
        
        <div className="technologies-container">
          <h3 className="section-title">
            Дорожная карта изучения 
            <span className="filter-indicator">
              ({activeFilter === 'all' ? 'Все' : 
                activeFilter === 'not-started' ? 'Не начатые' :
                activeFilter === 'in-progress' ? 'В процессе' : 'Выполненные'})
            </span>
          </h3>
          
          {filteredTechnologies.length === 0 ? (
            <div className="no-results">
              <p>Нет технологий с выбранным фильтром.</p>
            </div>
          ) : (
            <div className="technologies-list">
              {filteredTechnologies.map(tech => (
                <TechnologyCard
                  key={tech.id}
                  id={tech.id}
                  title={tech.title}
                  description={tech.description}
                  status={tech.status}
                  onStatusChange={updateTechnologyStatus}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      <footer className="app-footer">
        <p>Практическое занятие 20 • Управление состоянием в React • useState</p>
        <p>Всего технологий: {technologies.length} • 
          Изучено: {technologies.filter(t => t.status === 'completed').length} • 
          В процессе: {technologies.filter(t => t.status === 'in-progress').length}
        </p>
      </footer>
    </div>
  )
}

export default App