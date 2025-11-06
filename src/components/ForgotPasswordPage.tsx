import { useState } from 'react';
import { AuthContextType } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Film, ArrowLeft } from 'lucide-react';

interface ForgotPasswordPageProps {
  auth: AuthContextType;
  onNavigateLogin: () => void;
}

export function ForgotPasswordPage({ auth, onNavigateLogin }: ForgotPasswordPageProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    
    if (!email) {
      setError('Please enter your email');
      return;
    }
    
    const result = auth.resetPassword(email);
    if (result) {
      setSuccess(true);
    } else {
      setError('Email not found');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Film className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-gray-900 mb-2">Reset Password</h1>
          <p className="text-gray-600">Enter your email to receive a reset link</p>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          {!success ? (
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
              
              {error && (
                <div className="text-red-600 text-sm">{error}</div>
              )}
              
              <Button type="submit" className="w-full">
                Send Reset Link
              </Button>
            </form>
          ) : (
            <div className="text-center">
              <div className="text-green-600 mb-4">
                Password reset instructions have been sent to your email.
              </div>
              <Button onClick={onNavigateLogin} className="w-full">
                Back to Login
              </Button>
            </div>
          )}
          
          {!success && (
            <div className="mt-6">
              <button
                onClick={onNavigateLogin}
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
