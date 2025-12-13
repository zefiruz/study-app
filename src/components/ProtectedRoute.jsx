import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// 🚨 Замените это на ваш реальный хук или контекст аутентификации
function useAuth() {
    // В реальном приложении здесь будет логика проверки токена, 
    // состояния пользователя из контекста или Redux
    const isAuthenticated = localStorage.getItem('authToken') !== null;
    return isAuthenticated;
}

const ProtectedRoute = () => {
    const isAuthenticated = useAuth();
    
    // Если пользователь авторизован, отображаем дочерний маршрут (Outlet)
    if (isAuthenticated) {
        return <Outlet />;
    } 
    
    // Иначе, перенаправляем на страницу входа
    return <Navigate to="/login" replace />;
};

export default ProtectedRoute;