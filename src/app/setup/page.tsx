'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function SetupPage() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Setting up pages...');

  useEffect(() => {
    try {
      // Function to get settings from localStorage
      // Define a type for the site settings
      interface FooterMenu {
        id: string;
        title: string;
        items: Array<{
          id: string;
          label: string;
          url: string;
        }>;
      }

      interface SiteSettings {
        header: {
          title: string;
          description: string;
        };
        footer: {
          text: string;
          menus: FooterMenu[];
        };
      }

      function getSettings(): SiteSettings | null {
        try {
          const storedSettings = localStorage.getItem('siteSettings');
          if (storedSettings) {
            return JSON.parse(storedSettings);
          }
        } catch (e) {
          console.error('Error getting settings:', e);
        }
        return null;
      }

      // Function to save settings to localStorage
      function saveSettings(settings: SiteSettings): boolean {
        try {
          localStorage.setItem('siteSettings', JSON.stringify(settings));
          return true;
        } catch (e) {
          console.error('Error saving settings:', e);
          return false;
        }
      }

      // Function to add About and Contact pages to footer menu
      function setupPagesInFooter() {
        const settings = getSettings();
        if (!settings) {
          console.error('Could not get settings');
          return false;
        }

        // Check if we already have a Pages menu
        let pagesMenuIndex = settings.footer.menus.findIndex((menu: FooterMenu) => menu.title === 'Pages');
        
        if (pagesMenuIndex === -1) {
          // Create a new Pages menu
          const newMenu = {
            id: 'pages-menu-' + Date.now(),
            title: 'Pages',
            items: []
          };
          settings.footer.menus.push(newMenu);
          pagesMenuIndex = settings.footer.menus.length - 1;
        }
        
        // Add About and Contact items if they don't exist
        const pagesMenu = settings.footer.menus[pagesMenuIndex];
        
        // Check for About page
        if (!pagesMenu.items.some((item: {id: string; label: string; url: string}) => item.label === 'About')) {
          pagesMenu.items.push({
            id: 'about-link-' + Date.now(),
            label: 'About',
            url: '/about'
          });
        }
        
        // Check for Contact page
        if (!pagesMenu.items.some((item: {id: string; label: string; url: string}) => item.label === 'Contact')) {
          pagesMenu.items.push({
            id: 'contact-link-' + Date.now(),
            label: 'Contact',
            url: '/contact'
          });
        }
        
        // Save the updated settings
        const success = saveSettings(settings);
        
        if (success) {
          console.log('Successfully added About and Contact pages to footer menu');
          return true;
        } else {
          console.error('Failed to save settings');
          return false;
        }
      }

      // Initialize About page content
      function setupAboutPage() {
        const aboutContent = {
          title: 'About Us',
          content: `<h2>Welcome to Our Image Gallery</h2>
<p>We are passionate about photography and showcasing beautiful images from around the world.</p>
<p>Our gallery features a curated collection of high-quality images that capture the beauty and diversity of our world.</p>
<h3>Our Mission</h3>
<p>To provide a platform for photographers to showcase their work and for visitors to enjoy stunning visual experiences.</p>
<h3>Our Team</h3>
<p>Our team consists of photography enthusiasts and web developers dedicated to creating the best possible gallery experience.</p>`
        };
        
        localStorage.setItem('aboutPageContent', JSON.stringify(aboutContent));
        console.log('About page content initialized');
      }

      // Initialize Contact page content
      function setupContactPage() {
        const contactContent = {
          title: 'Contact Us',
          content: '<p>We\'d love to hear from you! Please use the form below to get in touch with our team.</p>',
          email: 'contact@imagegallery.com',
          phone: '+1 (555) 123-4567',
          address: '123 Gallery Street, Art City, AC 12345'
        };
        
        localStorage.setItem('contactPageContent', JSON.stringify(contactContent));
        console.log('Contact page content initialized');
      }

      // Run the setup functions
      const footerSuccess = setupPagesInFooter();
      setupAboutPage();
      setupContactPage();

      if (footerSuccess) {
        setStatus('success');
        setMessage('Setup completed successfully! About and Contact pages have been added to the footer menu.');
      } else {
        setStatus('error');
        setMessage('There was an error setting up the pages. Please check the console for details.');
      }
    } catch (error) {
      console.error('Setup error:', error);
      setStatus('error');
      setMessage('An unexpected error occurred during setup. Please check the console for details.');
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Page Setup</h1>
        
        <div className={`p-4 mb-6 rounded-md ${
          status === 'loading' ? 'bg-blue-50 text-blue-700' :
          status === 'success' ? 'bg-green-50 text-green-700' :
          'bg-red-50 text-red-700'
        }`}>
          <p className="text-center">{message}</p>
        </div>
        
        {status !== 'loading' && (
          <div className="flex flex-col space-y-4">
            <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded-md text-center hover:bg-blue-700 transition-colors">
              Go to Home Page
            </Link>
            <Link href="/about" className="px-4 py-2 bg-gray-600 text-white rounded-md text-center hover:bg-gray-700 transition-colors">
              View About Page
            </Link>
            <Link href="/contact" className="px-4 py-2 bg-gray-600 text-white rounded-md text-center hover:bg-gray-700 transition-colors">
              View Contact Page
            </Link>
            <Link href="/admin/pages" className="px-4 py-2 bg-purple-600 text-white rounded-md text-center hover:bg-purple-700 transition-colors">
              Go to Admin Pages
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
