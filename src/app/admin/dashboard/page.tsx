'use client';

import { useEffect, useState } from 'react';
import { images } from '@/data/images';
import { getAllCategories } from '@/data/imageUtils';
import { getSettings } from '@/data/settings';
import Link from 'next/link';
import '../admin.css';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalImages: 0,
    totalCategories: 0,
  });

  useEffect(() => {
    // Get stats
    const categories = getAllCategories();
    setStats({
      totalImages: images.length,
      totalCategories: categories.length,
    });
  }, []);

  const settings = getSettings();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="admin-text-primary text-2xl font-bold">Dashboard</h1>
        <div className="text-sm admin-text-secondary">
          Last updated: {new Date().toLocaleDateString()}
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        {/* Stats Card - Total Images */}
        <div className="admin-stats-card">
          <div className="admin-stats-icon" style={{ backgroundColor: 'rgba(79, 70, 229, 0.1)' }}>
            <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="admin-stats-content">
            <div className="admin-stats-label">Total Images</div>
            <div className="admin-stats-value">{stats.totalImages}</div>
            <Link href="/admin/images" className="admin-text-primary-color text-sm hover:underline mt-1 inline-block">
              Manage Images →
            </Link>
          </div>
        </div>

        {/* Stats Card - Categories */}
        <div className="admin-stats-card">
          <div className="admin-stats-icon" style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <div className="admin-stats-content">
            <div className="admin-stats-label">Categories</div>
            <div className="admin-stats-value">{stats.totalCategories}</div>
            <Link href="/admin/categories" className="admin-text-primary-color text-sm hover:underline mt-1 inline-block">
              Manage Categories →
            </Link>
          </div>
        </div>

        {/* Stats Card - Settings */}
        <div className="admin-stats-card">
          <div className="admin-stats-icon" style={{ backgroundColor: 'rgba(124, 58, 237, 0.1)' }}>
            <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div className="admin-stats-content">
            <div className="admin-stats-label">Site Settings</div>
            <div className="admin-stats-value truncate">{settings.header.title || 'Gallery'}</div>
            <Link href="/admin/settings" className="admin-text-primary-color text-sm hover:underline mt-1 inline-block">
              Manage Settings →
            </Link>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="admin-text-primary text-xl font-semibold mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title flex items-center">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Image
            </h3>
          </div>
          <div className="admin-card-body">
            <p className="admin-text-secondary mb-4">
              Upload a new image to your gallery with tags and categories.
            </p>
            <Link
              href="/admin/images/new"
              className="admin-btn admin-btn-primary inline-flex items-center"
            >
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              Add Image
            </Link>
          </div>
        </div>
        
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title flex items-center">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Update Header
            </h3>
          </div>
          <div className="admin-card-body">
            <p className="admin-text-secondary mb-4">
              Change your gallery title and description.
            </p>
            <Link
              href="/admin/settings"
              className="admin-btn admin-btn-success inline-flex items-center"
            >
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit Header
            </Link>
          </div>
        </div>
        
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title flex items-center">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              View Gallery
            </h3>
          </div>
          <div className="admin-card-body">
            <p className="admin-text-secondary mb-4">
              Visit your public gallery to see how it looks to visitors.
            </p>
            <Link
              href="/"
              className="admin-btn admin-btn-secondary inline-flex items-center"
              target="_blank"
            >
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Gallery
            </Link>
          </div>
        </div>
        
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title flex items-center">
              <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Manage Pages
            </h3>
          </div>
          <div className="admin-card-body">
            <p className="admin-text-secondary mb-4">
              Edit your About and Contact page content.
            </p>
            <Link
              href="/admin/pages"
              className="admin-btn admin-btn-info inline-flex items-center"
            >
              <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Pages
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
