import React, { useState } from 'react'
import './ColorPicker.css'

function ColorDisplay({ color }) {
  return (
    <div
      className="color-display"
      style={{
        backgroundColor: color,
      }}
    >
      <p>Выбранный цвет: {color}</p>
    </div>
  )
}

function ColorControls({ color, onColorChange }) {
  const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff']
  
  return (
    <div className="color-controls">
      <h4>Выберите цвет:</h4>
      <div className="color-buttons">
        {colors.map((col) => (
          <button
            key={col}
            style={{ backgroundColor: col }}
            onClick={() => onColorChange(col)}
            className={color === col ? 'active' : ''}
            title={col}
          >
            {color === col ? '✓' : ''}
          </button>
        ))}
      </div>
    </div>
  )
}

function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState('#ff0000')

  return (
    <div className="color-picker">
      <h3>Выбор цвета (Lifting State Up)</h3>
      <ColorDisplay color={selectedColor} />
      <ColorControls 
        color={selectedColor}
        onColorChange={setSelectedColor}
      />
    </div>
  )
}

export default ColorPicker