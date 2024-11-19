import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DataEntry } from '../types';
import { useUser } from '../context/UserContext';

interface DataFormProps {
  initialData?: DataEntry | null;
  onSave: (data: Partial<DataEntry>) => void;
  onCancel: () => void;
}

export function DataForm({ initialData, onSave, onCancel }: DataFormProps) {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      country: user?.country || '',
      id: initialData?.id,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="input focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            placeholder="Enter title"
            required
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="input focus:ring-2 focus:ring-indigo-500 transition-all duration-200"
            placeholder="Enter description"
            required
          />
        </motion.div>
      </div>

      <motion.div 
        className="flex justify-end space-x-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.button
          type="button"
          onClick={onCancel}
          className="btn-secondary"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Cancel
        </motion.button>
        <motion.button
          type="submit"
          className="btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {initialData ? 'Update Entry' : 'Create Entry'}
        </motion.button>
      </motion.div>
    </form>
  );
}