'use client';

import { useState, useEffect, FormEvent } from 'react';
import { getSettings, updateFooterSettings } from '@/data/settings';
import type { FooterMenu } from '@/data/settings';
import Link from 'next/link';
import '../admin.css';

export default function AdminFooter() {
  const [footerText, setFooterText] = useState('');
  const [menus, setMenus] = useState<FooterMenu[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [editingMenuIndex, setEditingMenuIndex] = useState<number | null>(null);
  const [editingItemIndex, setEditingItemIndex] = useState<number | null>(null);
  const [newMenu, setNewMenu] = useState({ title: '' });
  const [newItem, setNewItem] = useState({ label: '', url: '' });
  const [addingMenuToIndex, setAddingMenuToIndex] = useState<number | null>(null);
  const [addingItemToMenuIndex, setAddingItemToMenuIndex] = useState<number | null>(null);

  useEffect(() => {
    const settings = getSettings();
    setFooterText(settings.footer.text);
    setMenus([...settings.footer.menus]);
  }, []);

  const handleFooterTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFooterText(e.target.value);
  };

  const handleSaveFooter = (e: FormEvent) => {
    e.preventDefault();
    
    updateFooterSettings(footerText, menus);
    
    setSuccessMessage('Footer settings updated successfully!');
    
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  // Menu operations
  const startAddMenu = () => {
    setNewMenu({ title: '' });
    setAddingMenuToIndex(null);
    setEditingMenuIndex(null);
    setEditingItemIndex(null);
    setAddingItemToMenuIndex(null);
  };

  const startEditMenu = (index: number) => {
    setNewMenu({ title: menus[index].title });
    setEditingMenuIndex(index);
    setAddingMenuToIndex(null);
    setEditingItemIndex(null);
    setAddingItemToMenuIndex(null);
  };

  const cancelEditMenu = () => {
    setEditingMenuIndex(null);
    setAddingMenuToIndex(null);
  };

  const deleteMenu = (index: number) => {
    if (window.confirm('Are you sure you want to delete this menu?')) {
      const newMenus = [...menus];
      newMenus.splice(index, 1);
      setMenus(newMenus);
    }
  };

  const saveMenu = (e: FormEvent) => {
    e.preventDefault();
    
    if (!newMenu.title.trim()) {
      return;
    }
    
    const updatedMenus = [...menus];
    
    if (editingMenuIndex !== null) {
      // Edit existing menu
      updatedMenus[editingMenuIndex] = {
        ...updatedMenus[editingMenuIndex],
        title: newMenu.title
      };
    } else {
      // Add new menu
      const newId = String(Date.now());
      updatedMenus.push({
        id: newId,
        title: newMenu.title,
        items: []
      });
    }
    
    setMenus(updatedMenus);
    setEditingMenuIndex(null);
    setAddingMenuToIndex(null);
    setNewMenu({ title: '' });
  };

  // Menu item operations
  const startAddMenuItem = (menuIndex: number) => {
    setNewItem({ label: '', url: '' });
    setAddingItemToMenuIndex(menuIndex);
    setEditingItemIndex(null);
    setEditingMenuIndex(null);
    setAddingMenuToIndex(null);
  };

  const startEditMenuItem = (menuIndex: number, itemIndex: number) => {
    const item = menus[menuIndex].items[itemIndex];
    setNewItem({ label: item.label, url: item.url });
    setEditingItemIndex(itemIndex);
    setAddingItemToMenuIndex(menuIndex);
    setEditingMenuIndex(null);
    setAddingMenuToIndex(null);
  };

  const cancelEditMenuItem = () => {
    setEditingItemIndex(null);
    setAddingItemToMenuIndex(null);
  };

  const deleteMenuItem = (menuIndex: number, itemIndex: number) => {
    if (window.confirm('Are you sure you want to delete this menu item?')) {
      const updatedMenus = [...menus];
      updatedMenus[menuIndex].items.splice(itemIndex, 1);
      setMenus(updatedMenus);
    }
  };

  const saveMenuItem = (e: FormEvent) => {
    e.preventDefault();
    
    if (!newItem.label.trim() || !newItem.url.trim()) {
      return;
    }
    
    if (addingItemToMenuIndex === null) {
      return;
    }
    
    // Format the URL properly
    let formattedUrl = newItem.url.trim();
    
    // If it's not an absolute URL (doesn't start with http:// or https://) and doesn't start with /
    // then add a leading slash to make it a relative URL
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://') && !formattedUrl.startsWith('/')) {
      formattedUrl = '/' + formattedUrl;
    }
    
    const updatedMenus = [...menus];
    
    if (editingItemIndex !== null) {
      // Edit existing item
      updatedMenus[addingItemToMenuIndex].items[editingItemIndex] = {
        ...updatedMenus[addingItemToMenuIndex].items[editingItemIndex],
        label: newItem.label,
        url: formattedUrl
      };
    } else {
      // Add new item
      const newId = String(Date.now());
      updatedMenus[addingItemToMenuIndex].items.push({
        id: newId,
        label: newItem.label,
        url: formattedUrl
      });
    }
    
    setMenus(updatedMenus);
    setEditingItemIndex(null);
    setAddingItemToMenuIndex(null);
    setNewItem({ label: '', url: '' });
  };

  return (
    <div className="admin-container p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold admin-text-primary">Footer Settings</h1>
      </div>
      
      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-4 right-4 z-50">
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 flex items-center shadow-md rounded-md">
            <svg className="h-6 w-6 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {successMessage}
          </div>
        </div>
      )}
      
      <form onSubmit={handleSaveFooter}>
        <div className="admin-form-group">
          <label htmlFor="footerText" className="admin-form-label">
            Footer Text
          </label>
          <input
            type="text"
            id="footerText"
            value={footerText}
            onChange={handleFooterTextChange}
            className="admin-form-input"
            placeholder="Enter footer text"
          />
          <p className="text-xs admin-text-light mt-1">
            This text will appear at the bottom of your gallery.
          </p>
        </div>

        <div className="admin-form-group mt-6">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-medium">Footer Menus</h4>
            <button
              type="button"
              onClick={startAddMenu}
              className="admin-btn admin-btn-secondary flex items-center text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Menu
            </button>
          </div>

          {/* Add/Edit Menu Form */}
          {(editingMenuIndex !== null || addingMenuToIndex !== null) && (
            <div className="admin-card mb-4 border border-blue-200">
              <div className="admin-card-header bg-blue-50">
                <h3 className="admin-card-title text-blue-700">
                  {editingMenuIndex !== null ? 'Edit Menu' : 'Add New Menu'}
                </h3>
              </div>
              <div className="admin-card-body">
                <form onSubmit={saveMenu}>
                  <div className="admin-form-group">
                    <label htmlFor="menuTitle" className="admin-form-label">
                      Menu Title
                    </label>
                    <input
                      type="text"
                      id="menuTitle"
                      value={newMenu.title}
                      onChange={(e) => setNewMenu({ ...newMenu, title: e.target.value })}
                      className="admin-form-input"
                      placeholder="Enter menu title"
                      required
                    />
                  </div>
                  <div className="flex justify-end space-x-2 mt-4">
                    <button
                      type="button"
                      onClick={cancelEditMenu}
                      className="admin-btn admin-btn-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="admin-btn admin-btn-primary"
                    >
                      {editingMenuIndex !== null ? 'Update Menu' : 'Add Menu'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Menus List */}
          <div className="space-y-4">
            {menus.length === 0 ? (
              <p className="text-gray-500 text-sm">No menus added yet. Click &quot;Add Menu&quot; to create one.</p>
            ) : (
              menus.map((menu, menuIndex) => (
                <div key={menu.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h5 className="font-medium">{menu.title}</h5>
                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => startEditMenu(menuIndex)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteMenu(menuIndex)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-2">
                    <h6 className="text-sm font-medium">Menu Items</h6>
                    <button
                      type="button"
                      onClick={() => startAddMenuItem(menuIndex)}
                      className="admin-btn admin-btn-secondary flex items-center text-xs py-1 px-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add Item
                    </button>
                  </div>

                  {/* Add/Edit Menu Item Form */}
                  {addingItemToMenuIndex === menuIndex && (
                    <div className="bg-gray-50 p-3 rounded mb-3 border border-gray-200">
                      <form onSubmit={saveMenuItem}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div className="admin-form-group">
                            <label htmlFor="itemLabel" className="admin-form-label text-xs">
                              Label
                            </label>
                            <input
                              type="text"
                              id="itemLabel"
                              value={newItem.label}
                              onChange={(e) => setNewItem({ ...newItem, label: e.target.value })}
                              className="admin-form-input text-sm"
                              placeholder="Menu item label"
                              required
                            />
                          </div>
                          <div className="admin-form-group">
                            <label htmlFor="itemUrl" className="admin-form-label text-xs">
                              URL
                            </label>
                            <input
                              type="text"
                              id="itemUrl"
                              value={newItem.url}
                              onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                              className="admin-form-input text-sm"
                              placeholder="Menu item URL"
                              required
                            />
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <button
                            type="button"
                            onClick={cancelEditMenuItem}
                            className="admin-btn admin-btn-secondary text-xs py-1 px-2"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="admin-btn admin-btn-primary text-xs py-1 px-2"
                          >
                            {editingItemIndex !== null ? 'Update Item' : 'Add Item'}
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  {/* Menu Items List */}
                  {menu.items.length === 0 ? (
                    <p className="text-gray-500 text-xs">No items added yet. Click &quot;Add Item&quot; to create one.</p>
                  ) : (
                    <ul className="divide-y divide-gray-100">
                      {menu.items.map((item, itemIndex) => (
                        <li key={item.id} className="py-2 flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">{item.label}</p>
                            <p className="text-xs text-gray-500">{item.url}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              type="button"
                              onClick={() => startEditMenuItem(menuIndex, itemIndex)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteMenuItem(menuIndex, itemIndex)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="admin-btn admin-btn-primary"
          >
            Save Footer Settings
          </button>
        </div>
      </form>
    </div>
  );
}
