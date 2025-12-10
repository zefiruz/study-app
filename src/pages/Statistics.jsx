// src/pages/Statistics.jsx
import React from 'react';
import useTechnologies from '../hooks/useTechnologies';
import './Statistics.css'; 

function Statistics() {
    // Используем useTechnologies для получения данных
    const { technologies, progress } = useTechnologies();

    const total = technologies.length;
    const completed = technologies.filter(t => t.status === 'completed').length;
    const inProgress = technologies.filter(t => t.status === 'in-progress').length;
    const notStarted = total - completed - inProgress;

    return (
        <div className="page">
            <h1>Статистика прогресса</h1>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Общий прогресс</h3>
                    <p className="stat-value">{progress}%</p>
                </div>
                <div className="stat-card">
                    <h3>Всего технологий</h3>
                    <p className="stat-value">{total}</p>
                </div>
                <div className="stat-card">
                    <h3>Выполнено</h3>
                    <p className="stat-value completed">{completed}</p>
                </div>
                <div className="stat-card">
                    <h3>В процессе</h3>
                    <p className="stat-value in-progress">{inProgress}</p>
                </div>
                <div className="stat-card">
                    <h3>Не начато</h3>
                    <p className="stat-value not-started">{notStarted}</p>
                </div>
            </div>
        </div>
    );
}

export default Statistics;