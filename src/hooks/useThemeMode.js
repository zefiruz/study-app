// src/hooks/useThemeMode.js

import React, { useState, useMemo, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';

const THEME_STORAGE_KEY = 'appThemeMode';

export const useThemeMode = () => {
    const [mode, setMode] = useState(() => {
        return localStorage.getItem(THEME_STORAGE_KEY) || 'light';
    });

    useEffect(() => {
        localStorage.setItem(THEME_STORAGE_KEY, mode);
    }, [mode]);

    const toggleColorMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: mode, 
                    primary: {
                        main: '#1976d2',
                    },
                    secondary: {
                        main: '#dc004e',
                    },
                    ...(mode === 'dark' && {
                        background: {
                            default: '#121212',
                            paper: '#1e1e1e',
                        },
                    }),
                },
            }),
        [mode],
    );

    return {
        theme,
        mode,
        toggleColorMode,
    };
};