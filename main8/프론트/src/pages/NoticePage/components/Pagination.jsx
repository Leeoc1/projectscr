import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      <button 
        className="pagination-btn"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
        <button
          key={pageNum}
          className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
          onClick={() => onPageChange(pageNum)}
        >
          {pageNum}
        </button>
      ))}
      <button 
        className="pagination-btn"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination; 