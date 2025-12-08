import React, { useState } from 'react'
import './TechnologyNotes.css'

function TechnologyNotes({ notes, onNotesChange, techId }) {
  const [localNotes, setLocalNotes] = useState(notes || '')
  
  const handleChange = (e) => {
    const value = e.target.value
    setLocalNotes(value)
    onNotesChange(techId, value)
  }
  
  return (
    <div className="notes-section">
      <h4>Мои заметки:</h4>
      <textarea
        value={localNotes}
        onChange={handleChange}
        placeholder="Записывайте сюда важные моменты..."
        rows="3"
        className="notes-textarea"
      />
      <div className="notes-hint">
        {localNotes.length > 0 
          ? `Заметка сохранена (${localNotes.length} символов)` 
          : 'Добавьте заметку'
        }
      </div>
    </div>
  )
}

export default TechnologyNotes