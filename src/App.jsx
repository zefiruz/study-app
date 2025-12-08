import React, { useState, useEffect } from 'react'
import './App.css'
import TechnologyCard from './components/TechnologyCard'
import ProgressHeader from './components/ProgressHeader'
import QuickActions from './components/QuickActions'
import Filters from './components/Filters'
import Counter from './components/Counter'
import RegistrationForm from './components/RegistrationForm'
import ColorPicker from './components/ColorPicker'
import TechnologyNotes from './components/TechnologyNotes'

function App() {
  // Список технологий для изучения
  const initialTechnologies = [
    { 
      id: 1, 
      title: 'React Components', 
      description: 'Изучение функциональных и классовых компонентов, жизненного цикла.', 
      status: 'not-started',
      notes: '' 
    },
    { 
      id: 2, 
      title: 'JSX Syntax', 
      description: 'Освоение синтаксиса JSX, работа с выражениями JavaScript внутри разметки.', 
      status: 'not-started',
      notes: ''
    },
    { 
      id: 3, 
      title: 'State Management', 
      description: 'Работа с состоянием компонентов через useState.', 
      status: 'not-started',
      notes: ''
    },
    { 
      id: 4, 
      title: 'React Hooks', 
      description: 'Изучение хуков: useEffect, useContext, useReducer.', 
      status: 'not-started',
      notes: ''
    },
    { 
      id: 5, 
      title: 'React Router', 
      description: 'Настройка маршрутизации в React-приложениях.', 
      status: 'not-started',
      notes: ''
    },
    { 
      id: 6, 
      title: 'API Integration', 
      description: 'Работа с HTTP-запросами, интеграция с REST API.', 
      status: 'not-started',
      notes: ''
    },
  ]

  // Храним все технологии
  const [technologies, setTechnologies] = useState(initialTechnologies)
  // Какой фильтр выбран
  const [activeFilter, setActiveFilter] = useState('all')
  // Текст для поиска
  const [searchQuery, setSearchQuery] = useState('')

  // Когда страница загружается, берем данные из localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('techTrackerData')
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        // На всякий случай проверяем, чтобы у всех были заметки
        const validatedData = parsedData.map(tech => ({
          ...tech,
          notes: tech.notes || ''
        }))
        setTechnologies(validatedData)
      } catch (error) {
        console.log('Не получилось загрузить данные')
      }
    }
  }, [])

  // Сохраняем в localStorage когда меняются технологии
  useEffect(() => {
    localStorage.setItem('techTrackerData', JSON.stringify(technologies))
  }, [technologies])

  // Меняем статус технологии при клике
  const updateTechnologyStatus = (id) => {
    setTechnologies(prevTech => 
      prevTech.map(tech => {
        if (tech.id === id) {
          // Меняем статус по кругу: не начато -> в процессе -> выполнено -> не начато
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

  // Обновляем заметки к технологии
  const updateTechnologyNotes = (techId, newNotes) => {
    setTechnologies(prevTech =>
      prevTech.map(tech =>
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    )
  }

  // Отметить все как выполненные
  const markAllAsCompleted = () => {
    setTechnologies(prevTech => 
      prevTech.map(tech => ({ ...tech, status: 'completed' }))
    )
  }

  // Сбросить все статусы
  const resetAllStatuses = () => {
    setTechnologies(prevTech => 
      prevTech.map(tech => ({ ...tech, status: 'not-started' }))
    )
  }

  // Выбрать случайную технологию для изучения
  const chooseRandomTechnology = () => {
    const notStartedTech = technologies.filter(tech => tech.status === 'not-started')
    
    if (notStartedTech.length === 0) {
      alert('Все технологии уже начаты или завершены!')
      return
    }
    
    const randomTech = notStartedTech[Math.floor(Math.random() * notStartedTech.length)]
    
    setTechnologies(prevTech => 
      prevTech.map(tech => 
        tech.id === randomTech.id ? { ...tech, status: 'in-progress' } : tech
      )
    )
    
    alert(`Выбрана технология: ${randomTech.title}`)
  }

  // Ищем технологии по тексту
  const searchFilteredTechnologies = technologies.filter(tech =>
    tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tech.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Фильтруем еще и по статусу
  const filteredTechnologies = searchFilteredTechnologies.filter(tech => {
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
        <h1>Трекер изучения технологий</h1>
      </header>

      <div className="examples-section">
        <h2>Примеры из теории (useState)</h2>
        <div className="examples-grid">
          <Counter />
          <RegistrationForm />
          <ColorPicker />
        </div>
      </div>

      <div className="tracker-section">
        <h2>Трекер технологий</h2>
        
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

        <div className="search-section">
          <h2>Поиск технологий</h2>
          <div className="search-box">
            <input
              type="text"
              placeholder="Поиск по названию или описанию..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <div className="search-info">
              <span className="results-count">
                Найдено: {searchFilteredTechnologies.length} из {technologies.length}
              </span>
              {searchQuery && (
                <button 
                  className="clear-search-btn"
                  onClick={() => setSearchQuery('')}
                >
                  Очистить
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className="technologies-container">
          <h3 className="section-title">
            Список технологий 
            <span className="filter-indicator">
              ({activeFilter === 'all' ? 'Все' : 
                activeFilter === 'not-started' ? 'Не начатые' :
                activeFilter === 'in-progress' ? 'В процессе' : 'Завершенные'})
            </span>
          </h3>
          
          {filteredTechnologies.length === 0 ? (
            <div className="no-results">
              <p>Нет технологий по этому фильтру</p>
            </div>
          ) : (
            <div className="technologies-list">
              {filteredTechnologies.map(tech => (
                <div key={tech.id} className="technology-card-wrapper">
                  <TechnologyCard
                    id={tech.id}
                    title={tech.title}
                    description={tech.description}
                    status={tech.status}
                    onStatusChange={updateTechnologyStatus}
                  />
                  
                  <TechnologyNotes
                    notes={tech.notes}
                    onNotesChange={updateTechnologyNotes}
                    techId={tech.id}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <footer className="app-footer">
        <p>Всего технологий: {technologies.length} • 
          Изучено: {technologies.filter(t => t.status === 'completed').length} • 
          В процессе: {technologies.filter(t => t.status === 'in-progress').length}
        </p>
        <p className="localstorage-info">
          Заметок сохранено: {technologies.filter(t => t.notes && t.notes.length > 0).length}
        </p>
      </footer>
    </div>
  )
}

export default App