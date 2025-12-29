import React, { useState, useEffect } from 'react';
import './App.css';
import AppealsTable from './components/AppealsTable';
import MapView from './components/MapView';
import Filters from './components/Filters';
import Pagination from './components/Pagination';
import AppealModal from './components/AppealModal';

function App() {
  const [appeals, setAppeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppeal, setSelectedAppeal] = useState(null);
  const [filters, setFilters] = useState({ status: '', search: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const appealsPerPage = 10;

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => {
        setAppeals(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const filteredAppeals = appeals.filter(appeal => {
    if (filters.status && appeal.status !== filters.status) return false;
    if (filters.search) {
      const search = filters.search.toLowerCase();
      return appeal.category.toLowerCase().includes(search) || 
             appeal.address.toLowerCase().includes(search);
    }
    return true;
  });

  const totalPages = Math.ceil(filteredAppeals.length / appealsPerPage);
  const startIndex = (currentPage - 1) * appealsPerPage;
  const currentAppeals = filteredAppeals.slice(startIndex, startIndex + appealsPerPage);

  const handleStatusFilter = (status) => {
    setFilters({ ...filters, status });
    setCurrentPage(1);
  };

  const handleSearch = (value) => {
    setFilters({ ...filters, search: value });
    setCurrentPage(1);
  };

  const handleSelectAppeal = (appeal) => {
    setSelectedAppeal(appeal);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleCloseModal = () => {
    setSelectedAppeal(null);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <header>
        <h1>Обращения граждан</h1>
        <p>Приложение для отслеживания обращений</p>
      </header>

      <div className="main">
        <Filters
          filters={filters}
          onStatusChange={handleStatusFilter}
          onSearchChange={handleSearch}
        />

        <div className="content">
          <div className="left-panel">
            <div className="card">
              <h2>Список обращений</h2>
              <p className="info">Найдено: {filteredAppeals.length}</p>
              <AppealsTable
                appeals={currentAppeals}
                onSelect={handleSelectAppeal}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>

          <div className="right-panel">
            <div className="card">
              <h2>Карта обращений</h2>
              <MapView
                appeals={filteredAppeals}
                onSelect={handleSelectAppeal}
                selectedAppeal={selectedAppeal}
              />
            </div>
          </div>
        </div>
      </div>

      {selectedAppeal && (
        <AppealModal
          appeal={selectedAppeal}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;