// src/pages/Settings.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom'; // 🚨 Импортируем useNavigate
import DeadlineForm from '../components/DeadlineForm'; 

import './Settings.css'; 

function Settings() {
    const navigate = useNavigate(); // 🚨 Инициализируем useNavigate

    const handleLogout = () => {
        // 1. Удаляем токен аутентификации из localStorage
        localStorage.removeItem('authToken'); 
        localStorage.removeItem('registeredUser'); // Очистка тестовых данных, если необходимо

        // 2. Опционально: Очистка других состояний (если бы использовался Context или Redux)
        
        // 3. Перенаправляем пользователя на главную страницу (или /login)
        alert('Вы успешно вышли из аккаунта.');
        navigate('/'); 
    };

    return (
        <div className="page">
            <div className="page-header">
                <h1>Настройки приложения</h1>
            </div>

            <div className="settings-section">
                <DeadlineForm />
            </div>

            <div className="settings-section">
                <h2>Общие настройки (Заглушки)</h2>
                <p>
                    <button onClick={() => alert('Настройки уведомлений сохранены!')} className="btn btn-secondary">
                        Сохранить настройки уведомлений
                    </button>
                </p>
                <p>
                    <button onClick={() => alert('Тема изменена на темную!')} className="btn btn-secondary">
                        Переключить на темную тему
                    </button>
                </p>
                <p>
                    <button onClick={() => alert('Язык изменен на английский!')} className="btn btn-secondary">
                        Изменить язык
                    </button>
                </p>
                
                <div className="logout-section">
                    <button 
                        onClick={handleLogout} 
                        className="btn btn-danger" // Используем класс 'btn-danger' для визуального выделения
                    >
                        Выйти из аккаунта
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Settings;