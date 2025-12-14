import { useNotification } from './useNotification'; 
import './QuickActions.css';

function QuickActions({ onMarkAllCompleted, onResetAll, onRandomSelect, technologies }) { 
    const { notify } = useNotification();

    const handleExport = () => {
        try {
            const data = {
                exportedAt: new Date().toISOString(),
                totalTechnologies: technologies.length,
                completed: technologies.filter(t => t.status === 'completed').length,
                technologies: technologies
            };
            
            const dataStr = JSON.stringify(data, null, 2);

            const dataBlob = new Blob([dataStr], { type: 'application/json' });
            const url = URL.createObjectURL(dataBlob);

            const link = document.createElement('a');
            link.href = url;
            
            link.download = `technologies_${new Date().toISOString().split('T')[0]}.json`;

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(url);
            
            notify(`Успешно экспортировано ${technologies.length} элементов!`, 'success');

        } catch (error) {
            console.error('Ошибка экспорта данных:', error);
            notify('Произошла ошибка при экспорте данных.', 'error');
        }
    };
    
    return (
        <div className="quick-actions">
            <h3>Быстрые действия</h3>
            <div className="action-buttons">
                <button 
                    onClick={onMarkAllCompleted} 
                    className="action-btn success-btn"
                >
                    ✓ Отметить все как выполненные
                </button>
                
                <button 
                    onClick={onResetAll} 
                    className="action-btn warning-btn"
                >
                    ⟳ Сбросить все статусы
                </button>
                
                {onRandomSelect && (
                    <button 
                        onClick={onRandomSelect} 
                        className="action-btn random-btn"
                    >
                        🎲 Выбрать случайную
                    </button>
                )}
                
                <button 
                    onClick={handleExport} 
                    className="action-btn info-btn"
                >
                    ⬇ Экспорт данных
                </button>
            </div>
        </div>
    );
}

export default QuickActions;