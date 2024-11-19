import React, { useState } from 'react';
import { User } from '../types';
import { useUser } from '../context/UserContext';
import { Globe } from 'lucide-react';

const mockUsers: User[] = [
  { id: '1', name: 'Admin User', role: 'admin', country: 'US' },
  { id: '2', name: 'Viewer User', role: 'viewer', country: 'GB' }
];

export function Login() {
  const { setUser } = useUser();
  const [selectedUser, setSelectedUser] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = mockUsers.find(u => u.id === selectedUser);
    if (user) {
      setUser(user);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="card p-8">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <Globe className="h-6 w-6 text-indigo-600" />
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Welcome Back
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Please select your account to continue
            </p>
          </div>
          
          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="user" className="block text-sm font-medium text-gray-700 mb-2">
                Select User
              </label>
              <select
                id="user"
                required
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
                className="input"
              >
                <option value="">Choose an account</option>
                {mockUsers.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.role})
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={!selectedUser}
              className="btn w-full justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}