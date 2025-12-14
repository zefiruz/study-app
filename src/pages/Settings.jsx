// src/pages/Settings.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import DeadlineForm from '../components/DeadlineForm'; 

import './Settings.css'; 

function Settings() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken'); 
        localStorage.removeItem('registeredUser');
        
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
                <h2>Общие настройки</h2>
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
                        className="btn btn-danger"
                    >
                        Выйти из аккаунта
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Settings;