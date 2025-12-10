import useLocalStorage from './useLocalStorage';

const initialTechnologies = [
  { id: 1, title: 'React Components', description: 'Изучение функциональных и классовых компонентов', status: 'not-started', notes: '', category: 'frontend' },
  { id: 2, title: 'JSX Syntax', description: 'Освоение синтаксиса JSX', status: 'not-started', notes: '', category: 'frontend' },
  { id: 3, title: 'useState Hook', description: 'Работа с состоянием в компонентах', status: 'not-started', notes: '', category: 'frontend' },
  { id: 4, title: 'Node.js Basics', description: 'Основы серверного JavaScript', status: 'not-started', notes: '', category: 'backend' },
  { id: 5, title: 'Express.js', description: 'Создание серверов на Node.js', status: 'not-started', notes: '', category: 'backend' },
  { id: 6, title: 'MongoDB', description: 'Работа с базой данных', status: 'not-started', notes: '', category: 'backend' },
];

// Хук для работы с технологиями
function useTechnologies() {
  const [technologies, setTechnologies] = useLocalStorage('technologies', initialTechnologies);

  // Вспомогательная функция для отправки события об обновлении данных
  const dispatchUpdateEvent = () => {
    window.dispatchEvent(new Event('technologiesUpdated'));
  };

  const markAllCompleted = () => {
    setTechnologies(prevTech =>
      prevTech.map(tech => ({ ...tech, status: 'completed' }))
    );
    dispatchUpdateEvent(); // Отправляем событие
  };

  const resetAll = () => {
    setTechnologies(prevTech =>
      prevTech.map(tech => ({ ...tech, status: 'not-started' }))
    );
    dispatchUpdateEvent(); // Отправляем событие
  };

  const chooseRandomTechnology = () => {
    const notStartedTech = technologies.filter(tech => tech.status === 'not-started')
    
    if (notStartedTech.length === 0) {
      alert('Все технологии уже начаты или завершены!')
      return
    }
    
    const randomTech = notStartedTech[Math.floor(Math.random() * notStartedTech.length)]
    
    updateStatus(randomTech.id, 'in-progress')
    alert(`Выбрана технология: ${randomTech.title}`)
  }

  // Обновление статуса
  const updateStatus = (techId, newStatus) => {
    setTechnologies(prev =>
      prev.map(tech =>
        tech.id === techId ? { ...tech, status: newStatus } : tech
      )
    );
    dispatchUpdateEvent(); // Отправляем событие
  };

  // Обновление заметок
  const updateNotes = (techId, newNotes) => {
    setTechnologies(prev =>
      prev.map(tech =>
        tech.id === techId ? { ...tech, notes: newNotes } : tech
      )
    );
    dispatchUpdateEvent(); // Отправляем событие
  };

  // Расчет прогресса
  const calculateProgress = () => {
    if (technologies.length === 0) return 0;
    const completed = technologies.filter(tech => tech.status === 'completed').length;
    return Math.round((completed / technologies.length) * 100);
  };

  return {
    technologies,
    setTechnologies,
    updateStatus,
    updateNotes,
    markAllCompleted, 
    resetAll,
    chooseRandomTechnology,
    progress: calculateProgress()
  };
}

export default useTechnologies;