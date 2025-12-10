// src/pages/TechnologyDetail.jsx
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useTechnologies from '../hooks/useTechnologies';

import './TechnologyDetail.css'

function TechnologyDetail() {
    const { techId } = useParams();
    const { updateStatus, updateNotes } = useTechnologies(); 

    const [technology, setTechnology] = useState(null);
    const [notes, setNotes] = useState('');
    
    // Функция для загрузки технологии
    const loadTechnology = () => {
        const saved = localStorage.getItem('technologies');
        if (saved) {
            const technologies = JSON.parse(saved);
            const tech = technologies.find(t => t.id === parseInt(techId));
            if (tech) {
                setTechnology(tech);
                setNotes(tech.notes);
            }
        }
    };

    // Загрузка и подписка на события для реактивности
    useEffect(() => {
        loadTechnology();
        window.addEventListener('technologiesUpdated', loadTechnology);
        return () => {
            window.removeEventListener('technologiesUpdated', loadTechnology);
        };
    }, [techId]); 

    // Обновление статуса
    const handleStatusUpdate = (newStatus) => {
        updateStatus(technology.id, newStatus);
        setTechnology(prev => ({ ...prev, status: newStatus })); 
    };

    // Сохранение заметок
    const handleNotesSave = (e) => {
        e.preventDefault();
        updateNotes(technology.id, notes);
        alert('Заметки сохранены!');
    };

    if (!technology) {
        return (
            <div className="page">
                <h1>Технология не найдена</h1>
                <p>Технология с ID {techId} не существует.</p>
                <Link to="/technologies" className="btn btn-primary">
                    ← Назад к списку
                </Link>
            </div>
        );
    }

    return (
        <div className="page">
            <div className="page-header">
                <Link to="/technologies" className="back-link">
                    ← Назад к списку
                </Link>
                <h1>{technology.title}</h1>
            </div>

            <div className="technology-detail">
                <div className="detail-section">
                    <h3>Описание</h3>
                    <p>{technology.description}</p>
                </div>

                <div className="detail-section">
                    <h3>Статус изучения: <span className={`status status-${technology.status}`}>{technology.status}</span></h3>
                    <div className="status-buttons">
                        <button
                            onClick={() => handleStatusUpdate('not-started')}
                            className={technology.status === 'not-started' ? 'active' : ''}
                        >
                            Не начато
                        </button>
                        <button
                            onClick={() => handleStatusUpdate('in-progress')}
                            className={technology.status === 'in-progress' ? 'active' : ''}
                        >
                            В процессе
                        </button>
                        <button
                            onClick={() => handleStatusUpdate('completed')}
                            className={technology.status === 'completed' ? 'active' : ''}
                        >
                            Завершено
                        </button>
                    </div>
                </div>
                
                <div className="detail-section notes-editor">
                    <h3>Мои заметки</h3>
                    <form onSubmit={handleNotesSave}>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Добавьте ваши заметки..."
                        />
                        <button type="submit" className="btn btn-primary">
                            Сохранить заметки
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default TechnologyDetail;