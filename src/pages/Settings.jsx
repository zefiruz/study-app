// src/pages/Settings.jsx
import React from 'react';

import './Settings.css'; 

function Settings() {
    // Логика useTechnologies и handleFactoryReset удалена

    return (
        <div className="page">
            <h1>Настройки приложения</h1>
            
            {/* Секция управления данными удалена */}

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
            </div>
        </div>
    );
}

export default Settings;