'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ImageItem } from '@/data/imageUtils';

interface LightboxProps {
  image: ImageItem | null;
  images: ImageItem[];
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function Lightbox({ image, images, onClose, onNext, onPrevious }: LightboxProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    // Reset zoom and loading state when image changes
    setIsZoomed(false);
    setIsLoaded(false);

    // Add keyboard event listeners
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrevious();
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Prevent scrolling when lightbox is open
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [image, onClose, onNext, onPrevious]);

  if (!image) return null;

  // Handle touch gestures
  const touchStartX = { current: 0 };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    
    // Swipe threshold
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        onNext();
      } else {
        onPrevious();
      }
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/90 flex flex-col justify-center items-center"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close button */}
      <button 
        className="absolute top-4 right-4 text-white z-10 p-2 rounded-full hover:bg-white/10"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close lightbox"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>

      {/* Navigation buttons */}
      <button 
        className="absolute left-4 top-1/2 -translate-y-1/2 text-white z-10 p-2 rounded-full hover:bg-white/10 focus:outline-none"
        onClick={(e) => {
          e.stopPropagation();
          onPrevious();
        }}
        aria-label="Previous image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <button 
        className="absolute right-4 top-1/2 -translate-y-1/2 text-white z-10 p-2 rounded-full hover:bg-white/10 focus:outline-none"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next image"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>

      {/* Image container */}
      <div 
        className={`relative ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'} max-h-[90vh] max-w-[90vw]`}
        onClick={(e) => {
          e.stopPropagation();
          setIsZoomed(!isZoomed);
        }}
      >
        <div className={`transition-transform duration-300 ${isZoomed ? 'scale-150' : 'scale-100'}`}>
          <div className="relative">
            {!isLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-white rounded-full animate-spin"></div>
              </div>
            )}
            <Image
              src={image.src}
              alt={image.alt}
              width={Math.min(window.innerWidth * 0.9, image.width)}
              height={Math.min(window.innerHeight * 0.8, image.height)}
              className={`object-contain rounded-lg ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setIsLoaded(true)}
              priority
            />
          </div>
        </div>
      </div>

      {/* Caption and controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <div>
            <h3 className="text-lg font-semibold">{image.caption}</h3>
            <div className="flex gap-2 mt-1">
              {image.tags.map(tag => (
                <span key={tag} className="text-xs bg-white/20 px-2 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <button 
              className="bg-white/10 hover:bg-white/20 p-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomed(!isZoomed);
              }}
              aria-label={isZoomed ? "Zoom out" : "Zoom in"}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                {!isZoomed && <line x1="11" y1="8" x2="11" y2="14"></line>}
                {!isZoomed && <line x1="8" y1="11" x2="14" y2="11"></line>}
              </svg>
            </button>
            <a 
              href={image.src}
              download
              className="bg-white/10 hover:bg-white/20 p-2 rounded-full"
              onClick={(e) => e.stopPropagation()}
              aria-label="Download image"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
