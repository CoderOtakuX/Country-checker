import React, { useState } from 'react';
import { Edit2, Trash2, Plus, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '../context/UserContext';
import { DataEntry } from '../types';
import { DataForm } from './DataForm';
import toast from 'react-hot-toast';

const mockData: DataEntry[] = [
  {
    id: '1',
    title: 'Market Research Report',
    description: 'Q1 2024 market analysis for retail sector',
    country: 'US',
    createdAt: '2024-03-10T10:00:00Z',
    updatedAt: '2024-03-10T10:00:00Z'
  },
  {
    id: '2',
    title: 'Sales Strategy',
    description: 'European market expansion plan',
    country: 'GB',
    createdAt: '2024-03-09T15:30:00Z',
    updatedAt: '2024-03-09T15:30:00Z'
  }
];

export function DataTable() {
  const { user } = useUser();
  const [showForm, setShowForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState<DataEntry | null>(null);

  const filteredData = mockData.filter(entry => 
    user?.role === 'admin' || entry.country === user?.country
  );

  const handleEdit = (entry: DataEntry) => {
    setEditingEntry(entry);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    toast.success('Entry deleted successfully');
    console.log('Deleting entry:', id);
  };

  const handleSave = (data: Partial<DataEntry>) => {
    toast.success(editingEntry ? 'Entry updated successfully' : 'Entry created successfully');
    console.log('Saving data:', data);
    setShowForm(false);
    setEditingEntry(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-gray-900"
        >
          Data Entries
        </motion.h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowForm(true)}
          className="btn"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Entry
        </motion.button>
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card p-6"
          >
            <DataForm
              initialData={editingEntry}
              onSave={handleSave}
              onCancel={() => {
                setShowForm(false);
                setEditingEntry(null);
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="card overflow-hidden"
      >
        {filteredData.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="table-header">Title</th>
                  <th className="table-header">Description</th>
                  <th className="table-header">Country</th>
                  <th className="table-header">Last Updated</th>
                  <th className="table-header text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredData.map((entry) => (
                  <motion.tr
                    key={entry.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="table-cell font-medium">{entry.title}</td>
                    <td className="table-cell text-gray-500">{entry.description}</td>
                    <td className="table-cell">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {entry.country}
                      </span>
                    </td>
                    <td className="table-cell text-gray-500">
                      {new Date(entry.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="table-cell text-right space-x-4">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleEdit(entry)}
                        className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200"
                      >
                        <Edit2 className="h-4 w-4" />
                      </motion.button>
                      {user?.role === 'admin' && (
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleDelete(entry.id)}
                          className="text-red-600 hover:text-red-900 transition-colors duration-200"
                        >
                          <Trash2 className="h-4 w-4" />
                        </motion.button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-12"
          >
            <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No entries found</h3>
            <p className="text-gray-500">No data entries are available for your current selection.</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}