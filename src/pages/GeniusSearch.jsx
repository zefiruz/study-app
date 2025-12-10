import React, { useState } from 'react';
import useGeniusApi from '../hooks/useGeniusApi';
import './GeniusSearch.css';

function GeniusSearch() {
  const [query, setQuery] = useState('');
  const { data, loading, error, searchSongs } = useGeniusApi();

  const handleSearch = (e) => {
    e.preventDefault();
    searchSongs(query);
  };

  return (
    <div className="page genius-page">
      <h1>Поиск песен (Genius API)</h1>
      
      <form onSubmit={handleSearch} className="search-form">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Введите название песни или артиста..."
          className="genius-input"
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Поиск...' : 'Найти'}
        </button>
      </form>

      {error && <div className="error-message">Ошибка: {error}</div>}

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
      
      {!loading && data.length === 0 && !error && (
        <p className="placeholder-text">Введите запрос, чтобы найти музыку.</p>
      )}
    </div>
  );
}

export default GeniusSearch;