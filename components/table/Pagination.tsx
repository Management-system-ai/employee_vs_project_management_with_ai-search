import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center gap-6 items-center mt-4">
      <button onClick={handlePrevious} disabled={currentPage === 1} className="px-4 py-2 bg-red-600 text-white rounded-md">
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={handleNext} disabled={currentPage === totalPages} className="px-4 py-2 bg-red-600 text-white rounded-md">
        Next
      </button>
    </div>
  );
};

export default Pagination;
