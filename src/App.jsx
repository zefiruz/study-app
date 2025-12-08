import React, { useState } from 'react'
import './App.css'
import TechnologyCard from './components/TechnologyCard'
import ProgressBar from './components/ProgressBar' 
import QuickActions from './components/QuickActions'
import Filters from './components/Filters'
import Counter from './components/Counter'
import RegistrationForm from './components/RegistrationForm'
import ColorPicker from './components/ColorPicker'
import TechnologyNotes from './components/TechnologyNotes'
import useTechnologies from './hooks/useTechnologies'

function App() {
  // Используем хук для технологий
  const { 
    technologies, 
    updateStatus, 
    updateNotes, 
    markAllCompleted, 
    resetAll,
    chooseRandomTechnology,
    progress 
  } = useTechnologies();
  
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Фильтрация
  const searchFilteredTechnologies = technologies.filter(tech =>
    tech.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tech.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

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

  // Статистика
  const completedCount = technologies.filter(t => t.status === 'completed').length
  const inProgressCount = technologies.filter(t => t.status === 'in-progress').length

  return (
    <div className="App">
      <header className="App-header">
        <h1>Трекер изучения технологий</h1>
        <div className="progress-section">
          <ProgressBar
            progress={progress}
            label="Общий прогресс "
            color="#4CAF50"
            animated={true}
            height={25}
          />
        </div>
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
        
        {/* Быстрые действия из задания */}
        <QuickActions
          onMarkAllCompleted={markAllCompleted}
          onResetAll={resetAll}
          onRandomSelect={chooseRandomTechnology}
          technologies={technologies}
        />
        
        <div className="filters-section">
          <Filters 
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            technologies={technologies}
          />
          
          <div className="search-section">
            <h3>Поиск технологий</h3>
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
                    onStatusChange={() => {
                      // Меняем статус по кругу
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
                      updateStatus(tech.id, newStatus)
                    }}
                    category={tech.category} // Добавляем категорию
                  />
                  
                  <TechnologyNotes
                    notes={tech.notes}
                    onNotesChange={updateNotes}
                    techId={tech.id}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <footer className="app-footer">
        <div className="footer-stats">
          <p>Всего: {technologies.length} • 
            Выполнено: {completedCount} • 
            В процессе: {inProgressCount}
          </p>
          <p className="progress-info">
            Прогресс: {progress}%
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App