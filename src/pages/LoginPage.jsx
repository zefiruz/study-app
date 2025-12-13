// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';

// 🚨 Ключ для хранения данных пользователя в localStorage
const LOCAL_STORAGE_USER_KEY = 'registeredUser'; 

// Вспомогательная функция для получения данных пользователя из localStorage
const getStoredUser = () => {
    // 🚨 ИСПРАВЛЕНИЕ: Используем LOCAL_STORAGE_USER_KEY
    const userJson = localStorage.getItem(LOCAL_STORAGE_USER_KEY); 
    if (userJson) {
        try {
            return JSON.parse(userJson);
        } catch (e) {
            console.error("Ошибка парсинга данных пользователя:", e);
            return null;
        }
    }
    return null;
};


function LoginPage({ onLoginSuccess }) {
    const [isLogin, setIsLogin] = useState(true); 
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const mode = isLogin ? 'Вход' : 'Регистрация';

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError(null);
    };

    const handleSuccess = () => {
        localStorage.setItem('authToken', 'fake-token-' + Math.random().toString(36).substring(2, 9));
        if (onLoginSuccess) onLoginSuccess();
        navigate('/'); // Перенаправляем на главную страницу
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLogin) {
                // 1. Проверяем жестко заданного тестового пользователя
                if (formData.email === 'test@mail.ru' && formData.password === '123') {
                    handleSuccess();
                    return;
                }
                
                // 2. Проверяем данные, сохраненные при регистрации
                const storedUser = getStoredUser();
                
                if (storedUser && storedUser.email === formData.email && storedUser.password === formData.password) {
                    handleSuccess();
                    return;
                }

                throw new Error('Неверный email или пароль.');

            } else {
                // РЕЖИМ РЕГИСТРАЦИИ: сохраняем данные в localStorage
                const userToStore = { email: formData.email, password: formData.password };
                localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(userToStore));
                
                alert(`Пользователь ${formData.email} успешно зарегистрирован! Теперь войдите в систему.`);
                setFormData({ email: formData.email, password: '' }); 
                setIsLogin(true); // Переключаемся на Вход
            }
        } catch (err) {
            console.error('Ошибка аутентификации:', err.message);
            setError(err.message || `Ошибка ${mode}. Попробуйте снова.`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="page login-page">
            <div className="auth-container">
                <h2>{mode}</h2>
                
                <form onSubmit={handleSubmit} className="auth-form">
                    
                    {error && <div className="error-message auth-error">{error}</div>}

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="auth-input"
                            placeholder="example@mail.com"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="auth-input"
                            placeholder="••••••••"
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="btn btn-primary btn-full-width" 
                        disabled={loading}
                    >
                        {loading ? 'Загрузка...' : mode}
                    </button>
                </form>

                <div className="auth-footer">
                    <p>
                        {isLogin ? 'Нет аккаунта?' : 'Уже зарегистрированы?'}
                        <button 
                            type="button"
                            className="btn-link-toggle"
                            onClick={() => setIsLogin(!isLogin)}
                            disabled={loading}
                        >
                            {isLogin ? 'Зарегистрироваться' : 'Войти'}
                        </button>
                    </p>
                </div>
                
                <Link to="/" className="back-link">
                    ← Вернуться на главную
                </Link>
            </div>
        </div>
    );
}

export default LoginPage;