'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Handle button click with explicit event handling
  const handlePageClick = (page: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onPageChange(page);
  };
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          onClick={(e) => handlePageClick(1, e)}
          className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          1
        </button>
      );
      
      if (startPage > 2) {
        pageNumbers.push(
          <span key="ellipsis1" className="px-2">
            ...
          </span>
        );
      }
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={(e) => handlePageClick(i, e)}
          className={`px-3 py-1 rounded-md ${
            i === currentPage
              ? 'bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900'
              : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
          }`}
        >
          {i}
        </button>
      );
    }
    
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <span key="ellipsis2" className="px-2">
            ...
          </span>
        );
      }
      
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={(e) => handlePageClick(totalPages, e)}
          className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {totalPages}
        </button>
      );
    }
    
    return pageNumbers;
  };
  
  return (
    <div className="flex justify-center items-center gap-2 mt-8 relative z-10">
      <button
        onClick={(e) => handlePageClick(currentPage - 1, e)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md ${
          currentPage === 1
            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
            : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
      >
        Previous
      </button>
      
      <div className="flex items-center gap-1">
        {renderPageNumbers()}
      </div>
      
      <button
        onClick={(e) => handlePageClick(currentPage + 1, e)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md ${
          currentPage === totalPages
            ? 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-600 cursor-not-allowed'
            : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
        }`}
      >
        Next
      </button>
    </div>
  );
}
