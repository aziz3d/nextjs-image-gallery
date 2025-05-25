'use client';

import { useState } from 'react';

interface TagFilterProps {
  tags: string[];
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
}

export default function TagFilter({ tags, selectedTag, onSelectTag }: TagFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6 relative">
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-sm font-medium">Filter:</span>
        
        {/* Mobile dropdown */}
        <div className="relative md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-sm"
          >
            {selectedTag || 'All'}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          
          {isOpen && (
            <div className="absolute z-10 mt-1 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu" aria-orientation="vertical">
                <button
                  onClick={() => {
                    onSelectTag(null);
                    setIsOpen(false);
                  }}
                  className={`block px-4 py-2 text-sm w-full text-left ${
                    selectedTag === null
                      ? 'bg-gray-100 dark:bg-gray-700 font-medium'
                      : ''
                  }`}
                >
                  All
                </button>
                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      onSelectTag(tag);
                      setIsOpen(false);
                    }}
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      selectedTag === tag
                        ? 'bg-gray-100 dark:bg-gray-700 font-medium'
                        : ''
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Desktop tags */}
        <div className="hidden md:flex flex-wrap gap-2">
          <button
            onClick={() => onSelectTag(null)}
            className={`px-3 py-1 rounded-full text-sm transition-colors ${
              selectedTag === null
                ? 'bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onSelectTag(tag)}
              className={`px-3 py-1 rounded-full text-sm transition-colors ${
                selectedTag === tag
                  ? 'bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900'
                  : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
