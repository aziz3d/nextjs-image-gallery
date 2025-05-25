// Simple authentication system for the admin panel
// In a production environment, this should be replaced with a proper authentication system

export interface User {
  id: string;
  username: string;
  password: string;
  email: string;
}

// Admin user as specified in the requirements
const adminUser: User = {
  id: '1',
  username: 'aziz3d',
  password: 'azizkhan', // In a real application, this would be hashed
  email: 'sunrise300@gmail.com'
};

// In a real application, this would be stored in a database with proper hashing
const users: User[] = [adminUser];

// Function to authenticate a user
export function authenticateUser(username: string, password: string): User | null {
  const user = users.find(u => u.username === username && u.password === password);
  return user || null;
}

// Function to check if a user is authenticated (for client-side)
export function isAuthenticated(): boolean {
  // In a real application, this would check a JWT token or session
  if (typeof window !== 'undefined') {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
  return false;
}

// Function to set authentication state (for client-side)
export function setAuthenticated(value: boolean): void {
  if (typeof window !== 'undefined') {
    if (value) {
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      localStorage.removeItem('isAuthenticated');
    }
  }
}

// Function to get the current user (for client-side)
export function getCurrentUser(): User | null {
  if (typeof window !== 'undefined') {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      return JSON.parse(userJson);
    }
  }
  return null;
}

// Function to set the current user (for client-side)
export function setCurrentUser(user: User | null): void {
  if (typeof window !== 'undefined') {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }
}
