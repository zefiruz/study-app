// src/pages/TechnologyDetail.jsx

import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useTechnologies from '../hooks/useTechnologies'; 
import './TechnologyDetail.css'

function TechnologyDetail() {
    const { techId } = useParams();
    
    const { getTechnologyById, updateStatus, updateNotes } = useTechnologies(); 

    const technology = getTechnologyById(techId);

    const [notes, setNotes] = useState('');
    
    useEffect(() => {
        if (technology) {
            setNotes(technology.notes);
        }
    }, [technology]); 

    const handleStatusUpdate = (newStatus) => {
        updateStatus(technology.id, newStatus);
    };

    const handleNotesSave = (e) => {
        e.preventDefault();
        updateNotes(technology.id, notes);
        alert('Заметки сохранены!');
    };

    if (!technology) {
        return (
            <div className="page error-state">
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