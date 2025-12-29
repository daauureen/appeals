import React from 'react';

function AppealsTable({ appeals, onSelect }) {
  const getStatusColor = (status) => {
    if (status === 'В работе') return '#f39c12';
    if (status === 'Решено') return '#27ae60';
    if (status === 'Отклонено') return '#e74c3c';
    return '#95a5a6';
  };

  return (
    <div className="table-container">
      <table className="appeals-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Категория</th>
            <th>Адрес</th>
            <th>Статус</th>
            <th>Дата</th>
          </tr>
        </thead>
        <tbody>
          {appeals.length === 0 ? (
            <tr>
              <td colSpan="5" className="no-data">
                Нет данных
              </td>
            </tr>
          ) : (
            appeals.map(appeal => (
              <tr 
                key={appeal.id} 
                onClick={() => onSelect(appeal)}
                className="table-row"
              >
                <td>{appeal.id}</td>
                <td>{appeal.category}</td>
                <td>{appeal.address}</td>
                <td>
                  <span 
                    className="status-badge"
                    style={{ background: getStatusColor(appeal.status) }}
                  >
                    {appeal.status}
                  </span>
                </td>
                <td>{appeal.created_at}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <style jsx>{`
        .table-container {
          overflow-x: auto;
        }
        
        .appeals-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .appeals-table th {
          background: #2c3e50;
          color: white;
          padding: 12px;
          text-align: left;
        }
        
        .appeals-table td {
          padding: 12px;
          border-bottom: 1px solid #eee;
        }
        
        .table-row {
          cursor: pointer;
        }
        
        .table-row:hover {
          background: #f5f5f5;
        }
        
        .status-badge {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 4px;
          color: white;
          font-size: 12px;
        }
        
        .no-data {
          text-align: center;
          padding: 40px !important;
          color: #999;
        }
      `}</style>
    </div>
  );
}

export default AppealsTable;