import React, { useState, useContext, createContext } from 'react';
import { Snackbar, Alert } from '@mui/material';

const NotificationContext = createContext();

// Хук для использования уведомлений в других компонентах
export const useNotification = () => {
    return useContext(NotificationContext);
};

export default function NotificationProvider({ children }) {
    const [open, setOpen] = useState(false);
    const [notification, setNotification] = useState({ 
        message: '', 
        type: 'info' 
    });

    const notify = (message, type = 'info') => {
        setNotification({ message, type });
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const contextValue = { notify };

    return (
        <NotificationContext.Provider value={contextValue}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
                <Alert 
                    onClose={handleClose} 
                    severity={notification.type} 
                    sx={{ width: '100%' }}
                    variant="filled"
                >
                    {notification.message}
                </Alert>
            </Snackbar>
        </NotificationContext.Provider>
    );
}