// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';
import './Home.css';

const ProgressBar = ({ progress }) => (
    <div className="progress-bar-placeholder">
        <div style={{ width: `${progress}%`, backgroundColor: 'var(--success)', height: '20px', borderRadius: '4px' }}></div>
        <p style={{ margin: '5px 0', color: 'var(--text-secondary)' }}>Общий прогресс: {progress}%</p>
    </div>
);


function Home() {
    const { progress } = useTechnologies();
    
    return (
        <div className="page home-content">
            <h1>Добро пожаловать в Трекер технологий!</h1>
            <p>
                Ваш трекер помогает отслеживать прогресс в изучении frontend и backend технологий.
            </p>
            
            <div className="home-info-box">
                <h2>Ваш текущий прогресс</h2>
                <ProgressBar progress={progress} />
                <p>
                    <Link to="/technologies">Перейти к списку технологий</Link>
                </p>
            </div>
            
        </div>
    );
}

export default Home;