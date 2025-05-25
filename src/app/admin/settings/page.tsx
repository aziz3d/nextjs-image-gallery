'use client';

import { useState, FormEvent, useEffect } from 'react';
import { getSettings, updateHeaderSettings, updateFooterSettings, saveSettings } from '@/data/settings';
import { FooterMenu, MenuItem } from '@/data/settings';
import Link from 'next/link';
import '../admin.css';

export default function AdminSettings() {
  const [settings, setSettings] = useState(getSettings());
  const [title, setTitle] = useState(settings.header.title || '');
  const [description, setDescription] = useState(settings.header.description || '');
  const [footerText, setFooterText] = useState(settings.footer.text || '');
  const [footerMenus, setFooterMenus] = useState<FooterMenu[]>(settings.footer.menus || []);
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('header'); // 'header' or 'footer'
  
  // Refresh settings when component mounts
  useEffect(() => {
    const currentSettings = getSettings();
    setSettings(currentSettings);
    setTitle(currentSettings.header.title || '');
    setDescription(currentSettings.header.description || '');
    setFooterText(currentSettings.footer.text || '');
    setFooterMenus(currentSettings.footer.menus || []);
  }, []);

  const handleHeaderSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Update header settings
    const updatedSettings = updateHeaderSettings(title, description);
    setSettings(updatedSettings);
    
    // Show success message
    setSuccessMessage('Header settings updated successfully!');
    
    // Simulate a delay for the save operation
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 500);
  };
  
  const handleFooterSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Update footer settings
    const updatedSettings = updateFooterSettings(footerText, footerMenus);
    setSettings(updatedSettings);
    
    // Show success message
    setSuccessMessage('Footer settings updated successfully!');
    
    // Simulate a delay for the save operation
    setTimeout(() => {
      setIsSubmitting(false);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }, 500);
  };
  
  // Add a new menu to the footer
  const addMenu = () => {
    const newId = String(footerMenus.length + 1);
    const newMenu: FooterMenu = {
      id: newId,
      title: `Menu ${newId}`,
      items: []
    };
    setFooterMenus([...footerMenus, newMenu]);
  };
  
  // Update a menu's title
  const updateMenuTitle = (menuId: string, newTitle: string) => {
    const updatedMenus = footerMenus.map(menu => 
      menu.id === menuId ? { ...menu, title: newTitle } : menu
    );
    setFooterMenus(updatedMenus);
  };
  
  // Remove a menu
  const removeMenu = (menuId: string) => {
    const updatedMenus = footerMenus.filter(menu => menu.id !== menuId);
    setFooterMenus(updatedMenus);
  };
  
  // Add a new item to a menu
  const addMenuItem = (menuId: string) => {
    const updatedMenus = footerMenus.map(menu => {
      if (menu.id === menuId) {
        const newId = String(menu.items.length + 1);
        const newItem: MenuItem = {
          id: newId,
          label: 'New Link',
          url: '#'
        };
        return { ...menu, items: [...menu.items, newItem] };
      }
      return menu;
    });
    setFooterMenus(updatedMenus);
  };
  
  // Update a menu item
  const updateMenuItem = (menuId: string, itemId: string, field: 'label' | 'url', value: string) => {
    const updatedMenus = footerMenus.map(menu => {
      if (menu.id === menuId) {
        const updatedItems = menu.items.map(item => {
          if (item.id === itemId) {
            return { ...item, [field]: value };
          }
          return item;
        });
        return { ...menu, items: updatedItems };
      }
      return menu;
    });
    setFooterMenus(updatedMenus);
  };
  
  // Remove a menu item
  const removeMenuItem = (menuId: string, itemId: string) => {
    const updatedMenus = footerMenus.map(menu => {
      if (menu.id === menuId) {
        const updatedItems = menu.items.filter(item => item.id !== itemId);
        return { ...menu, items: updatedItems };
      }
      return menu;
    });
    setFooterMenus(updatedMenus);
  };

  return (
    <div className="admin-container p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold admin-text-primary">Site Settings</h1>
      </div>

      {successMessage && (
        <div className="admin-alert admin-alert-success mb-6">
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {successMessage}
          </div>
        </div>
      )}

      <div className="flex border-b border-gray-200 mb-6">
        <button
          type="button"
          className={`py-2 px-4 font-medium text-sm border-b-2 mr-4 ${
            activeTab === 'header'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('header')}
        >
          Header
        </button>
        <button
          type="button"
          className={`py-2 px-4 font-medium text-sm border-b-2 ${
            activeTab === 'footer'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
          onClick={() => setActiveTab('footer')}
        >
          Footer
        </button>
      </div>

      {/* Header Settings */}
      {activeTab === 'header' && (
        <div className="admin-card mb-6">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Header Settings</h3>
          </div>
          <div className="admin-card-body">
            <form onSubmit={handleHeaderSubmit} className="space-y-6">
              <p className="admin-text-secondary mb-4">
                Update your gallery header title and description. These settings will be displayed on the front page.
              </p>

              <div className="admin-form-group">
                <label htmlFor="title" className="admin-form-label">
                  Gallery Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="admin-form-input"
                  placeholder="Enter gallery title"
                />
              </div>

              <div className="admin-form-group">
                <label htmlFor="description" className="admin-form-label">
                  Gallery Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="admin-form-input"
                  placeholder="Enter gallery description"
                  rows={3}
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setTitle(settings.header.title);
                    setDescription(settings.header.description);
                  }}
                  className="admin-btn admin-btn-secondary"
                  disabled={isSubmitting}
                >
                  Reset
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
                      Save Settings
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Footer Settings */}
      {activeTab === 'footer' && (
        <div className="admin-card mb-6">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Footer Settings</h3>
          </div>
          <div className="admin-card-body">
            <form onSubmit={handleFooterSubmit} className="space-y-6">
              <p className="admin-text-secondary mb-4">
                Update your gallery footer text and menus. These settings will be displayed on the front page.
              </p>
              
              <div className="admin-form-group">
                <label htmlFor="footerText" className="admin-form-label">
                  Footer Text
                </label>
                <input
                  type="text"
                  id="footerText"
                  value={footerText}
                  onChange={(e) => setFooterText(e.target.value)}
                  className="admin-form-input"
                  placeholder="Enter footer text"
                />
              </div>
              
              <div className="admin-form-group">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-lg font-medium">Footer Menus</h4>
                  <button
                    type="button"
                    onClick={addMenu}
                    className="admin-btn admin-btn-secondary flex items-center text-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add Menu
                  </button>
                </div>
                
                <div className="space-y-4">
                  {footerMenus.map((menu) => (
                    <div key={menu.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-4">
                        <input
                          type="text"
                          value={menu.title}
                          onChange={(e) => updateMenuTitle(menu.id, e.target.value)}
                          className="admin-form-input"
                          placeholder="Menu Title"
                        />
                        <button
                          type="button"
                          onClick={() => removeMenu(menu.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <h5 className="text-sm font-medium">Menu Items</h5>
                          <button
                            type="button"
                            onClick={() => addMenuItem(menu.id)}
                            className="admin-btn admin-btn-secondary flex items-center text-xs py-1 px-2"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Add Item
                          </button>
                        </div>
                        
                        {menu.items.length === 0 ? (
                          <p className="text-gray-500 text-xs">No items added yet.</p>
                        ) : (
                          <div className="space-y-2">
                            {menu.items.map((item) => (
                              <div key={item.id} className="flex items-center space-x-2">
                                <input
                                  type="text"
                                  value={item.label}
                                  onChange={(e) => updateMenuItem(menu.id, item.id, 'label', e.target.value)}
                                  className="admin-form-input text-sm flex-1"
                                  placeholder="Label"
                                />
                                <input
                                  type="text"
                                  value={item.url}
                                  onChange={(e) => updateMenuItem(menu.id, item.id, 'url', e.target.value)}
                                  className="admin-form-input text-sm flex-1"
                                  placeholder="URL"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeMenuItem(menu.id, item.id)}
                                  className="text-red-600 hover:text-red-800"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => {
                    setFooterText(settings.footer.text);
                    setFooterMenus([...settings.footer.menus]);
                  }}
                  className="admin-btn admin-btn-secondary"
                  disabled={isSubmitting}
                >
                  Reset
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
                      Save Settings
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Preview */}
      {activeTab === 'header' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Header Preview</h3>
          </div>
          <div className="admin-card-body">
            <div className="bg-gradient-to-b from-blue-900 to-gray-900 p-6 rounded-lg">
              <h1 className="text-2xl font-bold text-center mb-2 text-white">{title || 'Gallery Title'}</h1>
              <p className="text-center text-gray-200 max-w-2xl mx-auto text-sm">
                {description || 'Gallery description will appear here'}
              </p>
            </div>
            <p className="text-xs admin-text-light mt-4 text-center">
              This is a preview of how your header will appear on the front page.
            </p>
          </div>
        </div>
      )}
      
      {activeTab === 'footer' && (
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Footer Preview</h3>
          </div>
          <div className="admin-card-body">
            <div className="border-t border-gray-200 dark:border-gray-800 p-6 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Footer text */}
                <div className="md:col-span-2">
                  <p className="text-sm text-gray-600 dark:text-gray-300">{footerText || 'Footer text will appear here'}</p>
                </div>
                
                {/* Footer menus */}
                {footerMenus.map(menu => (
                  <div key={menu.id} className="space-y-2">
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-200">{menu.title}</h3>
                    <ul className="space-y-1">
                      {menu.items.map(item => (
                        <li key={item.id}>
                          <a href={item.url} className="text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-xs admin-text-light mt-4 text-center">
              This is a preview of how your footer will appear on the front page.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
