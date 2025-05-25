'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageItem } from '@/data/imageUtils';

interface ImageThumbnailProps {
  image: ImageItem;
  onClick: (image: ImageItem) => void;
}

export default function ImageThumbnail({ image, onClick }: ImageThumbnailProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      className="relative overflow-hidden rounded-lg cursor-pointer group"
      onClick={() => onClick(image)}
    >
      <div className="aspect-square relative overflow-hidden bg-gray-100 dark:bg-gray-800">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-all duration-300 group-hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2QOQvhwAAAABJRU5ErkJggg=="
        />
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-white text-sm truncate">{image.caption}</p>
      </div>
    </div>
  );
}
