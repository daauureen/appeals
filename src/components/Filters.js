import React from 'react';

function Filters({ filters, onStatusChange, onSearchChange }) {
  return (
    <div className="filters">
      <div className="filter-group">
        <input
          type="text"
          placeholder="Поиск..."
          value={filters.search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
      </div>
      
      <div className="filter-group">
        <div className="status-buttons">
          <button
            className={filters.status === '' ? 'active' : ''}
            onClick={() => onStatusChange('')}
          >
            Все
          </button>
          <button
            className={filters.status === 'В работе' ? 'active' : ''}
            onClick={() => onStatusChange('В работе')}
          >
            В работе
          </button>
          <button
            className={filters.status === 'Решено' ? 'active' : ''}
            onClick={() => onStatusChange('Решено')}
          >
            Решено
          </button>
          <button
            className={filters.status === 'Отклонено' ? 'active' : ''}
            onClick={() => onStatusChange('Отклонено')}
          >
            Отклонено
          </button>
        </div>
      </div>

      <style jsx>{`
        .filters {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
          padding: 15px;
          background: white;
          border-radius: 8px;
        }
        
        .filter-group {
          flex: 1;
        }
        
        .search-input {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }
        
        .status-buttons {
          display: flex;
          gap: 10px;
        }
        
        .status-buttons button {
          padding: 8px 12px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .status-buttons button:hover {
          background: #f5f5f5;
        }
        
        .status-buttons .active {
          background: #1890ff;
          color: white;
          border-color: #1890ff;
        }
      `}</style>
    </div>
  );
}

export default Filters;