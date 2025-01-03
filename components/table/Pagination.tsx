import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="mt-4 flex items-center justify-center gap-6">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className="rounded-md bg-red-600 px-4 py-2 text-white"
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className="rounded-md bg-red-600 px-4 py-2 text-white"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
