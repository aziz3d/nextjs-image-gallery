'use client';

import { useState, useEffect, FormEvent } from 'react';
import { getSettings } from '@/data/settings';
import Link from 'next/link';
import '@/app/admin/admin.css';

export default function AdminPages() {
  // Tab state
  const [activeTab, setActiveTab] = useState<'about' | 'contact'>('about');
  
  // About page state
  const [aboutContent, setAboutContent] = useState({
    title: 'About Us',
    content: 'Welcome to our image gallery. We are passionate about photography and showcasing beautiful images from around the world.'
  });
  
  // Contact page state
  const [contactContent, setContactContent] = useState({
    title: 'Contact Us',
    content: '<p>We\'d love to hear from you! Please use the form below to get in touch.</p>',
    email: 'contact@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Gallery Street, Art City, AC 12345'
  });
  
  // Success message state
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  // Load page content from localStorage on client side
  useEffect(() => {
    // Load about page content
    const storedAboutContent = localStorage.getItem('aboutPageContent');
    if (storedAboutContent) {
      try {
        const parsedContent = JSON.parse(storedAboutContent);
        setAboutContent(parsedContent);
      } catch (e) {
        console.error('Failed to parse stored about content:', e);
      }
    }
    
    // Load contact page content
    const storedContactContent = localStorage.getItem('contactPageContent');
    if (storedContactContent) {
      try {
        const parsedContent = JSON.parse(storedContactContent);
        setContactContent(parsedContent);
      } catch (e) {
        console.error('Failed to parse stored contact content:', e);
      }
    }
  }, []);
  
  // Save about page content
  const saveAboutContent = (e: FormEvent) => {
    e.preventDefault();
    localStorage.setItem('aboutPageContent', JSON.stringify(aboutContent));
    showSuccess();
  };
  
  // Save contact page content
  const saveContactContent = (e: FormEvent) => {
    e.preventDefault();
    localStorage.setItem('contactPageContent', JSON.stringify(contactContent));
    showSuccess();
  };
  
  // Show success message
  const showSuccess = () => {
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <div className="admin-container p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold admin-text-primary">Page Content Management</h1>
      </div>
      
      <main className="admin-main">
        <div className="admin-content">
          {/* Success Message */}
          {showSuccessMessage && (
            <div className="admin-success-message">
              <p>Changes saved successfully!</p>
            </div>
          )}
          
          {/* Tabs */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6 overflow-hidden">
            <div className="flex">
              <button 
                className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-200 flex items-center justify-center gap-2 ${activeTab === 'about' 
                  ? 'text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                onClick={() => setActiveTab('about')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                About Page
              </button>
              <button 
                className={`flex-1 py-4 px-6 text-center font-medium transition-all duration-200 flex items-center justify-center gap-2 ${activeTab === 'contact' 
                  ? 'text-white bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                onClick={() => setActiveTab('contact')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Contact Page
              </button>
            </div>
          </div>
          
          {/* About Page Content */}
          {activeTab === 'about' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">About Page Content</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Customize the content that visitors will see on your About page.
                  </p>
                </div>
              </div>
              
              <form onSubmit={saveAboutContent} className="space-y-6">
                <div className="space-y-1">
                  <label htmlFor="aboutTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Page Title</label>
                  <input
                    type="text"
                    id="aboutTitle"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                    value={aboutContent.title}
                    onChange={(e) => setAboutContent({...aboutContent, title: e.target.value})}
                    placeholder="Enter page title"
                    required
                  />
                </div>
                
                <div className="space-y-1">
                  <label htmlFor="aboutContent" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Page Content</label>
                  <textarea
                    id="aboutContent"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                    value={aboutContent.content}
                    onChange={(e) => setAboutContent({...aboutContent, content: e.target.value})}
                    rows={10}
                    placeholder="Enter page content"
                    required
                  ></textarea>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    You can use HTML tags for formatting.
                  </p>
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                  <button 
                    type="submit" 
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Changes
                  </button>
                </div>
              </form>
              
              <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex items-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Preview</h3>
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-700 shadow-inner">
                  <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{aboutContent.title}</h1>
                  <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: aboutContent.content }} />
                </div>
              </div>
            </div>
          )}
          
          {/* Contact Page Content */}
          {activeTab === 'contact' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center mb-6">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">Contact Page Content</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Customize the contact information and content that visitors will see on your Contact page.
                  </p>
                </div>
              </div>
              
              <form onSubmit={saveContactContent} className="space-y-6">
                <div className="space-y-1">
                  <label htmlFor="contactTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Page Title</label>
                  <input
                    type="text"
                    id="contactTitle"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                    value={contactContent.title}
                    onChange={(e) => setContactContent({...contactContent, title: e.target.value})}
                    placeholder="Enter page title"
                    required
                  />
                </div>
                
                <div className="space-y-1">
                  <label htmlFor="contactContent" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Page Content</label>
                  <textarea
                    id="contactContent"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                    value={contactContent.content}
                    onChange={(e) => setContactContent({...contactContent, content: e.target.value})}
                    rows={5}
                    placeholder="Enter page content"
                    required
                  ></textarea>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    You can use HTML tags for formatting.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Email Address
                      </div>
                    </label>
                    <input
                      type="email"
                      id="contactEmail"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                      value={contactContent.email}
                      onChange={(e) => setContactContent({...contactContent, email: e.target.value})}
                      placeholder="Enter email address"
                      required
                    />
                  </div>
                  
                  <div className="space-y-1">
                    <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Phone Number
                      </div>
                    </label>
                    <input
                      type="text"
                      id="contactPhone"
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                      value={contactContent.phone}
                      onChange={(e) => setContactContent({...contactContent, phone: e.target.value})}
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <label htmlFor="contactAddress" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Address
                    </div>
                  </label>
                  <input
                    type="text"
                    id="contactAddress"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-200"
                    value={contactContent.address}
                    onChange={(e) => setContactContent({...contactContent, address: e.target.value})}
                    placeholder="Enter address"
                    required
                  />
                </div>
                
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end">
                  <button 
                    type="submit" 
                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Save Changes
                  </button>
                </div>
              </form>
              
              {/* Preview Section */}
              <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Preview
                </h3>
                
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <h1 className="text-2xl font-bold mb-4">{contactContent.title}</h1>
                  <div dangerouslySetInnerHTML={{ __html: contactContent.content }} className="mb-6" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                      <div>
                        <h3 className="text-sm font-medium">Email</h3>
                        <p className="text-sm text-gray-600">{contactContent.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                      <div>
                        <h3 className="text-sm font-medium">Phone</h3>
                        <p className="text-sm text-gray-600">{contactContent.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <svg className="w-5 h-5 text-blue-600 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                      <div>
                        <h3 className="text-sm font-medium">Address</h3>
                        <p className="text-sm text-gray-600">{contactContent.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
