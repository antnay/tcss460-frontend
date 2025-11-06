import { ReactNode, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Film, Tv, LogOut, User, Menu, X } from 'lucide-react';
import { ChangePasswordDialog } from './auth/ChangePasswordDialog';

interface LayoutProps {
  children: ReactNode;
  activeTab: 'movies' | 'tvshows';
  onTabChange: (tab: 'movies' | 'tvshows') => void;
}

export function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Film className="h-8 w-8 text-purple-600 mr-2" />
              <span className="text-xl">MovieHub</span>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant={activeTab === 'movies' ? 'default' : 'ghost'}
                onClick={() => onTabChange('movies')}
              >
                <Film className="mr-2 h-4 w-4" />
                Movies
              </Button>
              <Button
                variant={activeTab === 'tvshows' ? 'default' : 'ghost'}
                onClick={() => onTabChange('tvshows')}
              >
                <Tv className="mr-2 h-4 w-4" />
                TV Shows
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {user?.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <div className="p-2">
                    <ChangePasswordDialog />
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="md:hidden flex items-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 space-y-2">
              <Button
                variant={activeTab === 'movies' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => {
                  onTabChange('movies');
                  setMobileMenuOpen(false);
                }}
              >
                <Film className="mr-2 h-4 w-4" />
                Movies
              </Button>
              <Button
                variant={activeTab === 'tvshows' ? 'default' : 'ghost'}
                className="w-full justify-start"
                onClick={() => {
                  onTabChange('tvshows');
                  setMobileMenuOpen(false);
                }}
              >
                <Tv className="mr-2 h-4 w-4" />
                TV Shows
              </Button>
              <div className="pt-2 border-t">
                <div className="px-4 py-2">
                  <User className="inline h-4 w-4 mr-2" />
                  {user?.name}
                </div>
                <ChangePasswordDialog />
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={logout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
