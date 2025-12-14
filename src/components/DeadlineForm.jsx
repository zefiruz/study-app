// src/components/DeadlineForm.jsx
import React, { useState, useEffect } from 'react';
import './DeadlineForm.css'; // Создадим стили для этой формы

const DEADLINE_KEY = 'studyDeadline';

// --- Функции валидации ---

const validateDate = (dateString) => {
    if (!dateString) {
        return 'Срок не может быть пустым.';
    }
    const selectedDate = new Date(dateString);
    const today = new Date();
    
    // Сбрасываем время для точного сравнения дат
    today.setHours(0, 0, 0, 0); 
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
        return 'Дата не может быть в прошлом.';
    }
    return null; // Валидация пройдена
};

// --- Основной компонент ---

function DeadlineForm() {
    // Состояние для хранения выбранной даты и ошибки
    const [deadline, setDeadline] = useState('');
    const [error, setError] = useState(null);
    const [isSaved, setIsSaved] = useState(false);
    
    // Эффект для загрузки сохраненного срока при монтировании
    useEffect(() => {
        const savedDeadline = localStorage.getItem(DEADLINE_KEY);
        if (savedDeadline) {
            setDeadline(savedDeadline);
        }
    }, []);

    // Функция для получения минимальной даты (сегодня) в формате YYYY-MM-DD
    const getMinDate = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Обработчик изменения ввода (валидация в реальном времени)
    const handleChange = (e) => {
        const newDate = e.target.value;
        setDeadline(newDate);
        setIsSaved(false);

        // Валидация в реальном времени
        const validationError = validateDate(newDate);
        setError(validationError);
    };

    // Обработчик отправки формы
    const handleSubmit = (e) => {
        e.preventDefault();

        // Финальная валидация
        const validationError = validateDate(deadline);
        if (validationError) {
            setError(validationError);
            return;
        }

        // Сохранение данных (имитация API запроса)
        localStorage.setItem(DEADLINE_KEY, deadline);
        setError(null);
        setIsSaved(true);
        
        // Оповещение о сохранении
        setTimeout(() => setIsSaved(false), 3000);
    };

    return (
        <div className="deadline-form-container">
            <h2>Установка глобального срока</h2>
            <p className="form-description">
                Установите желаемую дату завершения изучения всех технологий.
            </p>

            <form onSubmit={handleSubmit} className="deadline-form" aria-live="polite">
                <div className="form-group">
                    <label 
                        htmlFor="study-deadline" 
                        className="form-label"
                    >
                        Дата окончания изучения
                    </label>
                    <input
                        type="date"
                        id="study-deadline"
                        name="study-deadline"
                        value={deadline}
                        onChange={handleChange}
                        onBlur={handleChange} // Повторная валидация при потере фокуса
                        min={getMinDate()} // Нельзя выбрать прошедшую дату через UI
                        required
                        className={`form-input ${error ? 'input-error' : ''}`}
                        aria-invalid={!!error}
                        aria-describedby={error ? 'deadline-error-msg' : undefined}
                    />
                </div>
                
                {error && (
                    <div id="deadline-error-msg" className="error-message" role="alert">
                        {error}
                    </div>
                )}
                
                <div className="form-actions">
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={!!error} 
                    >
                        {isSaved ? 'Сохранено!' : 'Сохранить срок'}
                    </button>
                    {isSaved && <span className="save-status" aria-hidden="true">✔</span>}
                </div>
            </form>
            
            {/* Отображение текущего срока (если есть) */}
            {deadline && !isSaved && (
                <p className="current-deadline">
                    Текущий срок установлен до: <strong>{new Date(deadline).toLocaleDateString()}</strong>
                </p>
            )}
        </div>
    );
}

export default DeadlineForm;