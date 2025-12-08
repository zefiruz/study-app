import React, { useState } from 'react'
import './RegistrationForm.css'

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Валидация email
    if (name === 'email') {
      if (value && !value.includes('@')) {
        setErrors(prev => ({ ...prev, email: 'Некорректный email' }))
      } else {
        setErrors(prev => ({ ...prev, email: '' }))
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!errors.email) {
      alert(`Добро пожаловать, ${formData.name}!`)
      console.log('Данные формы:', formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <h3>Форма регистрации</h3>
      
      <div className="form-group">
        <label>Имя:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label>Пароль:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="submit-btn">Зарегистрироваться</button>
    </form>
  )
}

export default RegistrationForm