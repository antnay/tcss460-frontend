import { useState } from 'react';
import { AuthContextType } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Film } from 'lucide-react';

interface LoginPageProps {
  auth: AuthContextType;
  onNavigateRegister: () => void;
  onNavigateForgotPassword: () => void;
}

export function LoginPage({ auth, onNavigateRegister, onNavigateForgotPassword }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    const success = auth.login(email, password);
    if (!success) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Film className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to manage your movies and TV shows</p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="mt-1"
              />
            </div>
            
            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}
            
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <button
              onClick={onNavigateForgotPassword}
              className="text-sm text-blue-600 hover:underline"
            >
              Forgot password?
            </button>
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={onNavigateRegister}
              className="text-blue-600 hover:underline"
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
