// src/components/BulkStatusEditor.jsx
import React, { useState } from 'react';
import './BulkStatusEditor.css';

const STATUS_OPTIONS = [
    { value: 'not-started', label: 'Не начато' },
    { value: 'in-progress', label: 'В процессе' },
    { value: 'completed', label: 'Завершено' },
];

// 🚨 ПРОПСЫ: ДОЛЖЕН ПРИНИМАТЬ bulkUpdateStatuses, А НЕ updateStatus
function BulkStatusEditor({ technologies, bulkUpdateStatuses, closeModal }) {
    const [selectedIds, setSelectedIds] = useState([]);
    const [newStatus, setNewStatus] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');

    const isAllSelected = selectedIds.length === technologies.length && technologies.length > 0;
    const isAnySelected = selectedIds.length > 0;

    // --- Логика выбора ---

    const handleSelectAll = () => {
        if (isAllSelected) {
            setSelectedIds([]);
        } else {
            // Приведение к числу для гарантии консистентности типов в selectedIds
            setSelectedIds(technologies.map(tech => Number(tech.id))); 
        }
    };

    const handleToggleSelect = (id) => {
        // Приведение входящего ID к числу
        const numericId = Number(id);

        setSelectedIds(prev =>
            prev.includes(numericId) ? prev.filter(techId => techId !== numericId) : [...prev, numericId]
        );
        setStatusMessage('');
    };

    // --- Логика применения изменений ---

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isAnySelected || !newStatus) {
            setStatusMessage('Выберите хотя бы одну технологию и новый статус.');
            return;
        }

        setIsSubmitting(true);
        setStatusMessage('Применение изменений...');

        try {
            // 🚨 КРИТИЧЕСКОЕ ИЗМЕНЕНИЕ: Один вызов для массового обновления
            bulkUpdateStatuses(selectedIds, newStatus); 
            
            const updatedCount = selectedIds.length;
            setStatusMessage(`Успешно обновлен статус ${updatedCount} технологий на "${STATUS_OPTIONS.find(o => o.value === newStatus)?.label}".`);
            
            setSelectedIds([]);
            setNewStatus('');

        } catch (error) {
            setStatusMessage('Ошибка при массовом обновлении. Попробуйте снова.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        // ... (остальной JSX)
        <div className="bulk-editor-modal" role="dialog" aria-modal="true" aria-labelledby="bulk-editor-title">
            <h2 id="bulk-editor-title">Массовое редактирование статусов</h2>
            
            <form onSubmit={handleSubmit} className="bulk-editor-form">
                
                {/* 1. Выбор нового статуса */}
                <div className="form-group">
                    <label htmlFor="new-status" className="form-label">Новый статус для выбранных:</label>
                    <select
                        id="new-status"
                        value={newStatus}
                        onChange={(e) => { setNewStatus(e.target.value); setStatusMessage(''); }}
                        required
                        className="form-input"
                        aria-label="Выберите новый статус для применения"
                        disabled={!isAnySelected || isSubmitting}
                    >
                        <option value="">-- Выберите статус --</option>
                        {STATUS_OPTIONS.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 2. Сообщения о состоянии */}
                {statusMessage && (
                    <div 
                        className={`status-message ${statusMessage.includes('Успешно') ? 'success' : 'error'}`} 
                        role="alert" 
                        aria-live="assertive"
                    >
                        {statusMessage}
                    </div>
                )}

                {/* 3. Кнопки управления */}
                <div className="bulk-actions-controls">
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={!isAnySelected || !newStatus || isSubmitting}
                    >
                        {isSubmitting ? 'Применение...' : `Применить к ${selectedIds.length} элементам`}
                    </button>
                    <button 
                        type="button" 
                        onClick={closeModal} 
                        className="btn btn-secondary"
                    >
                        Закрыть
                    </button>
                </div>
                
                {/* 4. Список выбора технологий */}
                <div className="technology-selection-list">
                    <div className="select-all-header">
                        <input
                            type="checkbox"
                            id="select-all"
                            checked={isAllSelected}
                            onChange={handleSelectAll}
                            aria-controls="tech-list-group"
                        />
                        <label htmlFor="select-all">Выбрать все ({selectedIds.length}/{technologies.length})</label>
                    </div>

                    <ul id="tech-list-group" className="tech-list-group" role="group" aria-label="Список технологий для выбора">
                        {technologies.map(tech => (
                            <li key={tech.id} className="tech-selection-item">
                                <input
                                    type="checkbox"
                                    id={`tech-${tech.id}`}
                                    checked={selectedIds.includes(tech.id)}
                                    onChange={() => handleToggleSelect(tech.id)}
                                    className="tech-checkbox"
                                />
                                <label htmlFor={`tech-${tech.id}`} className="tech-label">
                                    {tech.title} 
                                    <span className={`current-status status-${tech.status}`}>{STATUS_OPTIONS.find(o => o.value === tech.status)?.label}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </form>
        </div>
    );
}

export default BulkStatusEditor;