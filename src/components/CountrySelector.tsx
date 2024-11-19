import React from 'react';
import { Globe } from 'lucide-react';
import { useUser } from '../context/UserContext';

const countries = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'JP', name: 'Japan' },
];

export function CountrySelector() {
  const { user, setUser } = useUser();

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (user) {
      setUser({ ...user, country: e.target.value });
    }
  };

  return (
    <div className="relative flex items-center">
      <Globe className="absolute left-3 h-5 w-5 text-indigo-500" />
      <select
        value={user?.country || ''}
        onChange={handleCountryChange}
        className="pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 bg-white shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
      >
        <option value="" disabled>Select Country</option>
        {countries.map(country => (
          <option key={country.code} value={country.code}>
            {country.name}
          </option>
        ))}
      </select>
    </div>
  );
}