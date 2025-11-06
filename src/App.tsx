import { useState, useEffect } from 'react';
import { LoginPage } from './components/LoginPage';
import { RegisterPage } from './components/RegisterPage';
import { ForgotPasswordPage } from './components/ForgotPasswordPage';
import { ChangePasswordPage } from './components/ChangePasswordPage';
import { Dashboard } from './components/Dashboard';

export interface User {
  id: string;
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string) => boolean;
  logout: () => void;
  resetPassword: (email: string) => boolean;
  changePassword: (currentPassword: string, newPassword: string) => boolean;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<'login' | 'register' | 'forgot-password' | 'change-password' | 'dashboard'>('login');
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  // Load users from localStorage on mount
  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
    
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setCurrentPage('dashboard');
    }
  }, []);

  const login = (email: string, password: string): boolean => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('currentUser', JSON.stringify(foundUser));
      setCurrentPage('dashboard');
      return true;
    }
    return false;
  };

  const register = (email: string, password: string): boolean => {
    if (users.some(u => u.email === email)) {
      return false; // User already exists
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      email,
      password
    };
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    setCurrentPage('dashboard');
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    setCurrentPage('login');
  };

  const resetPassword = (email: string): boolean => {
    const foundUser = users.find(u => u.email === email);
    if (foundUser) {
      // In a real app, this would send an email
      alert(`Password reset link sent to ${email}`);
      return true;
    }
    return false;
  };

  const changePassword = (currentPassword: string, newPassword: string): boolean => {
    if (!user) return false;
    
    if (user.password !== currentPassword) {
      return false;
    }
    
    const updatedUser = { ...user, password: newPassword };
    const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u);
    
    setUsers(updatedUsers);
    setUser(updatedUser);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    return true;
  };

  const authContext: AuthContextType = {
    user,
    login,
    register,
    logout,
    resetPassword,
    changePassword
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'login' && (
        <LoginPage 
          auth={authContext} 
          onNavigateRegister={() => setCurrentPage('register')}
          onNavigateForgotPassword={() => setCurrentPage('forgot-password')}
        />
      )}
      {currentPage === 'register' && (
        <RegisterPage 
          auth={authContext} 
          onNavigateLogin={() => setCurrentPage('login')}
        />
      )}
      {currentPage === 'forgot-password' && (
        <ForgotPasswordPage 
          auth={authContext} 
          onNavigateLogin={() => setCurrentPage('login')}
        />
      )}
      {currentPage === 'change-password' && (
        <ChangePasswordPage 
          auth={authContext} 
          onBack={() => setCurrentPage('dashboard')}
        />
      )}
      {currentPage === 'dashboard' && (
        <Dashboard 
          auth={authContext}
          onChangePassword={() => setCurrentPage('change-password')}
        />
      )}
    </div>
  );
}
