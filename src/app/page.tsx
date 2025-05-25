'use client';

import { useState, useEffect } from 'react';
import Gallery from '@/components/gallery/Gallery';
import ParticlesBackground from '@/components/ParticlesBackground';
import { loadImages } from '@/data/images';
import { getSettings } from '@/data/settings';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { FooterMenu } from '@/data/settings';
import { ImageItem } from '@/data/imageUtils';

export default function Home() {
  const router = useRouter();
  
  // Initialize with default settings
  const defaultHeader = { 
    title: "Responsive Image Gallery", 
    description: "A modern, responsive image gallery with lightbox, filtering, and touch support." 
  };
  
  const defaultFooter: { text: string; menus: FooterMenu[] } = { 
    text: "Built with Next.js and Tailwind CSS", 
    menus: [] 
  };
  
  // State for settings and images
  const [header, setHeader] = useState(defaultHeader);
  const [footer, setFooter] = useState<typeof defaultFooter>(defaultFooter);
  const [galleryImages, setGalleryImages] = useState<ImageItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Load settings and images from localStorage when component mounts (client-side only)
  useEffect(() => {
    try {
      // Load settings
      const settings = getSettings();
      console.log('Loaded settings:', settings);
      
      if (settings && settings.header) {
        setHeader({
          title: settings.header.title || defaultHeader.title,
          description: settings.header.description || defaultHeader.description
        });
      }
      
      if (settings && settings.footer) {
        setFooter({
          text: settings.footer.text || defaultFooter.text,
          menus: Array.isArray(settings.footer.menus) ? settings.footer.menus : []
        });
      }
      
      // Load images
      const loadedImages = loadImages();
      setGalleryImages(loadedImages);
      console.log('Loaded images:', loadedImages.length);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero section with particles background confined to header only */}
      <div className="relative bg-gradient-to-b from-blue-900 to-gray-900 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
        {/* Particles container with absolute positioning */}
        <div className="absolute inset-0 z-0">
          <ParticlesBackground height="100%" />
        </div>
        {/* Header content above particles */}
        <header className="container mx-auto py-10 px-4 relative z-10">
          <h1 className="text-3xl font-bold text-center mb-2 text-white">{header.title}</h1>
          <p className="text-center text-gray-200 max-w-2xl mx-auto text-sm">
            {header.description}
          </p>
        </header>
      </div>
      
      {isLoaded && (
        <div className="container mx-auto px-4 py-8">
          <Gallery images={galleryImages} />
        </div>
      )}
      
      <footer className="mt-12 py-12 px-4 relative overflow-hidden">
        {/* Cool background with gradient and subtle pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 opacity-90 z-0"></div>
        <div className="absolute inset-0 bg-[url('/images/patterns/subtle-pattern.svg')] opacity-20 z-0"></div>
        
        {/* Content container */}
        <div className="container mx-auto relative z-10">
          {/* Footer menus */}
          {isLoaded && footer.menus && footer.menus.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
              {footer.menus.map((menu: FooterMenu) => (
                <div key={menu.id} className="mb-6">
                  <h3 className="text-lg font-medium text-white mb-4 border-b border-blue-700 pb-2">{menu.title}</h3>
                  <ul className="space-y-3">
                    {menu.items.map((item: {id: string; label: string; url: string}) => (
                      <li key={item.id}>
                        <a 
                          href={item.url} 
                          target={item.url.startsWith('http') ? '_blank' : '_self'}
                          rel={item.url.startsWith('http') ? 'noopener noreferrer' : ''}
                          className="text-blue-300 hover:text-white transition-colors duration-200 flex items-center"
                        >
                          <svg className="w-3 h-3 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                          </svg>
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
          
          {/* Footer bottom */}
          <div className="pt-8 mt-8 border-t border-blue-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-center text-blue-300 text-sm mb-4 md:mb-0">
              {footer.text}
            </p>
            <div className="flex space-x-4 items-center">
              <a 
                href="/admin/login" 
                className="text-xs text-blue-400 hover:text-white transition-colors duration-200 flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Admin
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xs text-blue-400 hover:text-white transition-colors duration-200 flex items-center"
              >
                <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
