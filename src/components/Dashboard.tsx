import { useState } from 'react';
import { AuthContextType } from '../App';
import { Button } from './ui/button';
import { Film, Tv, LogOut, Key } from 'lucide-react';
import { MoviesList } from './MoviesList';
import { TVShowsList } from './TVShowsList';

interface DashboardProps {
  auth: AuthContextType;
  onChangePassword: () => void;
}

export function Dashboard({ auth, onChangePassword }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'movies' | 'tv'>('movies');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Film className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-gray-900">MediaHub</h1>
                <p className="text-sm text-gray-600">{auth.user?.email}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={onChangePassword}
                className="gap-2"
              >
                <Key className="w-4 h-4" />
                Change Password
              </Button>
              <Button
                variant="outline"
                onClick={auth.logout}
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <div className="flex gap-2 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('movies')}
              className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
                activeTab === 'movies'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Film className="w-5 h-5" />
              Movies
            </button>
            <button
              onClick={() => setActiveTab('tv')}
              className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${
                activeTab === 'tv'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Tv className="w-5 h-5" />
              TV Shows
            </button>
          </div>
        </div>
        
        {activeTab === 'movies' ? <MoviesList /> : <TVShowsList />}
      </div>
    </div>
  );
}
