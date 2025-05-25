'use client';

import { useState, FormEvent, useRef, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import { addImage, getAllCategories } from '@/data/imageUtils';
import { loadImages, saveImages } from '@/data/images';
import type { ImageCategory, ImageItem } from '@/data/imageUtils';
import '../../admin.css';

export default function AddNewImage() {
  const router = useRouter();
  const [categories, setCategories] = useState<ImageCategory[]>(getAllCategories());
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  
  const [formData, setFormData] = useState({
    src: '',
    alt: '',
    width: 1024,
    height: 1024,
    caption: '',
    tags: '',
    category: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for this field
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // Create a preview URL
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
      
      // Update form data with file name
      setFormData({
        ...formData,
        src: `/images/${file.name}`,
        alt: file.name.split('.')[0].replace(/-|_/g, ' ')
      });
      
      // Clear error
      if (errors.src) {
        setErrors({
          ...errors,
          src: ''
        });
      }
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.src) {
      newErrors.src = 'Image path is required';
    }
    
    if (!formData.alt) {
      newErrors.alt = 'Alt text is required';
    }
    
    if (!formData.caption) {
      newErrors.caption = 'Caption is required';
    }
    
    if (!formData.tags) {
      newErrors.tags = 'At least one tag is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Process tags
    const tagsArray = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag);
    
    // In a real application, you would upload the file to a server here
    // For this demo, we'll simulate a successful upload
    if (selectedFile) {
      // Simulate file upload delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('File would be uploaded:', selectedFile.name);
    }
    
    // Load current images
    const currentImages = loadImages();
    
    // Add new image
    const newImage = {
      src: formData.src,
      alt: formData.alt,
      width: Number(formData.width),
      height: Number(formData.height),
      caption: formData.caption,
      tags: tagsArray,
      category: formData.category || undefined
    };
    
    // Add the image and save to localStorage
    const updatedImage = addImage(newImage, currentImages);
    saveImages(currentImages);
    
    console.log('New image added:', updatedImage);
    
    setIsSubmitting(false);
    
    // Redirect to images list
    router.push('/admin/images');
  };
  
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="admin-text-primary text-2xl font-bold">
          Add New Image
        </h2>
        <button
          type="button"
          onClick={() => router.push('/admin/images')}
          className="admin-btn admin-btn-secondary flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Images
        </button>
      </div>
      
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Image Information</h3>
        </div>
        <div className="admin-card-body">
          <form onSubmit={handleSubmit} className="space-y-6">
            <p className="admin-text-secondary mb-4">
              Add a new image to your gallery. You can upload an image from your computer or provide a URL.
            </p>
            
            {/* File Upload Area */}
            <div className="admin-form-group">
              <label className="admin-form-label">Upload Image</label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-primary-color transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                {previewUrl ? (
                  <div className="flex flex-col items-center">
                    <img 
                      src={previewUrl} 
                      alt="Preview" 
                      className="max-h-48 max-w-full mb-4 rounded-lg shadow-sm" 
                    />
                    <span className="text-sm admin-text-secondary">Click to change image</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm admin-text-secondary mb-1">Click to upload an image</p>
                    <p className="text-xs admin-text-light">PNG, JPG, GIF up to 10MB</p>
                  </div>
                )}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>
              
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="admin-form-group">
                <label htmlFor="src" className="admin-form-label">
                  Image Path
                </label>
                <input
                  type="text"
                  name="src"
                  id="src"
                  value={formData.src}
                  onChange={handleChange}
                  className={`admin-form-input ${errors.src ? 'border-red-500' : ''}`}
                  placeholder="/images/example.jpg"
                />
                {errors.src && (
                  <p className="text-sm text-red-600 mt-1">{errors.src}</p>
                )}
                <p className="text-xs admin-text-light mt-1">
                  Path where the image will be stored
                </p>
              </div>
              
              <div className="admin-form-group">
                <label htmlFor="alt" className="admin-form-label">
                  Alt Text
                </label>
                <input
                  type="text"
                  name="alt"
                  id="alt"
                  value={formData.alt}
                  onChange={handleChange}
                  className={`admin-form-input ${errors.alt ? 'border-red-500' : ''}`}
                  placeholder="Descriptive text for the image"
                />
                {errors.alt && (
                  <p className="text-sm text-red-600 mt-1">{errors.alt}</p>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="admin-form-group">
                <label htmlFor="width" className="admin-form-label">
                  Width
                </label>
                <input
                  type="number"
                  name="width"
                  id="width"
                  value={formData.width}
                  onChange={handleChange}
                  className="admin-form-input"
                />
              </div>
              
              <div className="admin-form-group">
                <label htmlFor="height" className="admin-form-label">
                  Height
                </label>
                <input
                  type="number"
                  name="height"
                  id="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="admin-form-input"
                />
              </div>
            </div>
            
            <div className="admin-form-group">
              <label htmlFor="caption" className="admin-form-label">
                Caption
              </label>
              <input
                type="text"
                name="caption"
                id="caption"
                value={formData.caption}
                onChange={handleChange}
                className={`admin-form-input ${errors.caption ? 'border-red-500' : ''}`}
                placeholder="A short description of the image"
              />
              {errors.caption && (
                <p className="text-sm text-red-600 mt-1">{errors.caption}</p>
              )}
            </div>
            
            <div className="admin-form-group">
              <label htmlFor="tags" className="admin-form-label">
                Tags
              </label>
              <input
                type="text"
                name="tags"
                id="tags"
                value={formData.tags}
                onChange={handleChange}
                placeholder="Nature, Landscape, Mountains"
                className={`admin-form-input ${errors.tags ? 'border-red-500' : ''}`}
              />
              {errors.tags && (
                <p className="text-sm text-red-600 mt-1">{errors.tags}</p>
              )}
              <p className="text-xs admin-text-light mt-1">
                Comma-separated list of tags
              </p>
            </div>
            
            <div className="admin-form-group">
              <label htmlFor="category" className="admin-form-label">
                Category
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="admin-form-select"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => router.push('/admin/images')}
                className="admin-btn admin-btn-secondary"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="admin-btn admin-btn-primary flex items-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Image
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
