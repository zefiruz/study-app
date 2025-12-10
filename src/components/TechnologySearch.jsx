import React, { useState, useEffect } from 'react';

function TechnologySearch({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Устанавливаем таймер
    const timerId = setTimeout(() => {
      onSearch(searchTerm);
    }, 500); 

    // Очистка таймера при каждом новом нажатии клавиши
    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm, onSearch]);

  return (
    <div className="search-box" style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Поиск технологий (с задержкой)..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: '100%', padding: '10px' }}
      />
    </div>
  );
}

export default TechnologySearch;