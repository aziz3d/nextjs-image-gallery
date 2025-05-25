'use client';

import React from 'react';
import Pagination from './Pagination';

interface EnhancedPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function EnhancedPagination({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: EnhancedPaginationProps) {
  // Enhanced page change handler with explicit event handling
  const handlePageChange = (page: number) => {
    try {
      // Validate page number
      if (page >= 1 && page <= totalPages) {
        // Apply the page change
        onPageChange(page);
      }
    } catch (error) {
      console.error('Error changing page:', error);
    }
  };

  return (
    <div className="relative z-20 pointer-events-auto mt-8">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
