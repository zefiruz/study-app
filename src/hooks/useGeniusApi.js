import { useState, useRef, useCallback } from 'react';

function useGeniusApi(delay = 500) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const timerRef = useRef(null);

    const ACCESS_TOKEN = 'DY8nLyGIdy1FwvaIjFPzZahztlc-_Es68OJt-RTt39Y0e348OimSSVGZPR32Zcj1';

    const executeSearch = async (query) => {
        if (!query) return;

        setLoading(true);
        setError(null);
        setData([]);

        const GENIUS_API_URL = `https://api.genius.com/search?q=${encodeURIComponent(query)}`;
        const PROXY_URL = `https://corsproxy.io/?` + encodeURIComponent(GENIUS_API_URL);

        try {
            const response = await fetch(PROXY_URL, {
                headers: { 'Authorization': `Bearer ${ACCESS_TOKEN}` }
            });

            if (!response.ok) throw new Error(`Ошибка: ${response.status}`);

            const jsonData = await response.json();
            if (jsonData.meta && jsonData.meta.status !== 200) {
                throw new Error(`Ошибка API: ${jsonData.meta.message || 'Неизвестная ошибка'}`);
            }

            setData(jsonData.response.hits);
        } catch (err) {
            setError(`Поиск не удался: ${err.message}`);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const debouncedSearchSongs = useCallback((query) => {
        if (timerRef.current) clearTimeout(timerRef.current);
        
        if (!query || query.trim() === '') {
            setData([]);
            setError(null);
            setLoading(false);
            return;
        }

        timerRef.current = setTimeout(() => executeSearch(query), delay);
    }, [delay]);

    return { data, loading, error, searchSongs: debouncedSearchSongs };
}

export default useGeniusApi;