// src/components/DeadlineForm.jsx
import React, { useState, useCallback } from 'react';
import './DeadlineForm.css';


const initialData = {
    startDate: '',
    endDate: '',
};

function DeadlineForm() {
    const [formData, setFormData] = useState(initialData);
    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validate = useCallback((data) => {
        const newErrors = {};
        const start = new Date(data.startDate);
        const end = new Date(data.endDate);

        if (!data.startDate) {
            newErrors.startDate = 'Дата начала не может быть пустой.';
        }
        if (!data.endDate) {
            newErrors.endDate = 'Дата завершения не может быть пустой.';
        }

        if (data.startDate && data.endDate && start >= end) {
            newErrors.endDate = 'Дата завершения должна быть строго позже даты начала.';
        }

        if (data.endDate && end < new Date()) {
             newErrors.endDate = 'Дата завершения не может быть в прошлом.';
        }


        return newErrors;
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);

        if (isSubmitted) {
            const validationErrors = validate(newFormData);
            setErrors(validationErrors);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsSubmitted(true); 

        const validationErrors = validate(formData);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.log('Сроки изучения установлены:', formData);
            alert(`Сроки успешно установлены: ${formData.startDate} по ${formData.endDate}`);
        }
    };

    return (
        <form className="deadline-form" onSubmit={handleSubmit} noValidate>
            <h3>Установка сроков изучения</h3>
            <p className="form-tip">Укажите желаемые сроки для завершения всего технологического трекера.</p>

            <div className="form-group">
                <label htmlFor="startDate">Дата начала:</label>
                <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    // ARIA-атрибуты для доступности
                    aria-required="true"
                    aria-invalid={!!errors.startDate}
                    aria-describedby={errors.startDate ? 'error-start-date' : undefined}
                />
                {errors.startDate && (
                    <span id="error-start-date" className="error-message" role="alert">
                        {errors.startDate}
                    </span>
                )}
            </div>

            <div className="form-group">
                <label htmlFor="endDate">Дата завершения:</label>
                <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    // ARIA-атрибуты для доступности
                    aria-required="true"
                    aria-invalid={!!errors.endDate}
                    aria-describedby={errors.endDate ? 'error-end-date' : undefined}
                />
                {errors.endDate && (
                    <span id="error-end-date" className="error-message" role="alert">
                        {errors.endDate}
                    </span>
                )}
            </div>

            <button type="submit" className="btn btn-primary">
                Установить сроки
            </button>
        </form>
    );
}

export default DeadlineForm;