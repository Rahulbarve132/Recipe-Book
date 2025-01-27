import React, { useState } from 'react';


interface Props {
  onSearch: (query: string, cuisine: string) => void;
}

const cuisines = [
  'All',
  'Italian',
  'Mexican',
  'Asian',
  'American',
  'Mediterranean',
  'Indian',
];

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState('All');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, cuisine === 'All' ? '' : cuisine);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto mb-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 ">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search recipes..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          />
          
        </div>
        <select
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
        >
          {cuisines.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;