'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import ParticlesBackground from '@/components/ParticlesBackground';
import { authenticateUser, setAuthenticated, setCurrentUser } from '@/data/auth';
import '../admin.css';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Authenticate user
    const user = authenticateUser(username, password);
    
    if (user) {
      // Set authentication state
      setAuthenticated(true);
      setCurrentUser(user);
      
      // Redirect to admin dashboard
      router.push('/admin/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="admin-login-container">
      {/* Particles background */}
      <div className="absolute inset-0 z-0">
        <ParticlesBackground height="100vh" />
      </div>
      
      {/* Login form */}
      <div className="admin-login-card z-10 relative">
        <div className="admin-login-header">
          <div className="admin-login-logo flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>Gallery Admin</span>
          </div>
          <h1 className="admin-login-title">Welcome Back</h1>
          <p className="admin-login-subtitle">Sign in to manage your gallery</p>
        </div>
        
        <div className="admin-login-body">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="admin-alert admin-alert-danger">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  {error}
                </div>
              </div>
            )}
            
            <div className="admin-form-group">
              <label htmlFor="username" className="admin-form-label">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="admin-form-input"
                placeholder="Enter your username"
              />
            </div>
            
            <div className="admin-form-group">
              <label htmlFor="password" className="admin-form-label">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-form-input"
                placeholder="Enter your password"
              />
            </div>
            
            <div className="pt-2">
              <button
                type="submit"
                className="admin-btn admin-btn-primary w-full py-2.5"
              >
                Sign in
              </button>
            </div>
          </form>
          
          <div className="admin-divider"></div>
          
          <div className="text-center">
            <a href="/" className="admin-text-primary-color hover:underline text-sm">
              Return to Gallery
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
