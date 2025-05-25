'use client';

import { useState, useEffect, FormEvent } from 'react';
import { 
  getAllCategories, 
  addCategory, 
  updateCategory, 
  deleteCategory,
  ImageCategory 
} from '@/data/imageUtils';

export default function AdminCategories() {
  const [categories, setCategories] = useState<ImageCategory[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<ImageCategory | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Load categories on component mount
  useEffect(() => {
    refreshCategories();
  }, []);

  const refreshCategories = () => {
    setCategories(getAllCategories());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: ''
    });
    setIsEditing(false);
    setCurrentCategory(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setErrorMessage('Category name is required');
      return;
    }
    
    try {
      if (isEditing && currentCategory) {
        // Update existing category
        updateCategory(currentCategory.id, formData.name, formData.description);
        setSuccessMessage(`Category "${formData.name}" updated successfully!`);
      } else {
        // Add new category
        addCategory(formData.name, formData.description);
        setSuccessMessage(`Category "${formData.name}" added successfully!`);
      }
      
      // Reset form and refresh categories
      resetForm();
      refreshCategories();
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  const handleEdit = (category: ImageCategory) => {
    setIsEditing(true);
    setCurrentCategory(category);
    setFormData({
      name: category.name,
      description: category.description || ''
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        const deleted = deleteCategory(id);
        
        if (deleted) {
          setSuccessMessage('Category deleted successfully!');
          refreshCategories();
          
          // Clear success message after 3 seconds
          setTimeout(() => {
            setSuccessMessage('');
          }, 3000);
        } else {
          setErrorMessage('Failed to delete category');
        }
      } catch (error) {
        setErrorMessage('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div>
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 dark:text-white sm:text-3xl sm:truncate">
            Manage Categories
          </h2>
        </div>
      </div>

      {successMessage && (
        <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-md">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-md">
          {errorMessage}
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Category Form */}
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              {isEditing ? 'Edit Category' : 'Add New Category'}
            </h3>
            <form onSubmit={handleSubmit} className="mt-5 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category Name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description (Optional)
                </label>
                <div className="mt-1">
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                {isEditing && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-white dark:bg-gray-700 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {isEditing ? 'Update Category' : 'Add Category'}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Categories List */}
        <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
              Categories
            </h3>
            <div className="mt-5">
              {categories.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No categories found.</p>
              ) : (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {categories.map((category) => (
                    <li key={category.id} className="py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-lg font-medium text-gray-900 dark:text-white">{category.name}</h4>
                          {category.description && (
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{category.description}</p>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEdit(category)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(category.id)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-red-600 hover:bg-red-500 focus:outline-none focus:border-red-700 focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
