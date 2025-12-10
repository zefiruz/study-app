// src/pages/AddTechnology.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useTechnologies from '../hooks/useTechnologies';
import './AddTechnology.css';

function AddTechnology() {
    const { technologies, setTechnologies } = useTechnologies();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('frontend');
    const [status] = useState('not-started'); // По умолчанию новая технология не начата

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !description) {
            alert('Пожалуйста, заполните название и описание.');
            return;
        }

        const newId = technologies.length > 0 ? Math.max(...technologies.map(t => t.id)) + 1 : 1;

        const newTech = {
            id: newId,
            title,
            description,
            status,
            notes: '',
            category,
        };

        // Обновляем список технологий
        setTechnologies(prev => [...prev, newTech]);
        
        // Отправляем событие об обновлении, чтобы TechnologyList обновился
        window.dispatchEvent(new Event('technologiesUpdated'));

        alert(`Технология "${title}" успешно добавлена!`);
        navigate('/technologies'); // Переход на страницу списка
    };

    return (
        <div className="page">
            <h1>Добавить новую технологию</h1>
            
            <form className="form-add-technology" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Название технологии:</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Описание:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category">Категория:</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="frontend">Frontend</option>
                        <option value="backend">Backend</option>
                        <option value="database">База данных</option>
                        <option value="devops">DevOps</option>
                    </select>
                </div>

                <button type="submit" className="btn btn-primary">
                    Добавить в трекер
                </button>
            </form>
        </div>
    );
}

export default AddTechnology;