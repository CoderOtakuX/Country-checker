import React from 'react';
import { LogOut, User as UserIcon } from 'lucide-react';
import { CountrySelector } from './CountrySelector';
import { useUser } from '../context/UserContext';

export function Header() {
  const { user, setUser } = useUser();

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-indigo-600">Dashboard</h1>
            <div className="h-6 w-px bg-gray-200" />
            <CountrySelector />
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3 px-4 py-2 bg-gray-50 rounded-full">
              <UserIcon className="h-5 w-5 text-indigo-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="btn-secondary"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}