// Helper functions for image data management and pagination

export interface ImageItem {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  tags: string[];
  category?: string; // Optional category for organizing images
}

export interface ImageCategory {
  id: string;
  name: string;
  description?: string;
}

// In-memory storage for categories (in a real app, this would be in a database)
let categories: ImageCategory[] = [
  { id: '1', name: 'Medieval', description: 'Medieval landscapes and scenes' },
  { id: '2', name: 'Cities', description: 'Urban photography from cities around the world' },
  { id: '3', name: 'Nature', description: 'Beautiful natural landscapes' }
];

// CRUD operations for categories
export function getAllCategories(): ImageCategory[] {
  return [...categories];
}

export function getCategoryById(id: string): ImageCategory | undefined {
  return categories.find(category => category.id === id);
}

export function addCategory(name: string, description?: string): ImageCategory {
  const newId = String(categories.length + 1);
  const newCategory = { 
    id: newId, 
    name, 
    description 
  };
  categories.push(newCategory);
  return newCategory;
}

export function updateCategory(id: string, name: string, description?: string): ImageCategory | null {
  const index = categories.findIndex(category => category.id === id);
  if (index === -1) return null;
  
  const updatedCategory = { 
    ...categories[index], 
    name, 
    description 
  };
  categories[index] = updatedCategory;
  return updatedCategory;
}

export function deleteCategory(id: string): boolean {
  const initialLength = categories.length;
  categories = categories.filter(category => category.id !== id);
  return categories.length !== initialLength;
}

// Image CRUD operations (to be used with the images array from images.ts)
export function addImage(imageData: Omit<ImageItem, 'id'>, images: ImageItem[]): ImageItem {
  const newId = String(images.length + 1);
  const newImage = { id: newId, ...imageData };
  images.push(newImage);
  return newImage;
}

export function updateImage(id: string, imageData: Partial<Omit<ImageItem, 'id'>>, images: ImageItem[]): ImageItem | null {
  const index = images.findIndex(image => image.id === id);
  if (index === -1) return null;
  
  const updatedImage = { 
    ...images[index], 
    ...imageData 
  };
  images[index] = updatedImage;
  return updatedImage;
}

export function deleteImage(id: string, images: ImageItem[]): boolean {
  const initialLength = images.length;
  const newImages = images.filter(image => image.id !== id);
  if (newImages.length !== initialLength) {
    // Clear the original array and push all items from newImages
    images.length = 0;
    images.push(...newImages);
    return true;
  }
  return false;
}

export function getImageById(id: string, images: ImageItem[]): ImageItem | undefined {
  return images.find(image => image.id === id);
}

// Function to get paginated images
export function getPaginatedImages(images: ImageItem[], page: number, itemsPerPage: number): ImageItem[] {
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return images.slice(startIndex, endIndex);
}

// Function to get total number of pages
export function getTotalPages(images: ImageItem[], itemsPerPage: number): number {
  return Math.ceil(images.length / itemsPerPage);
}

// Function to get all unique tags from images
export function getAllTags(images: ImageItem[]): string[] {
  const tagsSet = new Set<string>();
  
  images.forEach(image => {
    image.tags.forEach(tag => {
      tagsSet.add(tag);
    });
  });
  
  return Array.from(tagsSet).sort();
}

// Function to filter images by tag
export function filterImagesByTag(images: ImageItem[], tag: string | null): ImageItem[] {
  if (!tag) return images;
  
  return images.filter(image => 
    image.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
}
