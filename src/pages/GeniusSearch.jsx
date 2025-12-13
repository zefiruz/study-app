// src/pages/GeniusSearch.jsx
import React, { useState, useEffect } from 'react'; // 🚨 useEffect теперь не нужен, но оставим React и useState
import useGeniusApi from '../hooks/useGeniusApi';
import './GeniusSearch.css';

function GeniusSearch() {
    const [query, setQuery] = useState('');
    
    const { data, loading, error, searchSongs } = useGeniusApi(); 

    const handleChange = (e) => {
        const newQuery = e.target.value;
        setQuery(newQuery); 
        searchSongs(newQuery); 
    };

    return (
        <div className="page genius-page">
            <h1>Поиск песен (Genius API)</h1>
            
            <div className="search-input-container">
                <input 
                    type="text" 
                    value={query}
                    onChange={handleChange}
                    placeholder="Введите название песни или артиста..."
                    className="genius-input"
                />
            </div>

            {loading && <div className="loading-indicator">Загрузка результатов...</div>}
            
            {error && <div className="error-message">Ошибка: {error}</div>}

            {query.trim() !== '' && !loading && data.length > 0 && (
                <div className="songs-grid">
                    {data.map((hit) => {
                        const song = hit.result;
                        return (
                            <div key={song.id} className="song-card">
                                <img src={song.header_image_thumbnail_url} alt={song.title} className="song-img"/>
                                <div className="song-info">
                                    <h3>{song.title}</h3>
                                    <p className="artist">{song.artist_names}</p>
                                    <a href={song.url} target="_blank" rel="noopener noreferrer" className="btn-link">
                                        Смотреть текст на Genius
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            
            {query.trim() !== '' && !loading && data.length === 0 && !error && (
                <p className="no-results-text">По вашему запросу ничего не найдено.</p>
            )}
            
            {query.trim() === '' && !loading && (
                <p className="placeholder-text">Начните вводить запрос, чтобы увидеть результаты поиска.</p>
            )}
        </div>
    );
}

export default GeniusSearch;