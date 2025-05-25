'use client';

import { useState, useEffect } from 'react';
import { getSettings } from '@/data/settings';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ParticlesBackground from '@/components/ParticlesBackground';
import type { FooterMenu } from '@/data/settings';

export default function Contact() {
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
  
  // State for settings
  const [header, setHeader] = useState(defaultHeader);
  const [footer, setFooter] = useState<typeof defaultFooter>(defaultFooter);
  const [isLoaded, setIsLoaded] = useState(false);
  const [contactContent, setContactContent] = useState({
    title: "Contact Us",
    content: "<p>We&apos;d love to hear from you! Please use the form below to get in touch.</p>",
    email: "contact@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Gallery Street, Art City, AC 12345"
  });
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState<null | 'success' | 'error'>(null);

  // Load settings from localStorage on client side
  useEffect(() => {
    const settings = getSettings();
    setHeader(settings.header);
    setFooter(settings.footer);
    
    // Check if contact page content exists in localStorage
    const storedContactContent = localStorage.getItem('contactPageContent');
    if (storedContactContent) {
      try {
        const parsedContent = JSON.parse(storedContactContent);
        setContactContent(parsedContent);
      } catch (e) {
        console.error('Failed to parse stored contact content:', e);
      }
    }
    
    setIsLoaded(true);
  }, []);
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log('Form submitted:', formData);
    // Show success message
    setFormStatus('success');
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    // Clear success message after 5 seconds
    setTimeout(() => {
      setFormStatus(null);
    }, 5000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Particles Background */}
      <ParticlesBackground />
      
      {/* Header */}
      <header className="relative z-10 bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto py-6 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {header.title}
              </Link>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{header.description}</p>
            </div>
            <nav className="mt-4 md:mt-0">
              <ul className="flex space-x-6">
                <li>
                  <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-blue-600 dark:text-blue-400 font-medium">
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow container mx-auto py-12 px-4 relative z-10">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">{contactContent.title}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="md:col-span-1">
              <div className="prose dark:prose-invert max-w-none mb-6">
                <div dangerouslySetInnerHTML={{ __html: contactContent.content }} />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Email</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{contactContent.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Phone</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{contactContent.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">Address</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{contactContent.address}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="md:col-span-2">
              {formStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md">
                  <p>Your message has been sent successfully! We&apos;ll get back to you soon.</p>
                </div>
              )}
              
              {formStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-md">
                  <p>There was an error sending your message. Please try again later.</p>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  ></textarea>
                </div>
                
                <div>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
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
