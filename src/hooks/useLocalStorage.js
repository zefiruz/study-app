import { useState, useEffect } from 'react';

// Хук для работы с localStorage
function useLocalStorage(key, initialValue) {
  // Создаем состояние
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Пытаемся взять данные из localStorage
      const item = localStorage.getItem(key);
      // Если что-то есть, превращаем из строки в объект
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Если ошибка, используем начальное значение
      console.log('Ошибка при чтении из localStorage');
      return initialValue;
    }
  });

  // Функция для сохранения данных
  const setValue = (value) => {
    try {
      // Если передали функцию, вызываем ее
      const valueToStore = typeof value === 'function' ? value(storedValue) : value;
      
      // Сохраняем в состояние
      setStoredValue(valueToStore);
      
      // Сохраняем в localStorage
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log('Ошибка при записи в localStorage');
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;