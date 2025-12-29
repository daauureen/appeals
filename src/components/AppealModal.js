import React from 'react';

function AppealModal({ appeal, onClose }) {
  if (!appeal) return null;

  const getStatusColor = (status) => {
    if (status === 'В работе') return '#f39c12';
    if (status === 'Решено') return '#27ae60';
    if (status === 'Отклонено') return '#e74c3c';
    return '#95a5a6';
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Обращение #{appeal.id}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="info-grid">
            <div className="info-item">
              <div className="info-label">Категория:</div>
              <div className="info-value">{appeal.category}</div>
            </div>
            
            <div className="info-item">
              <div className="info-label">Статус:</div>
              <div className="info-value status" style={{ color: getStatusColor(appeal.status) }}>
                {appeal.status}
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-label">Адрес:</div>
              <div className="info-value">{appeal.address}</div>
            </div>
            
            <div className="info-item">
              <div className="info-label">Дата:</div>
              <div className="info-value">{appeal.created_at}</div>
            </div>
          </div>
          
          <div className="description-section">
            <h3>Описание</h3>
            <div className="description-text">{appeal.description}</div>
          </div>
          
          <div className="coordinates-section">
            <h3>Координаты</h3>
            <div className="coordinates-grid">
              <div className="coordinate">
                <div>Широта:</div>
                <div>{appeal.latitude}</div>
              </div>
              <div className="coordinate">
                <div>Долгота:</div>
                <div>{appeal.longitude}</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="close-button" onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 20px;
        }
        
        .modal-content {
          background: white;
          border-radius: 8px;
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
        }
        
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #eee;
          background: #f5f5f5;
        }
        
        .modal-header h2 {
          margin: 0;
          font-size: 20px;
        }
        
        .close-btn {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          width: 30px;
          height: 30px;
        }
        
        .close-btn:hover {
          color: #e74c3c;
        }
        
        .modal-body {
          padding: 20px;
        }
        
        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
          margin-bottom: 20px;
        }
        
        .info-label {
          font-size: 14px;
          color: #666;
          margin-bottom: 5px;
        }
        
        .info-value {
          font-size: 16px;
        }
        
        .status {
          font-weight: bold;
        }
        
        .description-section {
          margin-bottom: 20px;
        }
        
        .description-section h3 {
          margin: 0 0 10px 0;
          font-size: 18px;
        }
        
        .description-text {
          background: #f5f5f5;
          padding: 15px;
          border-radius: 4px;
          line-height: 1.5;
        }
        
        .coordinates-section h3 {
          margin: 0 0 10px 0;
          font-size: 18px;
        }
        
        .coordinates-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        
        .coordinate {
          background: #f5f5f5;
          padding: 10px;
          border-radius: 4px;
          display: flex;
          justify-content: space-between;
        }
        
        .modal-footer {
          padding: 20px;
          border-top: 1px solid #eee;
          text-align: right;
        }
        
        .close-button {
          background: #1890ff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .close-button:hover {
          background: #40a9ff;
        }
        
        @media (max-width: 768px) {
          .info-grid {
            grid-template-columns: 1fr;
          }
          
          .coordinates-grid {
            grid-template-columns: 1fr;
          }
          
          .modal-content {
            max-height: 95vh;
          }
        }
      `}</style>
    </div>
  );
}

export default AppealModal;