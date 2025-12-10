// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // <-- Добавляем импорт Link
import './Home.css';

function Home() {
    return (
        <div className="page">
            <h1>Добро пожаловать в Трекер технологий!</h1>
            <p>Начните с просмотра <Link to="/technologies">Всех технологий</Link> или перейдите в <Link to="/statistics">Статистику</Link>.</p>
            {/* Здесь можно добавить компонент ProgressBar из App.jsx */}
        </div>
    );
}

export default Home;