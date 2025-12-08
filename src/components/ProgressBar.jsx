// src/components/ProgressBar.jsx
function ProgressBar({
  progress,
  label = '',
  color = '#4CAF50',
  height = 20,
  showPercentage = true,
  animated = false
}) {
  // Убеждаемся что прогресс от 0 до 100
  const normalizedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className="progress-bar-container">
      {/* Заголовок */}
      {(label || showPercentage) && (
        <div className="progress-bar-header">
          {label && <span className="progress-label">{label}</span>}
          {showPercentage && (
            <span className="progress-percentage">{normalizedProgress}%</span>
          )}
        </div>
      )}

      {/* Сам прогресс-бар */}
      <div
        className="progress-bar-outer"
        style={{
          height: `${height}px`,
          backgroundColor: '#f0f0f0',
          borderRadius: '10px',
          overflow: 'hidden',
          marginTop: '5px'
        }}
      >
        <div
          className={`progress-bar-inner ${animated ? 'animated' : ''}`}
          style={{
            width: `${normalizedProgress}%`,
            backgroundColor: color,
            height: '100%',
            transition: animated ? 'width 0.5s ease-in-out' : 'none',
            borderRadius: '10px'
          }}
        />
      </div>
    </div>
  );
}

export default ProgressBar;