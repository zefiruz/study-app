// src/pages/TechnologyList.jsx

import { Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import useTechnologies from '../hooks/useTechnologies'; 
import Filters from '../components/Filters'; 
import QuickActions from '../components/QuickActions'; 
import './TechnologyList.css'; 

function TechnologyList() {
    const { 
        technologies, 
        markAllCompleted, 
        resetAll, 
        chooseRandomTechnology 
    } = useTechnologies();
    
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    // Следим за обновлениями в localStorage
    useEffect(() => {
        const handleUpdate = () => {};
        
        window.addEventListener('technologiesUpdated', handleUpdate);

        return () => {
            window.removeEventListener('technologiesUpdated', handleUpdate);
        };
    }, []); 

    // Фильтруем технологии
    const filteredTechnologies = useMemo(() => {
        let list = technologies;

        if (activeFilter !== 'all') {
            list = list.filter(tech => tech.status === activeFilter);
        }

        if (searchTerm) {
            const searchLower = searchTerm.toLowerCase();
            list = list.filter(tech => 
                tech.title.toLowerCase().includes(searchLower) ||
                tech.description.toLowerCase().includes(searchLower)
            );
        }

        return list;
    }, [technologies, activeFilter, searchTerm]);

    return (
        <div className="page">
            <div className="page-header">
                <h1>Все технологии ({technologies.length})</h1>
                <Link to="/add-technology" className="btn btn-primary">
                    + Добавить
                </Link>
            </div>

            <div className="tools-section">
                <div className="search-input-container">
                    <input
                        type="text"
                        placeholder="Поиск по названию или описанию..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>

                <Filters
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                    technologies={technologies}
                />
                
                <QuickActions
                    onMarkAllCompleted={markAllCompleted}
                    onResetAll={resetAll}
                    onRandomSelect={chooseRandomTechnology}
                    technologies={technologies}
                />
            </div>
            
            <div className="technologies-grid">
                {filteredTechnologies.map(tech => (
                    <div key={tech.id} className="technology-item">
                        <h3>{tech.title}</h3>
                        <p>{tech.description}</p>
                        <div className="technology-meta">
                            <span className={`status status-${tech.status}`}>
                                {tech.status}
                            </span>
                            <Link to={`/technology/${tech.id}`} className="btn-link">
                                Подробнее →
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {filteredTechnologies.length === 0 && technologies.length > 0 && (
                <div className="empty-state">
                    <p>Ничего не найдено. Попробуйте другие фильтры.</p>
                </div>
            )}
            
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