'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { images } from '@/data/images';
import { deleteImage, getAllCategories } from '@/data/imageUtils';
import type { ImageItem, ImageCategory } from '@/data/imageUtils';

export default function AdminImages() {
  const [galleryImages, setGalleryImages] = useState<ImageItem[]>([]);
  const [categories, setCategories] = useState<ImageCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');

  useEffect(() => {
    // Get all categories
    setCategories(getAllCategories());
    
    // Set images
    setGalleryImages([...images]);
  }, []);

  // Filter images by category and search term
  const filteredImages = galleryImages.filter(image => {
    const matchesCategory = selectedCategory === 'all' || image.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      image.caption.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const handleDeleteImage = (id: string) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      const deleted = deleteImage(id, galleryImages);
      
      if (deleted) {
        setSuccessMessage('Image deleted successfully!');
        
        // Update the state with the new images array
        setGalleryImages([...galleryImages]);
        
        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);
      }
    }
  };

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
            Manage Images
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <Link
            href="/admin/images/new"
            className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add New Image
          </Link>
        </div>
      </div>

      {successMessage && (
        <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-md">
          {successMessage}
        </div>
      )}

      <div className="mt-6 bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:p-6">
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Filter by Category
              </label>
              <select
                id="category"
                name="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-3">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Search Images
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="search"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by caption or tags"
                  className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredImages.length === 0 ? (
              <li className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                No images found.
              </li>
            ) : (
              filteredImages.map((image) => (
                <li key={image.id} className="px-6 py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 h-16 w-16 rounded-md overflow-hidden">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {image.caption}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Tags: {image.tags.join(', ')}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Size: {image.width}x{image.height}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/images/edit/${image.id}`}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDeleteImage(image.id)}
                        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
