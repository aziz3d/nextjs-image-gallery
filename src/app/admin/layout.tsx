'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { isAuthenticated } from '@/data/auth';
import Link from 'next/link';
import './admin.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated() && !isLoginPage) {
      router.push('/admin/login');
    } else {
      setLoading(false);
    }
  }, [router, isLoginPage]);

  if (loading && !isLoginPage) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 dark:border-gray-700"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary-color absolute top-0 left-0"></div>
        </div>
        <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Loading admin panel...</p>
      </div>
    );
  }

  // If it's the login page, don't show the admin layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="admin-layout min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Admin Header */}
      <header className="admin-header">
        <div className="flex justify-between w-full items-center">
          <div className="admin-logo">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <Link href="/admin/dashboard" className="hover:opacity-80 transition-opacity">
              Gallery Admin
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              href="/"
              className="admin-btn admin-btn-secondary text-sm flex items-center"
              target="_blank"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              View Gallery
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem('isAuthenticated');
                localStorage.removeItem('currentUser');
                router.push('/admin/login');
              }}
              className="admin-btn admin-btn-danger text-sm flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="admin-sidebar">
          <div className="p-4 mb-2">
            <div className="text-xs uppercase font-semibold admin-text-light tracking-wider">Main Menu</div>
          </div>
          <nav className="px-3 space-y-0.5">
            <Link
              href="/admin/dashboard"
              className={`admin-sidebar-link ${pathname === '/admin/dashboard' ? 'active' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </Link>
            <Link
              href="/admin/images"
              className={`admin-sidebar-link ${pathname.startsWith('/admin/images') ? 'active' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Images
            </Link>
            <Link
              href="/admin/categories"
              className={`admin-sidebar-link ${pathname.startsWith('/admin/categories') ? 'active' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              Categories
            </Link>
            
            <div className="admin-divider my-3 mx-2 opacity-70"></div>
            
            <div className="px-1 py-2">
              <div className="text-xs uppercase font-semibold admin-text-light tracking-wider">Configuration</div>
            </div>
            
            <Link
              href="/admin/settings"
              className={`admin-sidebar-link ${pathname === '/admin/settings' ? 'active' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </Link>
            <Link
              href="/admin/footer"
              className={`admin-sidebar-link ${pathname === '/admin/footer' ? 'active' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              Footer
            </Link>
            <Link
              href="/admin/pages"
              className={`admin-sidebar-link ${pathname === '/admin/pages' ? 'active' : ''}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Pages
            </Link>
          </nav>
          
          <div className="mt-auto p-4">
            <div className="admin-card p-3 bg-opacity-50 flex items-center">
              <div className="mr-3 bg-indigo-100 dark:bg-indigo-900 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 dark:text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-xs admin-text-light">Need help?</div>
                <a href="#" className="text-sm admin-text-primary-color hover:underline">View documentation</a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="admin-content flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
