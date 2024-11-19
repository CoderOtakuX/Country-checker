import React from 'react';
import { Toaster } from 'react-hot-toast';
import { UserProvider, useUser } from './context/UserContext';
import { Header } from './components/Header';
import { DataTable } from './components/DataTable';
import { Login } from './components/Login';

function Dashboard() {
  const { user } = useUser();

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <DataTable />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <UserProvider>
      <Dashboard />
      <Toaster position="top-right" />
    </UserProvider>
  );
}