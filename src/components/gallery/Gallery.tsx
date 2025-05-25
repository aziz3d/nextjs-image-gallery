'use client';

import { useState, useEffect } from 'react';
import { ImageItem } from '@/data/imageUtils';
import { getAllTags, filterImagesByTag, getPaginatedImages, getTotalPages } from '@/data/imageUtils';
import ImageThumbnail from './ImageThumbnail';
import Lightbox from './Lightbox';
import TagFilter from './TagFilter';
import EnhancedPagination from './EnhancedPagination';

interface GalleryProps {
  images: ImageItem[];
}

export default function Gallery({ images }: GalleryProps) {
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filteredImages, setFilteredImages] = useState<ImageItem[]>(images);
  const [layoutType, setLayoutType] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  
  const allTags = getAllTags(images);

  // Update filtered images when tag changes
  useEffect(() => {
    const filtered = filterImagesByTag(images, selectedTag);
    setFilteredImages(filtered);
    setCurrentPage(1); // Reset to first page when filter changes
  }, [selectedTag, images]);
  
  // Get current page images
  const currentImages = getPaginatedImages(filteredImages, currentPage, itemsPerPage);
  const totalPages = getTotalPages(filteredImages, itemsPerPage);
  
  // Handle page change
  const handlePageChange = (page: number) => {
    // Prevent default behavior and stop propagation
    setCurrentPage(page);
    // Scroll to top of gallery
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle lightbox navigation
  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const handlePrevious = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const previousIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[previousIndex]);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <TagFilter 
          tags={allTags} 
          selectedTag={selectedTag} 
          onSelectTag={setSelectedTag} 
        />
        
        <div className="flex gap-2">
          <button
            onClick={() => setLayoutType('grid')}
            className={`p-2 rounded-md ${
              layoutType === 'grid' 
                ? 'bg-gray-200 dark:bg-gray-700' 
                : 'bg-gray-100 dark:bg-gray-800'
            }`}
            aria-label="Grid view"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
          </button>
          <button
            onClick={() => setLayoutType('list')}
            className={`p-2 rounded-md ${
              layoutType === 'list' 
                ? 'bg-gray-200 dark:bg-gray-700' 
                : 'bg-gray-100 dark:bg-gray-800'
            }`}
            aria-label="List view"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="8" y1="6" x2="21" y2="6"></line>
              <line x1="8" y1="12" x2="21" y2="12"></line>
              <line x1="8" y1="18" x2="21" y2="18"></line>
              <line x1="3" y1="6" x2="3.01" y2="6"></line>
              <line x1="3" y1="12" x2="3.01" y2="12"></line>
              <line x1="3" y1="18" x2="3.01" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {filteredImages.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No images found for the selected filter.</p>
        </div>
      ) : layoutType === 'grid' ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentImages.map((image) => (
              <ImageThumbnail
                key={image.id}
                image={image}
                onClick={setSelectedImage}
              />
            ))}
          </div>
          {totalPages > 1 && (
            <EnhancedPagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          )}
        </>
      ) : (
        <>
          <div className="space-y-4">
            {currentImages.map((image) => (
              <div 
                key={image.id}
                className="flex flex-col sm:flex-row gap-4 p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900 cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="sm:w-48 h-48 relative">
                  <ImageThumbnail image={image} onClick={setSelectedImage} />
                </div>
                <div className="flex flex-col justify-between py-2">
                  <div>
                    <h3 className="font-medium">{image.caption}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {image.tags.map(tag => (
                        <span key={tag} className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button 
                    className="mt-4 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(image);
                    }}
                  >
                    View full image
                  </button>
                </div>
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <EnhancedPagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              onPageChange={handlePageChange} 
            />
          )}
        </>
      )}

      {/* Lightbox */}
      {selectedImage && (
        <Lightbox
          image={selectedImage}
          images={filteredImages}
          onClose={() => setSelectedImage(null)}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </div>
  );
}
