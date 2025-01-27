import React from 'react';
import { Edit2, Trash2, AlertTriangle } from 'lucide-react';
import { InventoryItem, SortDirection, SortField } from '../types';

interface InventoryTableProps {
  items: InventoryItem[];
  onEdit: (item: InventoryItem) => void;
  onDelete: (id: string) => void;
  sortField: SortField;
  sortDirection: SortDirection;
  onSort: (field: SortField) => void;
}

const LOW_STOCK_THRESHOLD = 10;

export function InventoryTable({
  items,
  onEdit,
  onDelete,
  sortField,
  sortDirection,
  onSort,
}: InventoryTableProps) {
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      onDelete(id);
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return (
      <span className="ml-1">
        {sortDirection === 'asc' ? '↑' : '↓'}
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => onSort('name')}
            >
              Name <SortIcon field="name" />
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => onSort('category')}
            >
              Category <SortIcon field="category" />
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => onSort('quantity')}
            >
              Quantity <SortIcon field="quantity" />
            </th>
            <th
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={() => onSort('price')}
            >
              Price <SortIcon field="price" />
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {items.map((item) => {
            const isLowStock = item.quantity < LOW_STOCK_THRESHOLD;
            return (
              <tr
                key={item.id}
                className={`${
                  isLowStock
                    ? 'bg-red-50 dark:bg-red-900/20'
                    : ''
                } transition-colors duration-200`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                  <div className="flex items-center">
                    {item.name}
                    {isLowStock && (
                      <AlertTriangle className="h-4 w-4 text-red-500 ml-2" />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {item.category}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm ${
                  isLowStock ? 'text-red-600 dark:text-red-400 font-medium' : 'text-gray-500 dark:text-gray-300'
                }`}>
                  {item.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  ${item.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onEdit(item)}
                    className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 mr-4"
                  >
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}