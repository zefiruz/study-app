import React, { useState } from 'react'
import './Counter.css'

function Counter() {
  const [count, setCount] = useState(0)

  const increment = () => {
    setCount(count + 1)
  }

  const decrement = () => {
    setCount(count - 1)
  }

  const reset = () => {
    setCount(0)
  }

  return (
    <div className="counter">
      <h3>Счётчик: {count}</h3>
      <div className="counter-buttons">
        <button onClick={decrement} className="counter-btn decrement">-1</button>
        <button onClick={reset} className="counter-btn reset">Сбросить</button>
        <button onClick={increment} className="counter-btn increment">+1</button>
      </div>
      <p className="counter-info">Текущее значение: <strong>{count}</strong></p>
    </div>
  )
}

export default Counter