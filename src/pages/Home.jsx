// src/pages/Home.jsx
import React, { useState, useEffect, useMemo } from 'react'; // 🚨 Добавлен useMemo
import { Link } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';
import './Home.css';

const DEADLINE_KEY = 'studyDeadline';

const ProgressBar = ({ progress }) => {
    const clampedProgress = Math.max(0, Math.min(100, progress));

    return (
        <div 
            className="progress-bar-placeholder" 
            role="progressbar" 
            aria-valuenow={clampedProgress} 
            aria-valuemin="0" 
            aria-valuemax="100"
        >
            <div 
                className="progress-bar-fill"
                style={{ width: `${clampedProgress}%` }}
            >
                <span className="progress-percentage">
                    {clampedProgress}%
                </span>
            </div>
        </div>
    );
};

// --- Вспомогательный компонент: Статус срока ---
const DeadlineStatus = ({ deadline }) => {
    // Вычисляем оставшиеся дни
    const daysLeft = useMemo(() => {
        if (!deadline) return null;

        const targetDate = new Date(deadline);
        const today = new Date();
        
        // Сбрасываем время для расчета дней
        targetDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        const diffTime = targetDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return diffDays;
    }, [deadline]);

    if (!deadline) {
        return (
            <p className="deadline-status-message not-set">
                Срок изучения **не установлен**. 
                <Link to="/settings">Установить сейчас</Link>.
            </p>
        );
    }
    
    const formattedDate = new Date(deadline).toLocaleDateString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    let statusClass = 'status-ok';
    let message = `**${daysLeft}** дн. до ${formattedDate}`;

    if (daysLeft < 0) {
        statusClass = 'status-late';
        message = `⚠️ Срок **истек** ${Math.abs(daysLeft)} дн. назад.`;
    } else if (daysLeft <= 7) {
        statusClass = 'status-warning';
        message = `🔥 Осталось всего **${daysLeft}** дн. до ${formattedDate}!`;
    }


    return (
        <div className={`deadline-status-message ${statusClass}`} role="status">
            <p>
                **Целевой срок:** {formattedDate}
            </p>
            <p className="days-left-message">
                {message}
            </p>
        </div>
    );
};


function Home() {
    const { progress } = useTechnologies();
    const [studyDeadline, setStudyDeadline] = useState(null);

    // Загрузка срока из localStorage
    useEffect(() => {
        const savedDeadline = localStorage.getItem(DEADLINE_KEY);
        if (savedDeadline) {
            setStudyDeadline(savedDeadline);
        }
    }, []);
    
    return (
        <div className="page home-content">
            <h1>Добро пожаловать в Трекер технологий!</h1>
            <p>
                Ваш трекер помогает отслеживать прогресс в изучении frontend и backend технологий.
            </p>
            
            <div className="home-info-box">
                <h2>Ваш текущий прогресс</h2>
                <ProgressBar progress={progress} />
            </div>

            {/* 🚨 НОВЫЙ БЛОК СРОКА */}
            <div className="home-info-box deadline-box">
                <h2>Срок изучения</h2>
                <DeadlineStatus deadline={studyDeadline} />
            </div>
            
            <div className="quick-links">
                <Link to="/technologies" className="btn btn-primary">Перейти к списку технологий</Link>
                <Link to="/add-technology" className="btn btn-secondary">Добавить новую технологию</Link>
            </div>
            
        </div>
    );
}

export default Home;